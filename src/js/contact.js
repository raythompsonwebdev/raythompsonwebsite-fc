/**
 * Contact Form
 * @type {Object}
 */
const myForm = document.getElementById("myform");
/**
 * Error
 * @type {Object}
 */
const error = document.getElementById("form-error");

// deconstruct array of form elements
const [text, email, , , , , comments, linker, privacy, submit] = myForm;

// eslint-disable-next-line no-console
console.log(privacy);

/**
 * Input Name Validation
 * @param {Object} evt
 * @param {Object} srcElement
 */
const dirtyInputName = (evt) => {
  evt.preventDefault();
  // eslint-disable-next-line prefer-destructuring
  const { srcElement } = evt;
  // check if input matches pattern
  if (
    srcElement.validity.patternMismatch ||
    srcElement.validity.tooShort ||
    srcElement.validity.tooLong
  ) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent =
      "Name must contain letters. No numbers or less than 3 characters.";
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
  const { srcElement } = evt;
  // regex to detect valid email
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // check if input matches pattern
  if (!emailRegExp.test(srcElement.value)) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "Please provide a valid e-mail address!";
    srcElement.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    srcElement.classList.add("dirty");
  }
};

// comments field
const dirtyInputComments = (evt) => {
  evt.preventDefault();

  // element
  // eslint-disable-next-line prefer-destructuring
  const { srcElement } = evt;
  // regex to detect html tags
  const commentsRegExp = /<\/?[^>]+(>|$)/g;
  // check if input matches pattern
  if (commentsRegExp.test(srcElement.value)) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Naughty! NO HTML or Javascript Allowed!";
    srcElement.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    srcElement.classList.remove("dirty");
  }
};

// comments field
const privacyBtn = (evt) => {
  evt.preventDefault();
  // Get the modal
  const modal = document.getElementById("myModal");

  // eslint-disable-next-line no-console
  console.log(evt.target);

  // Get the <span> element that closes the modal
  // eslint-disable-next-line prefer-destructuring
  const span = document.getElementsByClassName("close")[0];

  // If the checkbox is checked, display the output text
  if (evt.target === linker) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }

  // When the user clicks on <span> (x), close the modal
  // eslint-disable-next-line func-names
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  // eslint-disable-next-line func-names
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
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
      error.classList.remove("hide-error");
      error.classList.add("show-error");
      error.innerHTML = `<h1>Message not sent - Network ${err}</h1>`;

      // eslint-disable-next-line no-console
      console.error("Fetch Error : ", err.message);
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
  } else if (!privacy.checked) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "GDPR required!";
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

// name field
// text.addEventListener("input", dirtyInputName);
linker.addEventListener("click", privacyBtn);
