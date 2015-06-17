echo $PATH
node --version
bower --version
grunt --version

npm install
bower install
grunt test
grunt build

./script/docker-build.sh
