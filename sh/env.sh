# config database environment variable
# Run: source sh/env.sh
export DB_CONNECTION=mongodb
export DB_HOST=localhost
export DB_PORT=27017
export DB_NAME=awesome_chat
export DB_USERNAME=""
export DB_PASSWORD=""

#Config app environment variable
export APP_HOST=localhost
export APP_PORT=2001

#Config session key and secret
export SESSION_KEY="express.sid"
export SESSION_SECRET="mySecret"

#Config admin email account
export MAIL_USER=tranhai23031999@gmail.com
export MAIL_PASSWORD=thanhhai3303703
export MAIL_HOST=smtp.gmail.com
export MAIL_PORT=587

#Config facebook login app
export FB_APP_ID=159250902038344
export FB_APP_SECRET=8e0bc9e77ce83c6edcd68c646d8887df
export FB_CALLBACK_URL=https://localhost:2001/auth/facebook/callback

#Config google login app
export GG_APP_ID=339146463147-f7r2aim0t6j9p83qm1m41fnna41qrh3a.apps.googleusercontent.com
export GG_APP_SECRET=XOmFEhvWySR7OKBhzdosQL2z
export GG_CALLBACK_URL=https://localhost:2001/auth/google/callback
