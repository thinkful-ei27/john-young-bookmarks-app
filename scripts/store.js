/* global $ */

'use strict';

const store = function() {
  const bookmarks = [];

  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  return {
    bookmarks,
    addBookmark,
    findById
  };
}();