// Your code to run since DOM is loaded and ready
document.addEventListener("DOMContentLoaded", () => {
	// Add smooth scrolling to all links
	const navLinks = document.getElementsByClassName("tablink");
	// get body and html elements
	const scrollScreen = document.querySelector(["body", "html"]);

	// get header element
	const siteHeader = document.querySelector(".site_header");

	const menuToggle = document.querySelector(".menu-toggle");

	// get all divs with class tab content.
	const scrollElements = document.querySelectorAll(".tabcontent");

	// scrollElements.forEach((el) => {
	//   el.style.opacity = 0;
	// });

	// detect page scroll function
	const elementInView = (el, scrollOffset = 100) => {
		const elementTop = el.getBoundingClientRect().top;

		return (
			elementTop <=
			(window.innerHeight || document.documentElement.clientHeight) -
				scrollOffset
		);
	};

	// display element on page scroll
	const displayScrollElement = (element) => {
		element.classList.add("scrolled");
	};

	// hide element on page scroll
	const hideScrollElement = (element) => {
		element.classList.remove("scrolled");
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

	handleScrollAnimation();

	// In JavaScript, using the addEventListener() method:  object.addEventListener("scroll", myScript);
	window.onscroll = function () {
		// fixes header to top of page on page scroll.
		if (scrollScreen.scrollTop >= 100) {
			siteHeader.classList.add("fixed-header");
		} else {
			siteHeader.classList.remove("fixed-header");
		}
		// handle scroll animation
		handleScrollAnimation();
	};
	// scrolling function - (https://codepen.io/ugg0t/pen/mqBBBY)
	const scrollTo = (element) => {
		scrollScreen.scrollTo({
			behavior: "smooth",
			left: 0,
			top: element.offsetTop - 100, // deduct height of header.
		});
	};

	// create menu variables
	const slideoutMenu = document.querySelector(".site_navigation");
	const slideoutMenuHeight = slideoutMenu.offsetHeight;

	// mobile menu toggle button
	menuToggle.addEventListener("click", (event) => {
		event.preventDefault();

		// toggle open class
		slideoutMenu.classList.toggle("open");

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
		link.addEventListener("click", (event) => {
			// Store hash
			const { hash } = event.target;
			// check if has empty
			if (hash !== "") {
				// if not, Prevent default anchor click behavior
				event.preventDefault();

				// select element id converting hash to string using template literal and use as argument in scrolling function.
				scrollTo(document.querySelector(`${hash}`));
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
});
