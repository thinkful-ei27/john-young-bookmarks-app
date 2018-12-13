/* global $ */

'use strict';

const bookmarkList = function() {
  const template = function(bookmark) {
    return `
        <div class="bookmark">
            <button class="remove">X</button>
            <h3>Name</h3>
            <a href="www.google.com"><h4>URL</h4></a>
            <p>Link description</p>
            <div class="stars-outer">
                <div class="stars-inner"></div>
            </div>
        </div>
        `;
  };

  const render = function(string) {

  };

}();