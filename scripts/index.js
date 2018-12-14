/* global $, api, store, bookmarkList, accessibility */

'use strict';

$(function() {
  accessibility.allowSpacebarAndEnter();
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getBookmarks(function(bookmarks) {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
    console.log('store after render is ', store.bookmarks);
  });

});