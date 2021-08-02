const myForm = document.forms[0];
const mySubmit = document.getElementById("submit");
const error = document.getElementById("formerror");

// deconstruct array of form elements
//subscribed, select, comtype1, comtype2, comtype3 variable replaced with space g
const [text, email, url, , , , , ,comment  ] = myForm;

error.style.display = "none";

//var formData = new FormData(my
console.log(myForm);

function validateForm(e) {

  e.preventDefault();

  if (email.validity.valueMissing && text.validity.valueMissing ) {
    error.style.display = "block";
    error.textContent = "Fields cannot be empty.";
  } else {
    error.style.display = "none";
    error.textContent = "";
  }

  if (text.validity.typeMismatch || text.validity.patternMismatch) {
    text.setCustomValidity("I am expecting an full name!");

  } else {
    text.setCustomValidity("");

  }
  if (email.validity.typeMismatch || email.validity.patternMismatch) {
    email.setCustomValidity("I am expecting an e-mail address!");

  } else {
    email.setCustomValidity("");
  }

  if (url.validity.patternMismatch || url.validity.typeMismatch) {
    url.setCustomValidity("I am expecting a valid web address!");

  } else {
    url.setCustomValidity("");
  }

  if (comment.validity.tooShort || comment.validity.tooLong ) {
    comment.setCustomValidity("I am expecting a valid text, No HTML!");

  } else {
    comment.setCustomValidity("");
  }

  email.reportValidity("");
  text.reportValidity("");
  url.reportValidity("");
  comment.reportValidity("");
}

mySubmit.addEventListener("click", validateForm);

text.addEventListener("mousedown", (e)=>{
  e.preventDefault(e);
  if(error.style.display == "block"){
    error.style.display = "none";
    error.textContent = "";
  }
});


