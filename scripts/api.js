/* global $ */

'use strict';

const api = function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/johnyoung';

  const errorCallback = function(error) {
    store.errorMessage(error.responseJSON.message);
    bookmarks.render();
  };

  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  // Creates a bookmark and requires a request body
  // Required: title, url
  // Optional: desc, rating
  const createBookmark = function(body, callback) {
    const newBookmark = JSON.stringify(body);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: api.errorCallback
    });
  };

  const updateBookmark = function(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: api.errorCallback
    });
  };

  const deleteBookmark = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: api.errorCallback
    });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
    errorCallback
  };
}();