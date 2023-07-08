// type DataInput = {
//   preventDefault?: () => void;
//   srcElement?: HTMLInputElement | null;
// };

const myForm = document.getElementById("myform") as HTMLFormElement;

const error = document.getElementById("form-error") as HTMLSpanElement;

// deconstruct array of form elements
const { myname, myemail, mycomments, openmodal, myprivacy, submitter } = myForm;

// eslint-disable-next-line no-console
console.log(myprivacy);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyInputName = (e: {
  preventDefault: () => void;
  target: HTMLInputElement;
}): void => {
  e.preventDefault();

  const { target } = e;
  // check if input matches pattern

  // eslint-disable-next-line no-console
  console.log(target);

  if (
    target.validity.patternMismatch ||
    target.validity.tooShort ||
    target.validity.tooLong
  ) {
    error?.classList.remove("hide-error");
    error?.classList.add("show-error");
    error.textContent =
      "Name must not contain numbers or be less than 3 characters.";

    target.classList.add("dirty");
  } else {
    error?.classList.add("hide-error");
    error?.classList.remove("show-error");
    error.textContent = "";
    target.classList.add("dirty");
  }
};

// email field
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyInputEmail = (e: {
  preventDefault: () => void;
  target: HTMLInputElement;
}): void => {
  e.preventDefault();

  const { target } = e;

  // regex to detect valid email
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // check if input matches pattern
  if (!emailRegExp.test(target.value)) {
    error?.classList.add("show-error");
    error?.classList.remove("hide-error");
    error.textContent = "Please provide a valid e-mail address!";
    target.classList.add("dirty");
  } else {
    error?.classList.add("hide-error");
    error?.classList.remove("show-error");
    error.textContent = "";
    target.classList.add("dirty");
  }
};

// comments field

const dirtyInputComments = (e: {
  preventDefault: () => void;
  target: HTMLInputElement;
}): void => {
  e.preventDefault();

  const { target } = e;

  // regex to detect html tags
  const commentsRegExp = /<\/?[^>]+(>|$)/g;

  // check if input matches pattern
  if (commentsRegExp.test(target.value)) {
    error?.classList.remove("hide-error");
    error?.classList.add("show-error");
    error.textContent = "Naughty! No HTML Tags allowed.";
    target.classList.add("dirty");
  } else {
    error?.classList.add("hide-error");
    error?.classList.remove("show-error");
    error.textContent = "";
    target.classList.remove("dirty");
  }
};

// comments field
const privacyBtn = (e: {
  preventDefault: () => void;
  target: string;
}): void => {
  e.preventDefault();
  // Get the modal
  const modal = document.getElementById("myModal") as HTMLElement;

  // Get the <span> element that closes the modal
  // eslint-disable-next-line prefer-destructuring
  const spanElement = document.getElementsByClassName(
    "close"
  )[0] as HTMLSpanElement;

  // If the checkbox is checked, display the output text
  if (e.target === openmodal) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }

  // When the user clicks on <span> (x), close the modal
  // eslint-disable-next-line func-names
  spanElement.onclick = function () {
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
    error?.classList.add("show-error");
    error?.classList.remove("hide-error");
    error.textContent = "Name and email address are required!";
    myname.classList.add("dirty");
    myemail.classList.add("dirty");
  } else {
    error?.classList.add("hide-error");
    error?.classList.remove("show-error");
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
