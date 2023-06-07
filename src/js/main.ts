document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling to all links
  const navLinks = document.getElementsByClassName("site-nav-item");
  // get body and html elements
  // const scrollScreen = document.querySelector(["body", "html"]);
  const scrollScreen = document.querySelector("html");
  // get header element
  const siteHeader = document.querySelector(".site-header");
  // get all divs with class tab content.
  const scrollElements = document.querySelectorAll(".tabcontent");

  // detect page scroll function
  const elementInView = (el: Element, scrollOffset = 100) => {
    // eslint-disable-next-line prefer-destructuring
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) -
        scrollOffset
    );
  };

  // display element on page scroll with animation
  const displayScrollElement = (element: Element) => {
    element.classList.remove("scrolled-no-animation");
    element.classList.add("scrolled");
  };

  // display element on page scroll with no animation
  const displayScrollElementNoAnimation = (element: Element) => {
    element.classList.add("scrolled-no-animation");
    element.classList.remove("scrolled");
  };

  // hide element on page scroll animation or not
  const hideScrollElement = (element: Element) => {
    element.classList.remove("scrolled");
    element.classList.remove("scrolled-no-animation");
  };

  // add animation to element on page scroll
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  // remove animation on element on page scroll on mobile screens
  const handleScrollNoAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 0)) {
        displayScrollElementNoAnimation(el);
      }
    });
  };

  /**
   * Page Scroll Function
   * In JavaScript, using the addEventListener() method:  object.addEventListener("scroll", myScript);
   * scrolling function - (https://codepen.io/ugg0t/pen/mqBBBY)
   */

  window.onscroll = () => {
    // fixes header to top of page on page scroll.
    if (scrollScreen.scrollTop >= 100) {
      siteHeader.classList.add("fixed-header");
    } else {
      siteHeader.classList.remove("fixed-header");
    }
    // return value either true or false when browser window width hits between 479px and 599px;
    const mqList = window.matchMedia("(max-width: 599px)");

    // check if width of browser window above 600px
    // if so apply animation function to tab content. .
    if (mqList.matches === false) {
      handleScrollAnimation();
    }

    // Else apply animation function
    if (mqList.matches === true) {
      handleScrollNoAnimation();
    }
  };

  const scrollTo = (element: { offsetTop: number | null }) => {
    // eslint-disable-next-line no-console
    console.log(element.offsetTop);
    scrollScreen.scrollTo({
      behavior: "smooth",
      left: 0,
      top: element.offsetTop - 100, // deduct height of header.
    });
  };

  /**
   * Mobile menu
   */
  const menuToggle = document.querySelector<HTMLElement>(".menu-toggle");
  // create menu variables
  const slideoutMenu =
    document.querySelector<HTMLDivElement>(".site-navigation");

  // eslint-disable-next-line prefer-destructuring
  const slideoutMenuHeight = slideoutMenu.offsetHeight;
  // mobile menu toggle button
  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();

    // toggle open class
    slideoutMenu.classList.toggle("open");

    // add css transition to menu
    slideoutMenu.style.transition = "all 0.3s ease-in 0s";

    // slide menu
    if (slideoutMenu.classList.contains("open")) {
      slideoutMenu.style.top = "0px";
    } else {
      slideoutMenu.style.transition = "all 0.3s ease-in 0s";
      slideoutMenu.style.top = `${-slideoutMenuHeight}px`;
    }
  });

  // turn HTML collection list of objects into an array
  // Iterated over array with forEach.
  Array.from(navLinks).forEach((link) => {
    // add event listener to each link
    link.addEventListener("click", (event: Event) => {
      // Store hash
      // eslint-disable-next-line prefer-destructuring
      const { hash } = event.target as HTMLAnchorElement;

      // check if has empty
      if (hash !== "") {
        // if not, Prevent default anchor click behavior
        event.preventDefault();
        // select element id converting hash to string using template literal and use as argument in scrolling function.
        scrollTo(document.querySelector<HTMLObjectElement>(`${hash}`));
      } // End if

      // hide menu when link is clicked
      if (slideoutMenu.classList.contains("open")) {
        slideoutMenu.style.top = `${-slideoutMenuHeight}px`;
        slideoutMenu.classList.remove("open");
      } else {
        slideoutMenu.style.top = "0px";
      }
    });
  });

  const testLink = document.querySelector("#project-page-link");

  testLink.addEventListener("click", (event) => {
    // Store hash
    // eslint-disable-next-line prefer-destructuring
    const { hash } = event.target as HTMLAnchorElement;

    // check if has empty
    if (hash !== "") {
      // if not, Prevent default anchor click behavior
      event.preventDefault();
      // select element id converting hash to string using template literal and use as argument in scrolling function.
      scrollTo(document.querySelector<HTMLElement | null>(`${hash}`));
    } // End if
  });
});
