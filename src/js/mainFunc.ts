// document.addEventListener("DOMContentLoaded", () => {

const MainFunc = () => {

  const navLinks = document.getElementsByClassName("site-nav-item");

  // console.log(navLinks)

  // const scrollScreen = document.querySelector(["body", "html"]);
  const scrollScreen = document.querySelector("html");
  // get header element
  const siteHeader: HTMLHeadingElement | null =
    document.querySelector(".site-header");

  const scrollElements = document.querySelectorAll(".tabcontent");

  const elementInView = (el: Element, scrollOffset = 100) => {
    // eslint-disable-next-line prefer-destructuring
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) -
        scrollOffset
    );
  };

  const displayScrollElement = (element: Element | null) => {
    element?.classList.remove("scrolled-no-animation");
    element?.classList.add("scrolled");
  };

  const displayScrollElementNoAnimation = (element: Element | null) => {
    element?.classList.add("scrolled-no-animation");
    element?.classList.remove("scrolled");
  };

  const hideScrollElement = (element: Element | null) => {
    element?.classList.remove("scrolled");
    element?.classList.remove("scrolled-no-animation");
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
    if (scrollScreen !== null && scrollScreen.scrollTop >= 100) {
      siteHeader?.classList.add("fixed-header");
    } else {
      siteHeader?.classList.remove("fixed-header");
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

  const scrollTo = (element: { offsetTop: number | undefined }) => {
    if (element.offsetTop !== undefined) {
      scrollScreen?.scrollTo({
        behavior: "smooth",
        left: 0,
        top: element.offsetTop - 100, // deduct height of header.
      });
    }
  };

  /**
   * Mobile menu
   */
  const menuToggle = document.querySelector(
    ".menu-toggle"
  ) as HTMLButtonElement;

  const slideoutMenu = document.querySelector(".site-navigation") as HTMLElement;

  // eslint-disable-next-line prefer-destructuring
  const slideoutMenuHeight = slideoutMenu?.offsetHeight;

  // mobile menu toggle button
  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();

    // toggle open class
    slideoutMenu.classList.toggle("show");

    slideoutMenu.style.top = "0px";
    slideoutMenu.style.transition = "all 0.3s ease-in 0s";

    // add css transition to menu
    // slide menu
    if (!slideoutMenu.classList.contains("show")) {
      slideoutMenu.style.transition = "all 0.3s ease-in 0s";
      slideoutMenu.style.top = `${-slideoutMenuHeight}px`;
    }

     
      
   
  });

  const navlinksArray :Element[] = Array.from(navLinks)

  // Iterated over array with forEach.
  navlinksArray.forEach((link:any) => {
    
    // add event listener to each link
    link.addEventListener(
      "click",
      (e: { target: {hash: string}; preventDefault: () => void })=> {
        // Store hash
        // eslint-disable-next-line prefer-destructuring
        const { hash } = e.target;

        // check if has empty
        if (hash !== "") {
          // if not, Prevent default anchor click behavior
          e.preventDefault();

          // select element id converting hash to string using template literal and use as argument in scrolling function.
          scrollTo(<HTMLElement>document.querySelector(`${hash}`));
        } // End if

        // hide menu when link is clicked
        if (slideoutMenu.classList.contains("show")) {
           slideoutMenu.style.top = `${-slideoutMenuHeight}px`;
          // slideoutMenu.style.top = "0px";
          slideoutMenu.classList.remove("show");
        } 
      }
    );
  });

  const testLink = document.querySelector("#project-page-link");

  testLink?.addEventListener(
    "click",
    (e: { preventDefault: () => void; target: any }) => {
      // Store hash
      // eslint-disable-next-line prefer-destructuring
      const { hash } = e.target;

      // check if has empty
      if (hash !== "") {
        // if not, Prevent default anchor click behavior
        e.preventDefault();
        // select element id converting hash to string using template literal and use as argument in scrolling function.
        scrollTo(<HTMLElement>document.querySelector(`${hash}`));
      } // End if
    }
  );
};

export default MainFunc;
