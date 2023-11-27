// document.addEventListener("DOMContentLoaded", () => {

const MainFunc = () => {
  
  // const scrollScreen = document.querySelector(["body", "html"]);
  const scrollScreen = document.querySelector<HTMLHtmlElement>("html");
  // get header element
  const siteHeader =  document.querySelector<HTMLHeadingElement>(".site-header");

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
  const menuToggle = document.querySelector<HTMLButtonElement>(
    ".menu-toggle"
  );

  const slideoutMenu = document.querySelector<HTMLMenuElement>(".site-navigation");

  if(slideoutMenu !== null){
    // eslint-disable-next-line prefer-destructuring
    const slideoutMenuHeight = slideoutMenu.offsetHeight;

    // mobile menu toggle button
    menuToggle?.addEventListener("click", (event) => {
      event.preventDefault();

      // toggle open class
      slideoutMenu?.classList.toggle("show");

      slideoutMenu.style.top = "0px";
      slideoutMenu.style.transition = "all 0.3s ease-in 0s";

      // add css transition to menu
      // slide menu
      if (!slideoutMenu.classList.contains("show")) {
        slideoutMenu.style.transition = "all 0.3s ease-in 0s";
        slideoutMenu.style.top = `${-slideoutMenuHeight}px`;
      }   
    
    });

    // Main Navigation Links - Collection
    const navLinks : NodeListOf<HTMLAnchorElement>  = document.querySelectorAll(".site-inner-anchor");
    // Main Navigation Links - Collection coverted to an Array
    const navlinksArray :HTMLAnchorElement[] = Array.from(navLinks)

    // Iterated over array with forEach.
    navlinksArray.forEach((link : HTMLAnchorElement) => {    
        
      // add event listener to each link
      link.addEventListener(
        "click",
        (e: MouseEvent )=> {

          
          // Store hash
          const { hash } = link;

          // check if hash empty
          if (hash !== "") {

            // if not, Prevent default anchor click behavior
            e.preventDefault();
            
            // select element id converting hash to string using template literal and use as argument in scrolling function.
            scrollTo(<HTMLElement>document.querySelector(`${hash}`));
          } 

          // hide menu when link to page is clicked
          if (slideoutMenu !== null && slideoutMenu.classList.contains("show")) {
            slideoutMenu.style.top = `${-slideoutMenuHeight}px`;
            // slideoutMenu.style.top = "0px";
            slideoutMenu.classList.remove("show");
          } 
        }
      );

    });

  }

  const testLink = document.querySelector<HTMLAnchorElement>("#project-page-link");

  // testLink could be null
  testLink?.addEventListener(
    "click",
    (e: MouseEvent) => {

      // Store hash
      const { hash } = testLink;

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
