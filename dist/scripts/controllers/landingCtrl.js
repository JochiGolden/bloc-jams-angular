(function() {

  "use strict";
  
  function LandingCtrl() {
    this.heroTitle = "Turn the Music Loud!";
  }
  
  angular
    .module('blocJams')
    .controller('LandingCtrl', LandingCtrl);
  
}());