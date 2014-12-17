echo Cleaning...

echo "Installing grunt"
call npm install grunt

echo "Installing bower"
call npm install bower

echo "Npm install"
call npm install

echo "Bower install"
call bower install

echo "Updateting web driver"
call node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update

echo "Running e2e tests"
call grunt test:e2e

echo "Done"
exit /b %errorlevel%
