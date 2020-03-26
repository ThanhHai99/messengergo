import passport from "passport";
import passportFacebook from "passport-facebook";
import UserModel from "./../../models/userModel";
import ChatGroupModel from "./../../models/chatGroupModel";
import {transErrors, transSuccess} from "./../../../lang/vi";

let FacebookStratery = passportFacebook.Strategy;

let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbAppCallbackUrl = process.env.FB_APP_CALLBACK_URL;

/**
 * Valid user account type local
 */
let initPassportFacebook = () => {
    /*
    passport.use(new FacebookStratery({
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbAppCallbackUrl,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findByFacebookUid(profile.id);
            if(user){
                return done(null, user, req.flash("success", transSuccess.loginSuccess(user.username)));
            }

            let newUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: {isActive: true},
                facebook:{
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            };
            let newUser = await UserModel.createNew(newUserItem);
            return done(null, newUser, req.flash("success", transSuccess.loginSuccess(newUser.username)));
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("errors", transErrors.server_error));
        }
    }));
    

    
    */

    passport.use(new passportFacebook({
        clientID: "498842094127366",
        clientSecret: "b3b8079e7a054889099f00ec7a4c36da",
        callbackURL: "https://messengergo.herokuapp.com/auth/facebook/callback"
        
    }, 
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }
    ))

    // passport.serializeUser((user, done) => {
    //     console.log('ok');
    //     return;
    // })
    
    //Save userId to session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // passport.deserializeUser((id, done) => {  
    //     console.log('ok');
    //     return;
    // })
    passport.deserializeUser(async (id, done) => {
        try {
            let user = await UserModel.findUserByIdForSessionToUse(id);
            let getChatGroupIds = await ChatGroupModel.getChatGroupIdsByUser(user._id);
      
            user = user.toObject();
            user.chatGroupIds = getChatGroupIds;
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
    });

};

module.exports = initPassportFacebook;
