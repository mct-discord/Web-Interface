'use strict';
let modules;

const showModules = function(data) {
  let opt = '';
  modules = data.modules;
  for (let [key, value] of Object.entries(data.modules)) {
    opt += `<div class="c-search-select__opt js-search__opt" search-id="${value}">${key}</div>`;
  }
  document.querySelector('.js-search__results').innerHTML = opt;
};
const listenToInput = function() {
  document.querySelector('.js-input').addEventListener('input', function(e) {
    let opt = '';
    for (let [key, value] of Object.entries(modules)) {
      if (key.toLowerCase().includes(e.target.value.toLowerCase()))
        opt += `<div class="c-search-select__opt js-search__opt" search-id="${value}">${key}</div>`;
    }
    document.querySelector('.js-search__results').innerHTML = opt;
  });
};
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
const getModules = function() {
  handleData('http://localhost:5000/api/v1/modules', showModules);
};
const init = function() {
  getModules();
  listenToFocus();
  listenToSelect();
  listenToInput();
};

document.addEventListener('DOMContentLoaded', function() {
  init();
});
