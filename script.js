'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');


///////////////////////////////////////
// Modal window
//////////////////////////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// ******* Scrolling *******
///////////////////////////////////////
btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll X/Y: ', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport', 
    document.documentElement.clientHeight, 
    document.documentElement.clientWidth
  );
  // s1coords.top - distance from the top of viewport to the current element
  // In order to get correct position we need to add height from current position to the top of window - window.pageYOffset
  // window.scrollTo(
  //   // x,y coordinates (current position + current scroll)
  //   s1coords.left + window.pageXOffset, 
  //   s1coords.top + window.pageYOffset
  // ); 

  // Old school way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, 
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  
  // Modern way
  section1.scrollIntoView({
    behavior: 'smooth'
  });

});

///////////////////////////////////////
// Page Navigation
///////////////////////////////////////
// document.querySelectorAll('.nav__link').forEach(
//   function(el){
//     el.addEventListener('click', function(e){
//       e.preventDefault();
      
//       const id = this.getAttribute('href');
//       console.log(id);
//       document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     });
//   }
// );

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  console.log(e.target);
  e.preventDefault();
  // Matching strategy
  if(e.target.classList.contains('nav__link')){
    console.log('LINK');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});


///////////////////////////////////////
// ******* Tabbed Component *******
///////////////////////////////////////

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if(!clicked) return;

  // remove .operations__tab--active class from each tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // add .operations__tab--active class to the clicked tab
  clicked.classList.add('operations__tab--active');

  // remove .operations__content--active class from each content area
  tabsContent.forEach(tabContent => tabContent.classList.remove('operations__content--active'));
  // Activating content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////////
// ******* Menu Fade Animation *******
///////////////////////////////////////

const handleHover = function(event){
  if(event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function(e){
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function(e) {
//   handleHover(e, 1);
// });

// Passing "argument" into handler (0.5 or 1 will be the value of THIS based on mouse event)
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// ******* Sticky Navigation: Scroll *******
///////////////////////////////////////

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function() {
//   console.log(window.scrollY);
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });


///////////////////////////////////////
// ******* Sticky Navigation: Intersection Observer API *******
///////////////////////////////////////

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(
  stickyNav, 
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
  );
headerObserver.observe(header);