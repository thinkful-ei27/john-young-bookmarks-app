/* global $, api */

'use strict';

const testObj = {
  title: 'Yahoo',
  url: 'http://yahoo.com'
};

$(function() {
  api.createBookmark(testObj, function(res) {
    console.log(res);
  });
});