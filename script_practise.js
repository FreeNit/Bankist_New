
// // ******* Selecting elements *******
// ////////////////////////////
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);
// const header = document.querySelector('.header');


// // ****** Creating and inserting elements
// ////////////////////////////

// // .insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improved functionality and analytics.';
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// // header.prepend(message);
// // header.append(message.cloneNode(true));
// header.after(message);
// // header.before(message);


// // ******* Delete elements*******
// ////////////////////////////
// document.querySelector('.btn--close-cookie').addEventListener('click', function(){
//   message.remove();
//   // message.parentElement.removeChild(message);  // old version
// });


// // ******** Styles *******
// ////////////////////////////
// message.style.backgroundColor = '#37373d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).height);
// console.log(getComputedStyle(message).color);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');


// // ****** Attributes ******
// ////////////////////////////
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);

// // Non-standard
// console.log(logo.designer); // will not work
// console.log(logo.getAttribute('designer'));

// // Set attributes
// logo.alt = 'Beautiful minimalist logo';
// logo.setAttribute('company', 'Bankist');

// // Get Attribute
// console.log(logo.src); // absolute route
// console.log(logo.getAttribute('src')); // relative route

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes - special kind of attributes
// console.log(logo.dataset.versionNumber);

// // ****** Classes ******
// ////////////////////////////
// logo.classList.add('test', 'test2');
// logo.classList.remove('test', 'test2');
// logo.classList.toggle('test');
// logo.classList.contains('test');

// // Don`t use
// logo.className = 'jonas'; // Will overwrite all existing classes and also it allows us to only put one class on any element

// ****** LISTENING FOR EVENTS ******
/////////////////////////////////////

// const h1 = document.querySelector('h1');

// const alertH1 = function(e) {
//   alert('addEventListener: Great!');

//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(()=> h1.removeEventListener('mouseenter', alertH1), 3000);

// Old school way
// h1.onmouseenter = function(e) {
//   alert('addEventListener: Wonderful!');
// };

// Modern way
// h1.addEventListener('mouseenter', function(e) {
//   alert('addEventListener: Great!')
// });


// ******* EVENT PROPAGATION: CAPTURING - BUBBLING *******
///////////////////////////////////////////////////////////

// rgb(255, 255, 255)
// const randomInt = (min, max) => Math.floor(Math.random() *(max-min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// // console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click',function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
  
//   // Stop Propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click',function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click',function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Nav', e.target, e.currentTarget);
// });


// ******* DOM Traversing *******
//////////////////////////////////

// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(el) {
//   if(el !== h1) el.style.transform = 'scale(0.5)';
// });


// ******* The Intersection Observer API *******
//////////////////////////////////

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver (obsCallback, obsOptions);
// observer.observe(section1);