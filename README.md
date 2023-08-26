# calendar-test

## Test framework setup
The Test framework is build with WebdriverIO (refer: https://webdriver.io/)
The tests are written in Cucumber BDD style and steps are implemented in typescript.

## Running the tests
pre-requsites:
install Node Version 16
install yarn for package manager

Pls. checkout the code from Github: https://github.com/gopalthiru/calendar-test

On project directory install required packages
```agsl
yarn install
```

and run the tests with 
```agsl
BASE_URL=http://localhost:3000 yarn wdio:local
```
Please replace BASE_URL based on your FE deployed.

