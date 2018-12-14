/* global $, store, api */

'use strict';

const bookmarkList = function() {

  function generateError(err) {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <p>${message}</p>
    `;
  }

  const starsTemplate = function(rating) {
    const star = '<i class="fa fa-star"></i>';
    return star.repeat(rating);
  };

  const template = function(bookmark) {
    const expanded = bookmark.expanded;
    return `
        <div class="bookmark" data-bookmark-id="${bookmark.id}">
          <div class="wrapper">
            <button class="edit"><i class="fa fa-edit"></i>Edit bookmark</button>
            <button class="remove">X Remove bookmark</button>
            <h3>${bookmark.title}</h3>
            <div class="stars-inner">
                ${starsTemplate(bookmark.rating)}
            </div>
            <div class="wrap-collapsible">
                <input id="${bookmark.id}" class="toggle" type="checkbox" ${expanded ? 'checked' : ''}>
                <label for="${bookmark.id}" class="lbl-toggle js-toggle">More Info</label>
                <div class="collapsible-content">
                    <div class="content-inner">
                        <a href="${bookmark.url}">Visit Site</a>
                        <p>${bookmark.desc}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
        `;
  };

  const addBookmarkTemplate = function () {
    return `
        <form action="">
            <h3>Add Bookmark</h3>
            <fieldset name="add-a-bookmark">
              <legend>Bookmark info</legend>
              <label for="title"></label>
              <input name="title" id="title" type="text" placeholder="Enter Title">

              <label for="url"></label>
              <input name="url" id="url" type="text" placeholder="Enter URL">

              <label for="desc"></label>
              <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Enter description"></textarea><br>

              <label for="rating">Enter bookmark rating</label>
              <input type="radio" name="rating" id="rating" value=1>1
              <input type="radio" name="rating" id="rating" value=2>2
              <input type="radio" name="rating" id="rating" value=3>3
              <input type="radio" name="rating" id="rating" value=4>4
              <input type="radio" name="rating" id="rating" value=5>5<br>

              <div class="row">
                <div class="two columns">
                  <input class="button-primary" type="submit" value="Submit">
                </div>
                <div class="ten columns error-container">
                </div>
              </div>
            </fieldset>
        </form>
      `;
  };

  const editBookmarkTemplate = function() {
    return `
      <div class="wrapper">
        <form action="">
            <h3>Edit Bookmark</h3>
            <fieldset name="edit-a-bookmark">
              <legend>Bookmark info</legend>
              <label for="title"></label>
              <input name="title" id="title" type="text" placeholder="Enter Title">

              <label for="rating">Enter bookmark rating</label>
              <input type="radio" name="rating" id="rating" value=1>1
              <input type="radio" name="rating" id="rating" value=2>2
              <input type="radio" name="rating" id="rating" value=3>3
              <input type="radio" name="rating" id="rating" value=4>4
              <input type="radio" name="rating" id="rating" value=5>5<br>

              <div class="row">
                <div class="two columns">
                  <input class="button-primary" type="submit" value="Submit">
                </div>
                <div class="ten columns error-container">
                </div>
              </div>
            </fieldset>
        </form>
      </div>
      `;
  };

  const generateSidebarTemplate = function() {
    const rating = store.filterDropdown;
    const selected = 'selected="selected"';
    return `
      <div class="wrapper">
        <button class="js-add-bookmark button-primary">Add</button>
        <select name="filter" id="filter" class="js-filter-stars">
            <option value="all" ${(rating === 0) ? selected : ''}>Filter stars</option>
            <option value="5" ${(rating === 5) ? selected : ''}>5 Stars or higher</option>
            <option value="4" ${(rating === 4) ? selected : ''}>4 Stars or higher</option>
            <option value="3" ${(rating === 3) ? selected : ''}>3 Stars or higher</option>
            <option value="2" ${(rating === 2) ? selected : ''}>2 Stars or higher</option>
            <option value="1" ${(rating === 1) ? selected : ''}>1 Star or higher</option>
        </select>
      </div>
      `;
  };

  function generateBookmarkString(bookmarkList) {
    const starRating = store.filterDropdown;
    const filteredBookmarks = store.filterByStars(starRating);
    const bookmarks = filteredBookmarks.map((bookmark) => template(bookmark));
    return bookmarks.join('');
  }

  function render() {
    let bookmarks = store.bookmarks;
    let sidebar = generateSidebarTemplate();
    let html = '';

    // Tests if user clicked the "Add" button
    if (store.add) {
      html = addBookmarkTemplate();
    }
    html += generateBookmarkString(bookmarks);

    
    $('.js-sidebar').html(sidebar);
    $('.bookmarks').html(html);

    if (store.error) {
      const el = generateError(store.error);
      $('div.error-container').html(el);
    } else {
      $('div.error-container').empty();
    }

    console.log(`render function ran, new store is ${store}`);
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark).closest('.bookmark').data('bookmark-id');
  }

  function handleAddBookmarkClicked() {
    $('.js-sidebar').on('click', '.js-add-bookmark', function(e) {
      e.preventDefault();
      store.add = !store.add;
      render();
    });
  }

  function handleAddBookmarkSubmit() {
    $('div.bookmarks').on('submit', 'form', function(e) {
      e.preventDefault();
      let obj = $(this).serializeJson();
      api.createBookmark(obj, function(res) {
        let id = res.id;
        obj.id = id;
        store.addBookmark(obj);
        render();
      }, function(err) {
        store.setError(err);
        render();
      });
    });
  }

  function handleDeleteBookmarkClicked() {
    $('.bookmarks').on('click', '.remove', function(e) {
      e.preventDefault();
      const id = getBookmarkIdFromElement(e.currentTarget);
      const callback = function() {
        store.findAndDelete(id);
        render();
      };
      api.deleteBookmark(id, callback);
    });
  }

  function handleCollapseBookmarkClick() {
    $('.bookmarks').on('click', '.js-toggle', function(e) {
      e.preventDefault();
      const id = getBookmarkIdFromElement(this);
      const bookmark = store.findById(id);
      const updateData = {
        expanded: !(bookmark.expanded)
      };
      store.findAndUpdate(id, updateData);
      render();
    });
  }

  function handleFilterStarsDropdown() {
    $('.js-sidebar').on('change', '.js-filter-stars', function(e) {
      let value = $(this).val();

      // Attempt to coerce value to a number. If not a number, we return 0
      let numberFix = function(value) {
        return isNaN(value) ? 0 : Number(value);
      };
      store.filterDropdown = numberFix(value);
      render();
    });
  }

  function handleEditBookmarkClicked() {
    $('.bookmarks').on('click', '.edit', function(e) {
      e.preventDefault();
      const id = getBookmarkIdFromElement(e.currentTarget);
      let html = editBookmarkTemplate();
      // $('.bookmarks .bookmark').html(html);
      console.log('edit button successfully clicked', id);
    });
  }

  function bindEventListeners() {
    handleAddBookmarkClicked();
    handleAddBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleCollapseBookmarkClick();
    handleFilterStarsDropdown();
    handleEditBookmarkClicked();
  }

  return {
    render,
    bindEventListeners
  };

}();