'use strict';

var angular = require('angular');
require('angular-route');

var app = angular.module('MovieApp',['ngRoute','angular.filter','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

require('./controller');
require('./service');

app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl: 'views/home.html',
    controller: 'OMDBController'
  }).when('/MovieTheaterMap',{
    templateUrl: 'views/MovieTheaterMap.html',
    controller: 'MapController',
    access: {restricted: true}
  }).when('/Theater',{
  templateUrl: 'views/main.html',
  controller: 'MainController',
  access: {restricted: true}
}).when('/bookingTimeTable',{
  templateUrl: 'views/selectShowBooking.html',
  controller: 'BookNowController'
}).when('/seatSelect',{
  templateUrl: 'views/seatSelect.html',
 controller: 'SelectSeatController'
}).when('/insertOMDB',{
  templateUrl: 'views/omdbfetching.html',
  controller: 'OMDBController',
  access: {restricted: true}
}).when('/makePayment',{
  templateUrl: 'views/payment.html',
  controller: 'PaymentController'
}).when('/confirmationPage',{
  templateUrl: 'views/confirmation.html',
  controller: 'ConfirmationController'
}).when('/admin',{
  templateUrl: 'views/admin.html',
  controller: 'AdminController',
  access: {restricted: true}
}).when('/login',{
  templateUrl: 'views/login.html',
  controller: 'LoginController',
  access: {restricted: false}
}).when('/review',{
  templateUrl: 'views/review.html',
  controller: 'OMDBController'
//}).when('/star',{
//  templateUrl: 'views/star.html',
//  controller: 'SignupController'
//}).when('/signup',{
//  templateUrl: 'views/signup.html',
//  controller: 'SignupController'

}).when('/cancel',{
  templateUrl: 'views/ticketcancel.html',
  controller: 'PaymentController'
}).when('/register', {
      templateUrl: 'views/signup.html',
      controller: 'RegisterController',
      access: {restricted: false}
}).when('/logout', {
      controller: 'LogoutController',
      access: {restricted: true}

});

});

//passport authentication
app.run(function ($rootScope, $location, $route, AuthService) {
   $rootScope.$on('$routeChangeStart',
     function (event, next, current) {
       AuthService.getUserStatus()
       .then(function(){
         if (next.access.restricted && !AuthService.isLoggedIn()){
           $location.path('/login');
           $route.reload();
         }
       });
   });
 });
