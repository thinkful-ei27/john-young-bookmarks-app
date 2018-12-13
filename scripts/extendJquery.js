/* global $ */

'use strict';

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const obj = {};
    formData.forEach((val, key) => {
      obj[key] = val;
    });
    return JSON.stringify(obj);
  }
});