(function() {
  'use strict';
  angular
    .module('app')
    .component('appComponent', {
      controller: controller,
      templateUrl: '/js/app/app.template.html'
    });
    function controller() {
      const vm = this;
      vm.$onInit= onInit;

      function onInit() {
        // console.log('hello from app.component');
      }
    }
}());
