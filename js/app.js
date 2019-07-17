'use strict';

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('token')) var user = urlParams.get('token');

let modules;
let selectedModules = {};
let rolesToGive = [];
let currentPart = 0;
let currentYear;
let currentClass;
let currentCourse;
const showModules = function(data) {
	let opt = '';
	modules = data.modules;
	for (let [key, value] of Object.entries(data.modules)) {
		opt += `<div class="c-search-select__opt js-search__opt" search-id="${value}">${key}</div>`;
	}
	document.querySelector('.js-search__results').innerHTML = opt;
	listenToSearchSelect();
};
const reloadModules = function() {
	let opt = '';
	for (let [key, value] of Object.entries(modules)) {
		opt += `<div class="c-search-select__opt js-search__opt" search-id="${value}">${key}</div>`;
	}
	document.querySelector('.js-search__results').innerHTML = opt;
	listenToSearchSelect();
};
const listenToInput = function() {
	document.querySelector('.js-input').addEventListener('input', function(e) {
		let opt = '';
		for (let [key, value] of Object.entries(modules)) {
			if (key.toLowerCase().includes(e.target.value.toLowerCase())) opt += `<div class="c-search-select__opt js-search__opt" search-id="${value}">${key}</div>`;
		}
		document.querySelector('.js-search__results').innerHTML = opt;
		listenToSearchSelect();
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
const listenToRemove = function() {
	let objs = document.querySelectorAll('.js-search__remove');
	for (let ob of objs) {
		ob.addEventListener('click', function(e) {
			let name = ob.parentElement.getAttribute('search-name');
			let id = ob.parentElement.getAttribute('search-id');
			delete selectedModules[name];
			ob.parentElement.remove();
		});
	}
};
const listenToSearchSelect = function() {
	let objs = document.querySelectorAll('.js-search__opt');
	for (let ob of objs) {
		ob.addEventListener('click', function(e) {
			let name = ob.innerHTML;
			let id = ob.getAttribute('search-id');
			if (selectedModules[name] == (undefined || null)) {
				selectedModules[name] = id;
				document.querySelector('.js-search__selected').innerHTML =
					document.querySelector('.js-search__selected').innerHTML +
					`<div class="c-search-select__selected" search-name="${name}" search-id="${id}">${name}<span class="js-search__remove"></span></div>`;
				listenToRemove();
			}
		});
	}
};
const listenToSelect = function() {
	let objs = document.querySelectorAll('.js-selector');

	for (let ob of objs) {
		ob.addEventListener('click', function() {
			if (ob.querySelectorAll('.js-selector__opt').length == 0) {
				for (let item of document.querySelectorAll('.c-selector--selected')) {
					item.classList.remove('c-selector--selected');
					item.classList.remove('c-selector__opt--selected');
				}
				for (let item of document.querySelectorAll('.c-selector__opt--selected')) {
					item.classList.remove('c-selector__opt--selected');
				}
				ob.classList.add('c-selector--selected');
				if (currentPart == 0) {
					currentClass = undefined;
					currentYear = ob.getAttribute('opt-id');
					if (currentYear == '578656098425372697') {
						document.querySelector('.js-yearbtn p b').innerHTML = 'Finish';
					} else {
						document.querySelector('.js-yearbtn p b').innerHTML = 'Next';
					}
				}
				if (currentPart == 1) {
					ob.classList.add('c-selector--selected');
					ob.classList.add('c-selector__opt--selected');
					if (currentYear === '578656108663799818') currentCourse = ob.getAttribute('opt-id1');
					if (currentYear === '578656111041970186') currentCourse = ob.getAttribute('opt-id2');
				}
			}
		});
	}
};
const listenToClassSelect = function() {
	let objs = document.querySelectorAll('.js-selector__opt');
	for (let ob of objs) {
		ob.addEventListener('click', function() {
			for (let item of document.querySelectorAll('.c-selector--selected')) {
				item.classList.remove('c-selector--selected');
				item.classList.remove('c-selector__opt--selected');
			}
			for (let item of document.querySelectorAll('.c-selector__opt--selected')) {
				item.classList.remove('c-selector__opt--selected');
			}
			ob.parentElement.parentElement.parentElement.classList.add('c-selector--selected');
			ob.classList.add('c-selector__opt--selected');
			currentYear = ob.parentElement.parentElement.parentElement.getAttribute('opt-id');
			currentClass = ob.getAttribute('opt-id');
			if (currentYear == '578656098425372697') {
				document.querySelector('.js-yearbtn p b').innerHTML = 'Finish';
			} else {
				document.querySelector('.js-yearbtn p b').innerHTML = 'Next';
			}
		});
	}
};
const listenToNextButtons = function() {
	let nextBtn = document.querySelectorAll('.js-next');
	for (let btn of nextBtn) {
		btn.addEventListener('click', function(el) {
			if (currentPart === 0) {
				if (currentYear === (null || undefined) && currentClass === (null || undefined)) return;

				if (currentYear == '578656098425372697') {
					submitRoles();
					document.querySelectorAll('.js-panel')[currentPart].classList.remove('js-panel--current');
					currentPart = 3;
					document.querySelectorAll('.js-panel')[currentPart].classList.add('js-panel--current');

					return;
				}
			}
			if (currentPart === 1) {
				if (currentCourse === (null || undefined)) return;
				submitRoles();
				document.querySelectorAll('.js-panel')[currentPart].classList.remove('js-panel--current');
				currentPart = 3;
				document.querySelectorAll('.js-panel')[currentPart].classList.add('js-panel--current');
				return;
			}
			if (currentPart === 2) {
				submitRoles();
			}
			document.querySelectorAll('.js-panel')[currentPart].classList.remove('js-panel--current');
			currentPart++;
			document.querySelectorAll('.js-panel')[currentPart].classList.add('js-panel--current');
		});
	}
};
const listenToRedo = function() {
	let objs = document.querySelectorAll('.js-redo');
	for (let obj of objs) {
		obj.addEventListener('click', function() {
			currentClass = undefined;
			currentCourse = undefined;
			currentYear = undefined;
			selectedModules = {};
			for (let item of document.querySelectorAll('.c-selector--selected')) {
				item.classList.remove('c-selector--selected');
				item.classList.remove('c-selector__opt--selected');
			}
			document.querySelector('.js-search__selected').innerHTML = '';
			for (let item of document.querySelectorAll('.c-selector__opt--selected')) {
				item.classList.remove('c-selector__opt--selected');
			}
			document.querySelectorAll('.js-panel')[currentPart].classList.remove('js-panel--current');
			currentPart = 0;
			document.querySelectorAll('.js-panel')[currentPart].classList.add('js-panel--current');
		});
	}
};
const listenToExtraModulesBtn = function() {
	let objs = document.querySelectorAll('.js-add-modules');
	for (let obj of objs) {
		obj.addEventListener('click', function() {
			if (currentPart === 0) {
				if (currentYear !== (null || undefined) && currentYear !== '578656098425372697') {
					document.querySelectorAll('.js-panel')[currentPart].classList.remove('js-panel--current');
					currentPart++;
					document.querySelectorAll('.js-panel')[currentPart].classList.add('js-panel--current');
					return;
				}
			}
			if (currentPart === 1) {
				if (currentCourse === (null || undefined)) return;
			}
			document.querySelectorAll('.js-panel')[currentPart].classList.remove('js-panel--current');
			currentPart = 2;
			document.querySelectorAll('.js-panel')[currentPart].classList.add('js-panel--current');
		});
	}
};
const submitRoles = function() {
	if (currentYear) rolesToGive.push(currentYear);
	if (currentClass) rolesToGive.push(currentClass);
	if (currentCourse) rolesToGive.push(currentCourse);
	rolesToGive = rolesToGive.concat(Object.values(selectedModules));
	let submit = { roles: rolesToGive };
	sendData(`https://mctb.funergydev.com:5000/api/v1/roles/${user}`, 'POST', JSON.stringify(submit));
	rolesToGive = [];
};
const getModules = function() {
	handleData('https://mctb.funergydev.com:5000/api/v1/modules', showModules);
};
const init = function() {
	if (!urlParams.has('token')) {
		document.body.innerText = 'No access token given.';
	} else {
		getModules();
		listenToFocus();
		listenToInput();
		listenToSelect();
		listenToClassSelect();
		listenToNextButtons();
		listenToExtraModulesBtn();
		listenToRedo();
	}
};

document.addEventListener('DOMContentLoaded', function() {
	init();
});
