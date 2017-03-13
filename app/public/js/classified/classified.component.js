(function() {
  'use strict';
  console.log('classified component');

  angular
    .module('app')
    .component('classifiedComponent', {
      controller: controller,
      templateUrl: '/js/classified/classified.template.html'
    });

    controller.$inject = ['classifiedService'];
    function controller(classifiedService) {
      const vm = this;
      vm.$onInit= onInit;
      vm.createAd = createAd;

      function onInit() {
        classifiedService.all()
            .then(ads => vm.ads = ads);
         }

         function createAd(){

           classifiedService.create(vm.ad)
             .then(ad => {
               vm.ad = ad;
               vm.ads.push(ad);
               console.log(vm.ad);
               delete vm.ad;
             });
           }
    }
   }());
