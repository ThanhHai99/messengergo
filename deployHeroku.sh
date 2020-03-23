echo "Start deploy on Heroku"
echo "===============ADD"
git add .
echo "============COMMIT"
git commit -am "$(date +'%Y/%m/%d %H:%M:%S')"
echo "==============PUSH"
git push heroku master -f
echo "End deploy on Heroku"
heroku logs --tail