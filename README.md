# My actionhero Project

_visit www.actionherojs.com for more information_

## To recreate the error
1. GET /session/auth WITHOUT Bearer token to get one
2. GET /status action WITH Bearer token
    - Errors out `"error": "Cannot read property 'preProcessor' of undefined",`

## To install:

(assuming you have [node](http://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), and NPM installed)

`npm install`

## To Run:

`npm start`

## To Test:

`npm test`

