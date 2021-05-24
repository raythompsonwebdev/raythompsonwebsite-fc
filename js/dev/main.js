//Your code to run since DOM is loaded and ready
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all links
  let navLinks = document.getElementsByClassName("tablink");
  // get body and html elements
  let scrollScreen = document.querySelector(["body", "html"]);
  let siteHeader = document.querySelector(".site_header");

  //In JavaScript, using the addEventListener() method:  object.addEventListener("scroll", myScript);
  window.onscroll = function () {
    if (scrollScreen.scrollTop >= 100) {
      siteHeader.classList.add("fixed-header");

      /* eslint-disable no-console */
      console.log("done");
      /* eslint-enabe no-console */
    } else {
      siteHeader.classList.remove("fixed-header");
      /* eslint-disable no-console */

      /* eslint-enabe no-console */
    }
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

//      /* JavaScript */
//      element.style.transition = 'margin-left 2s';
//      element.addEventListener('transitionend',
//        (event) => {  //When animation is finished });
//      element.style.marginLeft = '100px';

// $("button#myBtn").on("click", function (event) {
//   $("html,body").animate({ scrollTop: 0 }, 800);
// });

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     document.getElementById("myBtn").style.display = "block";
//   } else {
//     document.getElementById("myBtn").style.display = "none";
//   }
// }
