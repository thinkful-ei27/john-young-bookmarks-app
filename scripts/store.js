/* global $ */

'use strict';

const store = function() {
//   const bookmarks = [];

  const addBookmark = function(bookmark) {
    bookmark.expanded = false;
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndUpdate = function(id, newData) {
    const oldData = this.findById(id);
    Object.assign(oldData, newData);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const filterByStars = function(rating) {
    return this.bookmarks.filter(bookmark => bookmark.rating >= rating);
  };

  return {
    bookmarks: [],
    // Add toggles the 'Add Bookmark' form
    add: false,
    filterDropdown: 0,
    addBookmark,
    findById,
    findAndUpdate, 
    findAndDelete,
    filterByStars
  };
}();