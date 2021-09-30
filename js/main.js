"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Your code to run since DOM is loaded and ready
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all links
  var navLinks = document.getElementsByClassName("tablink"); // get body and html elements

  var scrollScreen = document.querySelector(["body", "html"]); // get header element

  var siteHeader = document.querySelector(".site_header");
  var menuToggle = document.querySelector(".menu-toggle"); // get all divs with class tab content.

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
  // create menu variables


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
  /**
   * Contact Form
   */

  var myForm = document.forms[0];
  var mySubmit = document.getElementById("submit");
  var error = document.getElementById("form-error"); // deconstruct array of form elements
  // subscribed, select, comtype1, comtype2, comtype3 variable replaced with space g

  var _myForm = _slicedToArray(myForm, 8),
      text = _myForm[0],
      email = _myForm[1],
      url = _myForm[2];

  error.classList.add("hide-error");
  error.textContent = "";
  text.addEventListener("blur", function (e) {
    e.preventDefault();
    text.style.setProperty("--text-error", "none");

    if (text.validity.patternMismatch) {
      error.classList.remove("hide-error");
      error.classList.add("show-error");
      error.textContent = "name too short or more than 40 characters. ";
      text.style.setProperty("--text-error", "solid 2px #f38383cb");
    } else {
      error.classList.add("hide-error");
      error.classList.remove("show-error");
      error.textContent = "";
      text.style.setProperty("--text-error", "none");
    }
  });
  email.addEventListener("blur", function (e) {
    e.preventDefault();
    error.textContent = "";
    email.style.setProperty("--email-error", "none");

    if (email.validity.typeMismatch) {
      error.classList.add("show-error");
      error.classList.remove("hide-error");
      error.textContent = "I am expecting an e-mail address!";
      email.style.setProperty("--email-error", "solid 2px #f38383cb");
    } else if (email.validity.patternMismatch) {
      error.classList.add("show-error");
      error.classList.remove("hide-error");
      error.textContent = "I am expecting a valid e-mail address!";
      email.style.setProperty("--email-error", "solid 2px rgb(250, 250, 135)");
    } else {
      error.classList.remove("show-error");
      error.classList.add("hide-error");
      error.textContent = "";
      email.style.setProperty("--email-error", "none");
    }
  });
  url.addEventListener("blur", function (e) {
    e.preventDefault();
    url.style.setProperty("--url-error", "none");

    if (url.validity.typeMismatch) {
      error.classList.remove("hide-error");
      error.classList.add("show-error");
      error.textContent = "I am expecting a web address!";
      url.style.setProperty("--url-error", "solid 2px #f38383cb");
    } else if (url.validity.patternMismatch) {
      error.classList.remove("hide-error");
      error.classList.add("show-error");
      error.textContent = "I am expecting an valid web pattern!";
      url.style.setProperty("--url-error", "solid 2px rgb(250, 250, 135)");
    } else {
      error.classList.remove("show-error");
      error.classList.add("hide-error");
      error.textContent = "";
      url.style.setProperty("--url-error", "none");
    }
  });

  function showError() {
    if (text.validity.valueMissing && email.validity.valueMissing) {
      error.classList.add("show-error");
      error.classList.remove("hide-error");
      error.textContent = "name and email address are required!";
      text.style.setProperty("--text-error", "solid 2px rgb(136, 136, 241)");
      email.style.setProperty("--email-error", "solid 2px rgb(136, 136, 241)");
    } else if (!text.validity.valid && !email.validity.valid) {
      error.classList.add("show-error");
      error.classList.remove("hide-error");
      error.textContent = "name and email address are required and need to be valid!";
      text.style.setProperty("--text-error", "solid 2px rgb(136, 136, 241)");
      email.style.setProperty("--email-error", "solid 2px rgb(136, 136, 241)");
    } else {
      myForm.submit();
    }
  }

  mySubmit.addEventListener("click", showError);
  /**
   * project page portfolio grid
   */

  var boxes = document.querySelectorAll(".box");
  var tabs = document.querySelectorAll(".project_tab");
  var arrayTabs = Array.from(tabs);
  var arrayBoxes = Array.from(boxes);
  arrayTabs.forEach(function (element1) {
    element1.addEventListener("click", function (e) {
      e.preventDefault();
      arrayBoxes.filter(function (element2) {
        if (element2.dataset.all === element1.id) {
          // eslint  - "no-param-reassign": "off"
          element2.classList.remove("box-hide");
          element2.classList.add("box-show");
        } else if (element2.dataset.id === element1.id) {
          element2.classList.remove("box-hide");
          element2.classList.add("box-show");
        } else {
          element2.classList.remove("box-show");
          element2.classList.add("box-hide");
        }

        return element2;
      });
    });
  });
});
//# sourceMappingURL=main.js.map
