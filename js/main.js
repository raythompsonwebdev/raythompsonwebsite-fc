"use strict";

//Your code to run since DOM is loaded and ready
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all links
  var navLinks = document.getElementsByClassName("tablink"); // get body and html elements

  var scrollScreen = document.querySelector(["body", "html"]); // get header element

  var siteHeader = document.querySelector(".site_header");
  var menuToggle = document.querySelector(".menu-toggle"); // get all divs with class tab content.

  var scrollElements = document.querySelectorAll(".tabcontent"); // scrollElements.forEach((el) => {
  //   el.style.opacity = 0;
  // });
  //detect page scroll function

  var elementInView = function elementInView(el) {
    var scrollOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - scrollOffset;
  }; //display element on page scroll


  var displayScrollElement = function displayScrollElement(element) {
    element.classList.add("scrolled");
  }; //hide element on page scroll


  var hideScrollElement = function hideScrollElement(element) {
    element.classList.remove("scrolled");
  }; //add animation to element on page scroll


  var handleScrollAnimation = function handleScrollAnimation() {
    scrollElements.forEach(function (el) {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  handleScrollAnimation(); //In JavaScript, using the addEventListener() method:  object.addEventListener("scroll", myScript);

  window.onscroll = function () {
    //fixes header to top of page on page scroll.
    if (scrollScreen.scrollTop >= 100) {
      siteHeader.classList.add("fixed-header");
    } else {
      siteHeader.classList.remove("fixed-header");
    } //handle scroll animation


    handleScrollAnimation();
  }; // scrolling function - (https://codepen.io/ugg0t/pen/mqBBBY)


  var scrollTo = function scrollTo(element) {
    scrollScreen.scrollTo({
      behavior: "smooth",
      left: 0,
      top: element.offsetTop - 110 // deduct height of header.

    });
  }; // create menu variables


  var slideoutMenu = document.querySelector(".site_navigation");
  var slideoutMenuHeight = slideoutMenu.offsetHeight; //mobile menu toggle button

  menuToggle.addEventListener("click", function (event) {
    event.preventDefault(); // toggle open class

    slideoutMenu.classList.toggle("open");
    slideoutMenu.style.transition = "all 0.3s ease-in 0s"; // slide menu

    if (slideoutMenu.classList.contains("open")) {
      slideoutMenu.style.top = "0px";
    } else {
      slideoutMenu.style.transition = "all 0.3s ease-in 0s";
      slideoutMenu.style.top = -slideoutMenuHeight + "px";
    }
  }); // turn HTML collection list of objects into an array
  // Iterated over array with forEach.

  Array.from(navLinks).forEach(function (link) {
    //add event listener to each link
    link.addEventListener("click", function (event) {
      // Store hash
      var hash = event.target.hash; //check if has empty

      if (hash !== "") {
        // if not, Prevent default anchor click behavior
        event.preventDefault(); // select element id converting hash to string using template literal and use as argument in scrolling function.

        scrollTo(document.querySelector("".concat(hash)));
      } // End if
      // hide menu when link is clicked


      if (slideoutMenu.classList.contains("open")) {
        slideoutMenu.style.top = -slideoutMenuHeight + "px";
        slideoutMenu.classList.remove("open");
      } else {
        slideoutMenu.style.top = "0px";
      }
    });
  });
}); // (function () {
//   // Hide/show toggle button on scroll
//   let prevScrollpos = window.pageYOffset;
//   window.onscroll = function () {
//     const currentScrollPos = window.pageYOffset;
//     if (prevScrollpos > currentScrollPos) {
//       document.querySelector(".menu-toggle").classList.remove("hide");
//     } else {
//       document.querySelector(".menu-toggle").classList.add("hide");
//     }
//     prevScrollpos = currentScrollPos;
//   };
// })();
//# sourceMappingURL=main.js.map
