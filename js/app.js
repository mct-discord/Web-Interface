'use strict';

const listenToFocus = function() {
  document.querySelector('.js-input').addEventListener('focusin', function(e) {
    document.querySelector('.js-search').classList.add('c-search-select__input--selected');
  });
  document.querySelector('.js-input').addEventListener('focusout', function(e) {
    document.querySelector('.js-search').classList.remove('c-search-select__input--selected');
  });
};

const init = function() {
  listenToFocus();
};

document.addEventListener('DOMContentLoaded', function() {
  init();
});
