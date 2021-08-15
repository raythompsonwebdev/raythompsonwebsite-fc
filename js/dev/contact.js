const myForm = document.forms[0];
const mySubmit = document.getElementById("submit");
const error = document.getElementById("formerror");

// deconstruct array of form elements
// subscribed, select, comtype1, comtype2, comtype3 variable replaced with space g
const [text, email, url, , , , , , comment] = myForm;

error.style.display = "none";

// var formData = new FormData(myForm);

text.addEventListener("blur", (e) => {
	e.preventDefault();
	error.style.display = "none";
	error.textContent = "";
	text.style.setProperty("--text-error", "none");
	if (text.validity.patternMismatch) {
		error.style.display = "block";
		error.textContent =
			"No numbers allowed - Name with less than 3 letters not accepted";
		text.style.setProperty("--text-error", "solid 3px red");
	} else {
		error.style.display = "none";
		error.textContent = "";
		text.style.setProperty("--text-error", "solid 3px green");
	}
});

email.addEventListener("blur", (e) => {
	e.preventDefault();
	error.style.display = "none";
	error.textContent = "";
	email.style.setProperty("--email-error", "none");
	if (email.validity.typeMismatch) {
		error.style.display = "block";
		error.textContent = "I am expecting an e-mail address!";
		email.style.setProperty("--email-error", "solid 3px red");
	} else if (email.validity.patternMismatch) {
		error.style.display = "block";
		error.textContent = "I am expecting an e-mail pattern!";
		email.style.setProperty("--email-error", "solid 3px yellow");
	} else {
		error.style.display = "none";
		error.textContent = "";
		email.style.setProperty("--email-error", "solid 3px green");
	}
});

url.addEventListener("blur", (e) => {
	e.preventDefault();
	error.style.display = "none";
	error.textContent = "";
	url.style.setProperty("--url-error", "none");
	if (url.validity.typeMismatch) {
		error.style.display = "block";
		error.textContent = "I am expecting a valid web pattern!";
		url.style.setProperty("--url-error", "solid 3px red");
	} else if (url.validity.patternMismatch) {
		error.style.display = "block";
		error.textContent = "I am expecting an e-mail pattern!";
		url.style.setProperty("--url-error", "solid 3px yellow");
	} else {
		error.style.display = "none";
		error.textContent = "";
		url.style.setProperty("--url-error", "solid 3px green");
	}
});

comment.addEventListener("blur", (e) => {
	e.preventDefault();
	error.style.display = "none";
	error.textContent = "";
	comment.style.setProperty("--comment-error", "none");
	if (comment.validity.patternMismatch) {
		error.style.display = "block";
		error.textContent = "I am expecting valid text!";
		comment.style.setProperty("--comment-error", "solid 3px red");
	} else {
		error.style.display = "none";
		error.textContent = "";
		comment.style.setProperty("--comment-error", "none");
	}
});

function showError() {
	if (text.validity.valueMissing && email.validity.valueMissing) {
		error.style.display = "block";
		error.textContent = "name and email address are required!";
		text.style.setProperty("--text-error", "solid 3px blue");
		email.style.setProperty("--email-error", "solid 3px blue");
	} else if (!text.validity.valid && !email.validity.valid) {
		error.style.display = "block";
		error.textContent =
			"name and email address are required and need to be valid!";
		text.style.setProperty("--text-error", "solid 3px blue");
		email.style.setProperty("--email-error", "solid 3px blue");
	} else {
		myForm.submit();
	}
}
mySubmit.addEventListener("click", showError);
