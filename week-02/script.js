// script.js
// add an event listener for scrolling
window.addEventListener('scroll', function() {

  // get current scroll position
  var scrollPosition = window.scrollY;
  
  // calculate total scrollable height
  var documentHeight = document.documentElement.scrollHeight - window.innerHeight;

  // calculate how far down the page we've scrolled as a percentage
  var scrollPercentage = scrollPosition / documentHeight;

  // change background color based on scroll position
  if (scrollPercentage < 0.5) {
    document.body.style.backgroundColor = '#caf0f8'; // light blue for top half of page
  } else {
    document.body.style.backgroundColor = '#0096c7'; // dark blue for bottom half of page
  }

  // move the fish image across the screen
  var catfish = document.getElementById('catfish');

  // calculate horizontal position based on scroll percentage
  var translateX = scrollPercentage * (window.innerWidth - catfish.clientWidth); 

  // apply the new position
  catfish.style.transform = 'translateX(' + translateX + 'px)';
});
