/* eslint-disable func-style */
/**
 * Contact Form
 */
const myForm = document.getElementById("myform");
const error = document.getElementById("form-error");

// deconstruct array of form elements
// subscribed, select, comtype1, comtype2, comtype3 variable replaced with space g

const [text, email, , , , , comments, submit] = myForm;

// eslint-disable-next-line no-console
// console.log(comments);

// eslint-disable-next-line func-style
const dirtyInputName = (evt) => {
  evt.preventDefault();
  const elem = evt.srcElement;
  // check if input matches pattern
  if (elem.validity.patternMismatch) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent =
      "name must contain letters. no numbers or special characters.";
    elem.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    elem.style.setProperty("--text-error", "none");
    elem.classList.add("dirty");
  }
};

// eslint-disable-next-line func-style
const dirtyInputEmail = (evt) => {
  evt.preventDefault();
  const elem = evt.srcElement;
  // regex to detect valid email
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // check if input matches pattern
  if (!emailRegExp.test(elem.value)) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "Please provide a valid e-mail address!";
    // elem.style.setProperty("--comment-error", "solid 2px #f38383cb");
    elem.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    // elem.style.setProperty("--text-error", "none");
    elem.classList.add("dirty");
  }
};

// eslint-disable-next-line func-style
const dirtyInputComments = (evt) => {
  evt.preventDefault();

  // element
  const elem = evt.srcElement;
  // regex to detect html tags
  const commentsRegExp = /<\/?[^>]+(>|$)/g;
  // check if input matches pattern
  if (commentsRegExp.test(elem.value)) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "No HTML Tags or Javascript Allowed.";
    // elem.style.setProperty("--comment-error", "solid 2px #f38383cb");
    elem.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    // elem.style.setProperty("--comment-error", "none");
    elem.classList.remove("dirty");
  }
};

const submitForm = () => {
  // const searchParams = new URLSearchParams();
  // // eslint-disable-next-line no-restricted-syntax
  // for (const pair of formData) {
  //   searchParams.append(pair[0], pair[1]);
  // }

  const formData = new FormData(myForm);
  // const urlToVal = "./php/validation.php";

  fetch("/php/validation.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        // error processing
        throw response.status;
      }
      return response.text();
    })
    .then((response) => {
      error.classList.remove("hide-error");
      error.classList.add("show-error");
      error.innerHTML = `${response}`;
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("Fetch Error : ", err);
    });
};

const showError = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.log(text.validity.valueMissing);

  if (text.validity.valueMissing || email.validity.valueMissing) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "name and email address are required!";
    // text.setCustomValidity("Name and email are required.");
    // email.setCustomValidity("Name and email are required.");
    text.classList.add("dirty");
    email.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    submitForm(e);
  }
};

// prevent spaces from being typed in the email field
// function blockspace(evt) {
//   if (evt.key == " ") {
//       evt.preventDefault();
//   }
// }

error.classList.add("hide-error");
error.textContent = "";

submit.addEventListener("click", showError);

// text.addEventListener("input", dirtyInputName);
text.addEventListener("blur", dirtyInputName);

// email.addEventListener("input", dirtyInputEmail);
email.addEventListener("blur", dirtyInputEmail);

comments.addEventListener("input", dirtyInputComments);
comments.addEventListener("blur", dirtyInputComments);
