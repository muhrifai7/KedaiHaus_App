# FoodApp 
[![CircleCI](https://img.shields.io/circleci/project/github/ntkme/github-buttons/master.svg)](https://circleci.com/gh/ntkme/github-buttons)
[![Codecov](https://img.shields.io/codecov/c/github/ntkme/github-buttons.svg)](https://codecov.io/gh/ntkme/github-buttons)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## Installation
React Redux requires React 16.8.3 or later.

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

## Application purpose
Application to facilitate customers ordering food and payment methods

## Important
This Project is stiil early stage, If you want to use for production, use it with your own risk. Back-end repo in 
[here](https://github.com/muhrifai7/testBackends)
<br>

## scrennshots
<p>
<img align="left" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/welcome.jpg" width="200" height="400"  />
<img align="center" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/allmenu.jpg" width="200" height="400" />
<img align="center" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/confirm.jpg" width="200" height="400" />
<img align="center" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/payment.jpg" width="200" height="400" />
<img align="center" src="https://github.com/muhrifai7/foodApp/blob/master/screenshot/done.jpg" width="200" height="400" />
</p>

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
