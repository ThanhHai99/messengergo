echo "================================================================================================================"
echo "Start deploy on Github"
echo "===============ADD"
git add .
echo "============COMMIT"
git commit -m "$(date +'%Y/%m/%d %H:%M:%S')"
echo "==============PUSH"
git push origin master -f
echo "End deploy on Github"

echo "================================================================================================================"
echo "Start deploy on Heroku"
echo "===============ADD"
git add .
echo "============COMMIT"
git commit -am "$(date +'%Y/%m/%d %H:%M:%S')"
echo "==============PUSH"
git push heroku master -f
echo "End deploy on Heroku"