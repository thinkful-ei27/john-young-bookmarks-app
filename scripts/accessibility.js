/* global $ */

'use strict';

const accessibility = function() {
  const allowSpacebarAndEnter = function() {
    let myLabels = document.querySelectorAll('.lbl-toggle');
    
      
    $('.bookmarks').on('keydown', '.js-toggle', e => {
      // 32 === spacebar
      // 13 === enter
      if (e.which === 32 || e.which === 13) {
        e.preventDefault();
        e.currentTarget.click();
      }
    });
  };

  return {
    allowSpacebarAndEnter
  };
}();