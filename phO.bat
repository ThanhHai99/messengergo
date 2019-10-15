mkdir Other
move *.emmx Other
git add .
git commit -m "%date:~10,4%/%date:~4,2%/%date:~7,2% %time%"
git push origin master
move Other\* ./
rmdir Other
git add .
git commit -m "%date:~10,4%/%date:~4,2%/%date:~7,2% %time%"
git push origin master
timeout 60
