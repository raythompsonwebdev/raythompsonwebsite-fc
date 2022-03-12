/**
 * Contact Form
 */
const myForm = document.getElementById("myform");
const error = document.getElementById("form-error");

// deconstruct array of form elements
const [text, email, , , , , comments, submit] = myForm;

// name field
const dirtyInputName = (evt) => {
  evt.preventDefault();
  // eslint-disable-next-line prefer-destructuring
  const { srcElement } = evt;
  // check if input matches pattern
  if (srcElement.validity.patternMismatch) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent =
      "name must contain letters. no numbers or special characters.";
    srcElement.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    srcElement.classList.add("dirty");
  }
};

// email field
const dirtyInputEmail = (evt) => {
  evt.preventDefault();
  // eslint-disable-next-line prefer-destructuring
  const element = evt.srcElement;
  // regex to detect valid email
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // check if input matches pattern
  if (!emailRegExp.test(element.value)) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "Please provide a valid e-mail address!";
    element.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    element.classList.add("dirty");
  }
};

// comments field
const dirtyInputComments = (evt) => {
  evt.preventDefault();

  // element
  // eslint-disable-next-line prefer-destructuring
  const element = evt.srcElement;
  // regex to detect html tags
  const commentsRegExp = /<\/?[^>]+(>|$)/g;
  // check if input matches pattern
  if (commentsRegExp.test(element.value)) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "No HTML Tags or Javascript Allowed.";
    element.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    element.classList.remove("dirty");
  }
};

// submit form
const submitForm = () => {
  const formData = new FormData(myForm);
  // const urlToVal = "./php/validation.php";

  fetch("/php/validation.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        // error processing
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((response) => {
      error.classList.remove("hide-error");
      error.classList.add("show-error");
      error.innerHTML = `${response}`;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("Fetch Error : ", err.message);
      // throw new Error(err.message);
    })
    .finally((result) => {
      // eslint-disable-next-line no-console
      console.log(`finished  -${result}`);
    });
};

const showError = (e) => {
  e.preventDefault();

  // check if required name and required email address have been entered. If not show error
  if (text.validity.valueMissing || email.validity.valueMissing) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "name and email address are required!";
    text.classList.add("dirty");
    email.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    submitForm(e);
  }
};

error.classList.add("hide-error");
error.textContent = "";

// submit button
submit.addEventListener("click", showError);

// name field
// text.addEventListener("input", dirtyInputName);
text.addEventListener("blur", dirtyInputName);

// email field
// email.addEventListener("input", dirtyInputEmail);
email.addEventListener("blur", dirtyInputEmail);

// prevent spaces from being typed in the email field
const blockspace = (evt) => {
  if (evt.key === " ") {
    evt.preventDefault();
  }
};

email.addEventListener("keydown", blockspace);

// comments field
comments.addEventListener("input", dirtyInputComments);
comments.addEventListener("blur", dirtyInputComments);
