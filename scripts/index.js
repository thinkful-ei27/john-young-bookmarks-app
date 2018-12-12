/* global $, api */

'use strict';

const testObj = {
  rating: 5
};

const id = 'cjplqkwo501uy0kx2slq99ait';

$(function() {
  api.deleteBookmark(id, function(res) {
    console.log(res);
    api.getBookmarks(function(res) {
      console.log(res);
    });
  });
});