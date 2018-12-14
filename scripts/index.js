/* global $, api, store, bookmarkList */

'use strict';

$(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getBookmarks(function(bookmarks) {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
    console.log('store after render is ', store.bookmarks);
  });

});