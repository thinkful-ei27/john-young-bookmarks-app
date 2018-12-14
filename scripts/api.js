/* global $ */

'use strict';

const api = function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/johnyoung';

  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  // Creates a bookmark and requires a request body
  // Required: title, url
  // Optional: desc, rating
  const createBookmark = function(body, callback, err) {
    const newBookmark = JSON.stringify(body);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: err
    });
  };

  const updateBookmark = function(id, updateData, callback, err) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: err
    });
  };

  const deleteBookmark = function(id, callback, err) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: err
    });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };
}();