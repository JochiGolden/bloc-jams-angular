(function ($document) {
  
  "use strict";
  
  // @function calculatePercent
  // @description Get mouse position from event parameter
  //              minus the distance from the left of the
  //              viewport to the beginning of the seekBar
  //              parameter.
  //
  //              Return this value (offsetX) divided by
  //              the total width of the seekBar parameter
  //              as a float between 0 and 1
  // @parameters {Object} seekBar, jQuery Object for DOM node
  //             {Object} event, returned from an eventListener
  
  function calculatePercent (seekBar, event) {
    var offsetX = event.pageX - seekBar.offset().left,
        seekBarWidth = seekBar.width(),
        offsetXPercent = offsetX / seekBarWidth;
    
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(1, offsetXPercent);
    return offsetXPercent;
  }
  
  // @function seekBar
  // @description Directive, returns an object that
  //              represents a template. Template is
  //              palced with custom HTML tag. Has own
  //              scope, public variables, and methods
  // @parameter {Object} jQuery wrapped document node
  
  function seekBar($document) {
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope:  {
        onChange: '&'
      },
      link: function (scope, element, attributes) {
        
        // @attribute value
        // @description Used to place thumb and seekBar
        //              fill. Default to zero.
        // @type {number} percent
        //
        // @attribute max
        // @description Percentage cap on value
        // @type {number}
        
        scope.value = 0;
        scope.max = 100;
        
        // @attribute seekBar
        // @description Element parameter in jQuery wrapper
        // @type {Object} jQuery
        
        var seekBar = $(element);
        
        // @function $observe
        // @description Angular method for updating attributes
        // @parameter {Attribute}
        
        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });
        
        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        });
        
        // @function percentString
        // @description Cast return value from
        //              `calculatePercent()` to string for
        //              CSS. Append percentage mark.
        // @returns {String}
        
        function percentString() {
          var value = scope.value,
              max = scope.max,
              percent = value / max * 100;
          
          return percent + '%';
        }
        
        // @function notifyOnChange
        // @description Update the `onChange` attribute of
        //              `seek-bar` with the play time of
        //              the current song
        // @parameter {Number} time
        
        function notifyOnChange(newValue) {
          if (typeof scope.onChange === 'function') {
            scope.onChange({value: newValue});
          }
        }
        
        // @function fillStyle
        // @description Update `ng-style()` on div.fill
        // @returns {Object}
        
        scope.fillStyle = function () {
          return { width: percentString() };
        };
        
        // @function thumbStyle
        // @description Update `ng-style()` on div.thumb
        // @returns {Object}
        
        scope.thumbStyle = function () {
          return { left: percentString() };
        };
        
        // @function onClickSeekBar
        // @description Update scope.value to click position
        // @parameter {Object} return from ng-click event
        
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };
        
        // @function trackThumb
        // @description Update scope.value while div.thumb
        //              is being dragged.
        // @parameter {Object} return from ng-mousedown event
        
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });
          });
          
          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };
      }
    };
  }
  
  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
  
}());