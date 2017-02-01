(function() {
  'use strict';
  angular
    .module('app')
    .component('app', {
      controller: controller,
      templateUrl: '/public/js/app/app.template.html'
    });
    function controller() {
      const vm = this;
    }
}());
