(function(){
  'use strict';

  angular.module('app')
  .config(config);
  config.$inject=['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function config($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $stateProvider
    //parent
    .state({
      name: 'app',
      abstract: true,
      component: 'appComponent',
    })
    .state({
        name: 'classified',
        parent: 'app',
        url: '/',
        component: 'classifiedComponent'
      })
      .state({
        name: 'edit',
        parent: 'app',
        url: '/:id/edit',
        component:'edit'
      });

  }
}());
