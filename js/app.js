'use strict';

const listenToFocus = function() {
  document.querySelector('.js-search').addEventListener('click', function(e) {
    document.querySelector('.js-search').classList.add('c-search-select__input--selected');
  });
  document.querySelector('.js-input').addEventListener('focusin', function(e) {
    document.querySelector('.js-search').classList.add('c-search-select__input--selected');
  });
  window.addEventListener('click', function(e) {
    if (e.target != document.querySelector('.js-search') && e.target != document.querySelector('.js-input'))
      document.querySelector('.js-search').classList.remove('c-search-select__input--selected');
  });
};
const listenToSelect = function() {
  let objs = document.querySelectorAll('.js-search__opt');
  for (let ob of objs) {
    ob.addEventListener('click', function(e) {
      console.warn('Clicked');
    });
  }
};
const init = function() {
  listenToFocus();
  listenToSelect();
};

document.addEventListener('DOMContentLoaded', function() {
  init();
});
