type Form = {
  text: HTMLInputElement | null;
  email: HTMLInputElement | null;
  comments: HTMLInputElement | null;
  openmodal: HTMLInputElement | null;
  myprivacy: HTMLInputElement | null;
  submit: HTMLInputElement | null;
};

const myForm: any = document.getElementById("myform");

const error: any = document.getElementById("form-error");

// deconstruct array of form elements
const [text, email, comments, openmodal, myprivacy, submit]: any[] = myForm;

/**
 * Input Name Validation
 * @param {Object} evt
 */
const dirtyInputName = (evt: any) => {
  evt.preventDefault();

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
      "Name must not contain numbers or be less than 3 characters.";
    srcElement.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    srcElement.classList.add("dirty");
  }
};

// email field
const dirtyInputEmail = (evt: any) => {
  evt.preventDefault();

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
const dirtyInputComments = (evt: any) => {
  evt.preventDefault();

  const { srcElement } = evt;

  // regex to detect html tags
  const commentsRegExp = /<\/?[^>]+(>|$)/g;

  // check if input matches pattern
  if (commentsRegExp.test(srcElement.value)) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Naughty! No HTML Tags allowed.";
    srcElement.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    srcElement.classList.remove("dirty");
  }
};

// comments field
const privacyBtn = (evt: any) => {
  evt.preventDefault();
  // Get the modal
  const modal: any = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  // eslint-disable-next-line prefer-destructuring
  const span: any = document.getElementsByClassName("close")[0];

  // If the checkbox is checked, display the output text
  if (evt.target === openmodal) {
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
const submitForm = (e: any) => {
  if (text.validity.valueMissing || email.validity.valueMissing) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "Name and email address are required!";
    text.classList.add("dirty");
    email.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";

    e.preventDefault();

    const formData = new FormData(myForm);

    fetch("php/validation.php", {
      method: "POST",
      mode: "no-cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
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
        error.innerHTML = `<h1>Message not sent - Network ${err.message}</h1>`;
      });
  }
};

error.classList.add("hide-error");
error.textContent = "";

// submit button
submit.addEventListener("click", submitForm);

// name field
text.addEventListener("blur", dirtyInputName);

// email field
email.addEventListener("blur", dirtyInputEmail);

// prevent spaces from being typed in the email field
const blockspace = (evt: any) => {
  if (evt.key === " ") {
    evt.preventDefault();
  }
};

email.addEventListener("keydown", blockspace);

// comments field
comments.addEventListener("input", dirtyInputComments);
comments.addEventListener("blur", dirtyInputComments);

// name field
openmodal.addEventListener("click", privacyBtn);
