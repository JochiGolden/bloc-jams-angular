(function (Fixtures) {
  
  "use strict";
  
  // @function SongPlayer
  // @description manage audio playback and UI update
  // @returns {Object}
  
  function SongPlayer(Fixtures) {
    
    // @attribute setSong
    // @description instance to return
    // @type {Object}
    //
    // @attribute currentAlbum
    // @description Stores the current album
    // @type {object}
    //
    // @attribute currentBuzzObject
    // @description instance of buzz audio file loaded from the fixtures service
    // @type {Object}
    
    var songPlayer = {}, currentAlbum = Fixtures.getAlbum(), currentBuzzObject = null;
    
    // @function setSong
    // @description Stops currently playing song and loads new audio file as currentBuzzObject
    // @parameter {Object} song
    
    function setSong(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        songPlayer.currentSong.playing = null;
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      songPlayer.currentSong = song;
    }
    
    // @function getSongIndex
    // @description Get index of currently playing song in Fixtures.getAlbum
    // @parameter {Object} song
    
    function getSongIndex(song) {
      return currentAlbum.songs.indexOf(song);
    }
    
    // @attribute currentSong
    // @description Access the song property analog of the fixtures service
    // @type {Property}
    
    songPlayer.currentSong = null;
    
    // @function playSong
    // @description Play audio file and toggle
    //              or set .playing attribute on song parameter
    
    function playSong(song) {
      currentBuzzObject.play();
      song.playing = true;
    }
    
    // @function play
    // @description Check for song change.
    //              If playing new song then set song.
    //              Then play song.
    // @parameter {Object} song
    
    songPlayer.play = function (song) {
      song = song || songPlayer.currentSong;
      if (songPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
        
      } else if (songPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
    
    // @function pause
    // @description pause currentBuzzObject, toggle pause icon
    // @parameter {Object} song
    
    songPlayer.pause = function (song) {
      song = song || songPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    // @function previous
    // @description Skip back and play the previous song
    
    songPlayer.previous = function (song) {
      var currentSongIndex = getSongIndex(songPlayer.currentSong);
      currentSongIndex -= 1;
      
      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        songPlayer.currentSong.playing = null;
      } else {
        song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    
    return songPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
  
}());