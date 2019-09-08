# FoodApp 
[![CircleCI](https://img.shields.io/circleci/project/github/ntkme/github-buttons/master.svg)](https://circleci.com/gh/ntkme/github-buttons)
[![Codecov](https://img.shields.io/codecov/c/github/ntkme/github-buttons.svg)](https://codecov.io/gh/ntkme/github-buttons)

## Description
This is a example repo for showing built simple restoApp use Redux with React Native. Everything that is important to understanding the redux setup / flow can be found in the app directory. This example makes a simple API call from the Cloud Computing or Heroku .Also check out the Redux docs. Enjoy and feel free to contact me with any questions :).

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## scrennshots
<p>
<img align="left" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/welcome.jpg" width="200" height="400"  />
<img align="center" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/allmenu.jpg" width="200" height="400" />
<img align="center" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/confirm.jpg" width="200" height="400" />
<img align="center" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/payment.jpg" width="200" height="400" />
<img align="center" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/done.jpg" width="200" height="400" />
</p>

## Important
This Project is stiil early stage, If you want to use for production, use it with your own risk. Back-end repo in 
[here](https://github.com/muhrifai7/testBackends)
<br>

## Pre Installation
React Native version 0.60 or later.
React Redux requires React 16.8.3 or later.
Please follow Installing Dependencies section found [here](https://docs.npmjs.com/cli/install)

## Installation
``` javascript
$ git clone git@github.com:jarretmoses/react-native-redux-example.git
$ cd react-native-redux-example
$ yarn start or npm start

```

## Use as a Module

``` javascript
import { render } from 'github-buttons'

// export function render(anchor: HTMLAnchorElement, callback: (el: HTMLElement) => void): void;
render(anchor, function (el) {
  anchor.parentNode.replaceChild(el, anchor)
})

// export function render(options: object, callback: (el: HTMLElement) => void): void;
render(options, function (el) {
  document.body.appendChild(el) 
})
```

## Application Purpose
Application to facilitate customers ordering food and payment methods

## Features
* Choose Table Number
* Choose Ordes
* Payment methods
* Waiting time


## Tech Stack
* React Native 
* ExpressJs for Backend

## Persyaratan
* Install NodeJs https://nodejs.org/
* Install React Native https://facebook.github.io/react-native/
* Also Express https://expressjs.com
- [ ] pull request


## Download App (Demo usage only)

Under maintenance


----

## License

WTFPL-LICENSE

See [LICENSE](http://www.wtfpl.net/txt/copying/)
