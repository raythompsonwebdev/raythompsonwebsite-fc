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
		handleScrollAnimation();
	};

	const scrollTo = (element) => {
		scrollScreen.scrollTo({
			behavior: "smooth",
			left: 0,
			top: element.offsetTop - 100, // deduct height of header.
		});
	};

	/**
	 * Mobile menu
	 */

	// create menu variables
	const slideoutMenu = document.querySelector(".site_navigation");
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

	/**
	 * Contact Form
	 */
	const myForm = document.forms[0];
	const mySubmit = document.getElementById("submit");
	const error = document.getElementById("form-error");
	// deconstruct array of form elements
	// subscribed, select, comtype1, comtype2, comtype3 variable replaced with space g
	const [text, email, url, , , , , ,] = myForm;

	error.classList.add("hide-error");
	error.textContent = "";

	text.addEventListener("blur", (e) => {
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

	email.addEventListener("blur", (e) => {
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

	url.addEventListener("blur", (e) => {
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
			error.textContent =
				"name and email address are required and need to be valid!";
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

	const boxes = document.querySelectorAll(".box");
	const tabs = document.querySelectorAll(".project_tab");
	const arrayTabs = Array.from(tabs);
	const arrayBoxes = Array.from(boxes);
	arrayTabs.forEach((element1) => {
		element1.addEventListener("click", (e) => {
			e.preventDefault();

			arrayBoxes.filter((element2) => {
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
