import mongose, { Schema } from 'mongoose'

let Schema = mongose,Schema;
let NotificationSchema = new Schema({
    sender:{
        id:String,
        username: String,
        avartar:String
    },
    receiver:{
        id:String,
        username:String,
        avartar:String
    },
    type:String,
    content:String,
    isRead:{type:Boolean,default:false},
    createAt:{type:Number, default: Date.now}
});

module.exports=mongose.model("notofication",NotificationSchema);