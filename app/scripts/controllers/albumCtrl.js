(function () {
  
  "use strict";
  
  function AlbumCtrl () {
    this.albumData = angular.copy(albumPicasso);
  }
  
  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
  
}());