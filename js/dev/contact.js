const myForm = document.forms[0];
const mySubmit = document.getElementById("submit");
const error = document.getElementById("form-error");

// const commentFormRegEX = /^[^<>,<|>]+$/;

// deconstruct array of form elements
// subscribed, select, comtype1, comtype2, comtype3 variable replaced with space g
const [text, email, url, , , , , ,] = myForm;

// console.log(comment.value);

error.classList.add("hide-error");
error.textContent = "";

// var formData = new FormData(myForm);

text.addEventListener("blur", (e) => {
	e.preventDefault();
	text.style.setProperty("--text-error", "none");
	if (text.validity.patternMismatch) {
		error.classList.remove("hide-error");
		error.classList.add("show-error");
		error.textContent = "name too short or more than 40 characters. ";
		text.style.setProperty("--text-error", "solid 3px red");
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
		email.style.setProperty("--email-error", "solid 3px red");
	} else if (email.validity.patternMismatch) {
		error.classList.add("show-error");
		error.classList.remove("hide-error");
		error.textContent = "I am expecting a valid e-mail address!";
		email.style.setProperty("--email-error", "solid 3px yellow");
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
		url.style.setProperty("--url-error", "solid 3px red");
	} else if (url.validity.patternMismatch) {
		error.classList.remove("hide-error");
		error.classList.add("show-error");
		error.textContent = "I am expecting an valid web pattern!";
		url.style.setProperty("--url-error", "solid 3px yellow");
	} else {
		error.classList.remove("show-error");
		error.classList.add("hide-error");
		error.textContent = "";
		url.style.setProperty("--url-error", "none");
	}
});

// comment.addEventListener("blur", (e) => {
// 	e.preventDefault();
// 	error.style.display = "none";
// 	error.textContent = "";
// 	comment.style.setProperty("--comment-error", "none");

// 	if (!commentFormRegEX.test(comment.value)) {
// 		error.style.display = "block";
// 		error.textContent = "No HTML Tags Allowed";
// 		comment.style.setProperty("--comment-error", "solid 3px red");
// 	} else {
// 		error.style.display = "none";
// 		error.textContent = "";
// 		comment.style.setProperty("--comment-error", "none");
// 	}
// });

function showError() {
	if (text.validity.valueMissing && email.validity.valueMissing) {
		error.classList.add("show-error");
		error.classList.remove("hide-error");
		error.textContent = "name and email address are required!";
		text.style.setProperty("--text-error", "solid 3px blue");
		email.style.setProperty("--email-error", "solid 3px blue");
	} else if (!text.validity.valid && !email.validity.valid) {
		error.classList.add("show-error");
		error.classList.remove("hide-error");
		error.textContent =
			"name and email address are required and need to be valid!";
		text.style.setProperty("--text-error", "solid 3px blue");
		email.style.setProperty("--email-error", "solid 3px blue");
	} else {
		myForm.submit();
	}
}
mySubmit.addEventListener("click", showError);
