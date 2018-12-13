/* global $, api */

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

api.getBookmarks(function(res) {
  console.log(res);
});

// api.createBookmark(testObj2, function(res) {
//     console.log('Bookmark created successfully');
//   });

// api.deleteBookmark(id, function(res) {
//     console.log(res);
//     api.getBookmarks(function(res) {
//       console.log(res);
//     });
//   });



$(function() {

});