
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