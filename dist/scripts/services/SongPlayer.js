(function () {
  
  "use strict";
  
  // @function SongPlayer
  // @description manage audio playback and UI update
  // @returns {Object}
  
  function SongPlayer() {
    
    // @attribute setSong
    // @description instance to return
    // @type {Object}
    //
    // @attribute currentSong
    // @description Access the song property analog of the fixtures service
    // @type {Object}
    //
    // @attribute currentBuzzObject
    // @description instance of buzz audio file loaded from the fixtures service
    // @type {Object}
    
    var songPlayer = {}, currentSong = null, currentBuzzObject = null;
    
    // @function setSong
    // @description Stops currently playing song and loads new audio file as currentBuzzObject
    // @parameter {Object} song
    
    function setSong(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
      
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      currentSong = song;
    }
    
    // @function play
    // @description play currentBuzzObject, toggle play icon
    // @parameter {Object} song
    
    songPlayer.play = function (song) {
      if (currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
        
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
          song.playing = true;
        }
      }
    };
    
    // @function pause
    // @description pause currentBuzzObject, toggle pause icon
    // @parameter {Object} song
    
    songPlayer.pause = function (song) {
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    return songPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
  
}());