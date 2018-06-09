var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var navLink = document.querySelector('.main-nav__link');

navMain.classList.remove('main-nav--nojs');

/*
navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

*/

navToggle.addEventListener('click', toggleSwitch);
navLink.addEventListener('click', linkSwitch);

function toggleSwitch() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
}

function linkSwitch() {
  if (navMain.classList.contains('main-nav--opened')) {
    navMain.classList.remove('main-nav--opened');
    navMain.classList.add('main-nav--closed');
  } else {
    navMain.classList.add('main-nav--opened');
    navMain.classList.remove('main-nav--closed');
  }
}


/*

var comments = document.querySelector('button');
var numComments = comments.length;

function showComment(e) {
  var place = document.getElementById('textfield');
  var commentBox = document.createElement('textarea');
  place.appendChild(commentBox);
  for (var i = 0; i < numComments; i += 1) {
    comments[i].removeEventListener('click', showComment, false);
  }
}
for (var i = 0; i < numComments; i += 1) {
  comments[i].addEventListener('click', showComment, false);
}

*/
