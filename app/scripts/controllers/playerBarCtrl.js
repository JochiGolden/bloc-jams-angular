(function () {

  "use strict";
  
  function PlayerBarCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
  }
  
  angular.module('blocJams')
    .controller('playerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl])
  
}());