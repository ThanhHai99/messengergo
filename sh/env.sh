# config database environment variable
# Run: source sh/env.sh
export DB_CONNECTION=mongodb
export DB_HOST=localhost
export DB_PORT=27017
export DB_NAME=awesome_chat
export DB_USERNAME=""
export DB_PASSWORD=""
export DB_URI="mongodb://thanhhai:thanhhai3303703@cluster0-shard-00-00-amayj.mongodb.net:27017,cluster0-shard-00-01-amayj.mongodb.net:27017,cluster0-shard-00-02-amayj.mongodb.net:27017/Messenger-Go?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

#Config app environment variable
export APP_HOST=localhost
export APP_PORT=2303

#Config session key and secret
export SESSION_KEY="express.sid"
export SESSION_SECRET="mySecret"

#Config admin email account
export MAIL_USER=messengergo2303@gmail.com
export MAIL_PASSWORD=Aa@123456
export MAIL_HOST=smtp.gmail.com
export MAIL_PORT=587

#Config facebook login app
export FB_APP_ID=498842094127366
export FB_APP_SECRET=b3b8079e7a054889099f00ec7a4c36da
export FB_CALLBACK_URL=https://messengergo.herokuapp.com/auth/facebook/callback

#Config google login app
export GG_APP_ID=339146463147-f7r2aim0t6j9p83qm1m41fnna41qrh3a.apps.googleusercontent.com
export GG_APP_SECRET=XOmFEhvWySR7OKBhzdosQL2z
export GG_CALLBACK_URL=https://messengergo.herokuapp.com/auth/google/callback

