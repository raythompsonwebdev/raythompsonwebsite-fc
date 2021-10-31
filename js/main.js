"use strict";

// Your code to run since DOM is loaded and ready
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all links
  var navLinks = document.getElementsByClassName("tablink"); // get body and html elements

  var scrollScreen = document.querySelector(["body", "html"]); // get header element

  var siteHeader = document.querySelector(".site_header"); // get all divs with class tab content.

  var scrollElements = document.querySelectorAll(".tabcontent"); // detect page scroll function

  var elementInView = function elementInView(el) {
    var scrollOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - scrollOffset;
  }; // display element on page scroll


  var displayScrollElement = function displayScrollElement(element) {
    element.classList.add("scrolled");
  }; // hide element on page scroll


  var hideScrollElement = function hideScrollElement(element) {
    element.classList.remove("scrolled");
  }; // add animation to element on page scroll


  var handleScrollAnimation = function handleScrollAnimation() {
    scrollElements.forEach(function (el) {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  handleScrollAnimation();
  /**
   * Page Scroll Function
   * In JavaScript, using the addEventListener() method:  object.addEventListener("scroll", myScript);
   * scrolling function - (https://codepen.io/ugg0t/pen/mqBBBY)
   */

  window.onscroll = function () {
    // fixes header to top of page on page scroll.
    if (scrollScreen.scrollTop >= 100) {
      siteHeader.classList.add("fixed-header");
    } else {
      siteHeader.classList.remove("fixed-header");
    }

    handleScrollAnimation();
  };

  var scrollTo = function scrollTo(element) {
    scrollScreen.scrollTo({
      behavior: "smooth",
      left: 0,
      top: element.offsetTop - 100 // deduct height of header.

    });
  };
  /**
   * Mobile menu
   */


  var menuToggle = document.querySelector(".menu-toggle"); // create menu variables

  var slideoutMenu = document.querySelector(".site_navigation");
  var slideoutMenuHeight = slideoutMenu.offsetHeight; // mobile menu toggle button

  menuToggle.addEventListener("click", function (event) {
    event.preventDefault(); // toggle open class

    slideoutMenu.classList.toggle("open"); // add css transition to menu

    slideoutMenu.style.transition = "all 0.3s ease-in 0s"; // slide menu

    if (slideoutMenu.classList.contains("open")) {
      slideoutMenu.style.top = "0px";
    } else {
      slideoutMenu.style.transition = "all 0.3s ease-in 0s";
      slideoutMenu.style.top = "".concat(-slideoutMenuHeight, "px");
    }
  }); // turn HTML collection list of objects into an array
  // Iterated over array with forEach.

  Array.from(navLinks).forEach(function (link) {
    // add event listener to each link
    link.addEventListener("click", function (event) {
      // Store hash
      var hash = event.target.hash; // check if has empty

      if (hash !== "") {
        // if not, Prevent default anchor click behavior
        event.preventDefault(); // select element id converting hash to string using template literal and use as argument in scrolling function.

        scrollTo(document.querySelector("".concat(hash)));
      } // End if
      // hide menu when link is clicked


      if (slideoutMenu.classList.contains("open")) {
        slideoutMenu.style.top = "".concat(-slideoutMenuHeight, "px");
        slideoutMenu.classList.remove("open");
      } else {
        slideoutMenu.style.top = "0px";
      }
    });
  });
});
//# sourceMappingURL=main.js.map
