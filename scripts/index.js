/* global $, api, store, bookmarkList */

'use strict';

const testObj = {
  title: 'Google',
  url: 'https://www.google.com',
  desc: 'Best search engine in the world',
  rating: 5
};

const testObj2 = {
  title: 'World of Warcraft',
  url: 'https://www.worldofwarcraft.com',
  desc: 'The popular MMO from the creators of Warcraft, Blizzard Entertainment',
  rating: 4
};



// api.createBookmark(testObj, function(res) {
//   console.log('Bookmark created successfully');
// });

// api.deleteBookmark(id, function(res) {
//     console.log(res);
//     api.getBookmarks(function(res) {
//       console.log(res);
//     });
//   });



$(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getBookmarks(function(bookmarks) {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
    console.log('store after render is ', store.bookmarks);
  });

});