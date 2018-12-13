/* global $ */

'use strict';

const bookmarkList = function() {
  const starsTemplate = function(rating) {
    const star = '<i class="fa fa-star"></i>';
    return star.repeat(rating);
  };

  const template = function(bookmark) {
    return `
        <div class="bookmark">
            <button class="remove">X</button>
            <h3>${bookmark.title}</h3>
            <a href="${bookmark.url}"><h4>${bookmark.url}</h4></a>
            <p>${bookmark.desc}</p>
            <div class="stars-inner">
                ${starsTemplate(bookmark.rating)}
            </div>
        </div>
        `;
  };

  const generateSidebarTemplate = function() {
    return `
        <button class="js-add-bookmark">Add</button>
        <select name="" id="" class="js-filter-stars">
            <option value="all">Filter stars</option>
            <option value="fivestars">5 Stars or higher</option>
            <option value="fourstars">4 Stars or higher</option>
            <option value="threestars">3 Stars or higher</option>
            <option value="twostars">2 Stars or higher</option>
            <option value="onestars">1 Star or higher</option>
        </select>
      `;
  };

  function generateBookmarkString(bookmarkList) {
    const bookmarks = bookmarkList.map((bookmark) => template(bookmark));
    return bookmarks.join('');
  }

  function render() {
    let bookmarks = store.bookmarks;
    console.log('render function ran');
    $('.js-sidebar').html(generateSidebarTemplate());
    $('.bookmarks').html(generateBookmarkString(bookmarks));
  }

  function handleAddButton() {

  }

  return {
    render
  };

}();