echo $PATH
node --version
bower --version
grunt --version

npm install
bower --allow-root install
grunt test

./docker-build.sh