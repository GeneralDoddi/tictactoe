#!/bin/bash
echo Cleaning...
rm -rf ./dist
ln -s /usr/bin/nodejs /usr/bin/node
echo "Installing grunt"
npm install grunt
#echo "Installing hooker"
#npm install hooker
#echo "Insalling jshint"
#npm install jshint
#npm install chalk
#npm install maxmin@0.1.0
#npm install less@1.7.2
#npm install mkdirp@0.3.5
echo "Installing bower"
npm install bower
echo "Npm install"
npm install
echo "Bower install"
bower install
echo "Running grunt"	
grunt
echo "Pushing successful build on docker"
cp ./Dockerfile ./dist/

cd dist
npm install --production

echo "Building docker image"
docker build -t generaldoddi/tictactoe .

echo "Pushing docker build"
docker push generaldoddi/tictactoe

echo "Done"