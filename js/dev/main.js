//Your code to run since DOM is loaded and ready
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all links
  let navLinks = document.getElementsByClassName("tablink");
  // get body and html elements
  let scrollScreen = document.querySelector(["body", "html"]);
  let siteHeader = document.querySelector(".site_header");
  const scrollElements = document.querySelectorAll(".tabcontent");

  // scrollElements.forEach((el) => {
  //   el.style.opacity = 0;
  // });

  const elementInView = (el, scrollOffset = 100) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) -
        scrollOffset
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  handleScrollAnimation();

  //In JavaScript, using the addEventListener() method:  object.addEventListener("scroll", myScript);
  window.onscroll = function () {
    if (scrollScreen.scrollTop >= 100) {
      siteHeader.classList.add("fixed-header");
    } else {
      siteHeader.classList.remove("fixed-header");
    }
    handleScrollAnimation();
  };
  // scrolling function - (https://codepen.io/ugg0t/pen/mqBBBY)
  const scrollTo = (element) => {
    scrollScreen.scrollTo({
      behavior: "smooth",
      left: 0,
      top: element.offsetTop - 110, // deduct height of header.
    });
  };

  // turn HTML collection list of objects into an array
  // Iterated over array with forEach.
  Array.from(navLinks).forEach((link) => {
    //add event listener to each link
    link.addEventListener("click", function (event) {
      // Store hash
      let hash = event.target.hash;

      //check if has empty
      if (hash !== "") {
        // if not, Prevent default anchor click behavior
        event.preventDefault();

        /* eslint-disable no-console */
        console.log(hash, location.href);
        /* eslint-enabe no-console */

        // select element id converting hash to string using template literal and use as argument in scrolling function.
        scrollTo(document.querySelector(`${hash}`));
      } // End if
    });
  });
});
