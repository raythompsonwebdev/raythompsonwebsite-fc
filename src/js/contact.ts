type DataInput = {
  preventDefault?: () => void;
  srcElement?: HTMLInputElement | null;
};

const myForm = document.getElementById("myform") as HTMLFormElement | null;

const error = document.getElementById("form-error") as HTMLDivElement | null;

// deconstruct array of form elements
const { myname, myemail, mycomments, openmodal, myprivacy, submitter } = myForm;

// eslint-disable-next-line no-console
console.log(myprivacy);

/**
 * Input Name Validation
 * @param {Object} evt
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyInputName = (evt: DataInput) => {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyInputEmail = (evt: DataInput) => {
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

const dirtyInputComments = (evt: DataInput) => {
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
const privacyBtn = (evt: {
  target: HTMLElement;
  preventDefault?: () => void;
  srcElement?: HTMLElement;
}) => {
  evt.preventDefault();
  // Get the modal
  const modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  // eslint-disable-next-line prefer-destructuring
  const span = document.getElementsByClassName("close")[0] as HTMLElement;

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
const submitForm = (e: { preventDefault: () => void }): void => {
  // eslint-disable-next-line no-console
  console.log(e);
  e.preventDefault();
  if (myname.validity.valueMissing || myemail.validity.valueMissing) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "Name and email address are required!";
    myname.classList.add("dirty");
    myemail.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";

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
submitter.addEventListener("click", submitForm);

// name field
myname.addEventListener("blur", dirtyInputName);

// email field
myemail.addEventListener("blur", dirtyInputEmail);

// prevent spaces from being typed in the email field
const blockspace = (evt: { key: string; preventDefault: () => void }) => {
  if (evt.key === " ") {
    evt.preventDefault();
  }
};

myemail.addEventListener("keydown", blockspace);

// comments field
mycomments.addEventListener("input", dirtyInputComments);
mycomments.addEventListener("blur", dirtyInputComments);

// name field
openmodal.addEventListener("click", privacyBtn);
