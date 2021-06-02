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

///////////////////////////////////////
// ******* Reveal Sections *******
///////////////////////////////////////

const allSections = document.querySelectorAll('section');

const revealSection = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);
  // Guard clause
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(
  revealSection, 
  {
    root: null, // viewport
    threshold: 0.15
  });
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
// ******* Lazy Loading Images *******
///////////////////////////////////////

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(
  loadImg, 
  {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  }
);
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// ******* Slider *******
///////////////////////////////////////
const slider = function(){

  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.3) translateX(-1200px)';
  // slider.style.overflow = 'visible';

  // FUNCTIONS *************************

  // Creating Dots
  const createDots = function() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  };


  // Activating dots
  const activeDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };


  const goToSlide = function(slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  };


  // 0%, 100%, 200%, 300%

  // Next Slide
  const nextSlide = function(){
    if(curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const prevSlide = function(){
    if(curSlide === 0){
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const init = function() {
    createDots();
    goToSlide(0);
    activeDot(0);
  };
  init();

  // EVENT HANDLERS **************************

  btnRight.addEventListener('click', nextSlide);
  //  curSlide = 1: -100%, 0%, 100%, 200%
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e){
    console.log(e);
    if(e.key ===  'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset; // object Destructuring
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();