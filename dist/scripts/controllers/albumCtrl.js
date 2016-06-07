(function () {
  
  "use strict";
  
  function AlbumCtrl (Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }
  
  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
  
}());