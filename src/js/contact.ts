// type DataInput = {
//   preventDefault?: () => void;
//   srcElement?: HTMLInputElement | null;
// };

const myForm = document.getElementById("myform") as HTMLFormElement;

const error = document.getElementById("form-error") as HTMLSpanElement;

// deconstruct array of form elements
const { myname, myemail, mycomments, openmodal, myprivacy, submitter } = myForm;

const dirtyInputName = (e: FocusEvent ) => {
  e.preventDefault();

  //const { target } = e;
  // check if input matches pattern

  if(error.textContent !== ""){
    error.textContent = "";
  }

  if (  
      myname.validity.patternMismatch ||
      myname.validity.tooShort ||
      myname.validity.tooLong
    ) {
      error.classList.remove("hide-error");
      error.classList.add("show-error");
      error.textContent =
        "Name must not contain numbers, special characters or be less than 5 characters.";
      myname.classList.add("dirty");
  } else {
      error.classList.add("hide-error");
      error.classList.remove("show-error");
      error.textContent = "";
      myname.classList.add("dirty");
  }
};

// email field
const dirtyInputEmail = (e: FocusEvent) => {
  e.preventDefault();

  // const { target } = e;

  if(error.textContent !== ""){
    error.textContent = "";
  }

  // regex to detect valid email
  // const emailRegExp =
  //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // check if input matches pattern
  if( !emailRegExp.test(myemail.value) ||
    myemail.validity.tooShort ||
    myemail.validity.tooLong
    ) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "Please provide a valid e-mail address";
    myemail.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    myemail.classList.add("dirty");
  }
};

// comments field
const dirtyInputComments = (e: FocusEvent) => {
  e.preventDefault();

  //const { target } = e;

  if(error.textContent !== ""){
    error.textContent = "";
  }

  // regex to detect html tags
  //const commentsRegExp = /<\/?[^>]+(>|$)/g || /[a-zA-Z0-9@=\-'"]+/g;

  const commentsRegExp = /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:'"|\\/]*$/g;

  // check if input matches pattern
  if (commentsRegExp.test(mycomments.value) ||
  mycomments.validity.tooShort ||
  mycomments.validity.tooLong) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "No HTML Tags allowed. comment can be up to 250 characters and not less than 10";
    mycomments.classList.add("dirty");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    mycomments.classList.add("dirty");
  }
};

// comments field
const privacyBtn = (e: MouseEvent) => {
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
  spanElement.onclick = () => {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

// submit form
const submitForm = (e: MouseEvent) => {
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
        error.innerHTML = `<h1>Message not sent - Error ${err.message}</h1>`;
      });
  }
};

error.classList.add("hide-error");
error.textContent = "";

// submit button
submitter.addEventListener("click", submitForm);

// name field
myname.addEventListener("focusout", dirtyInputName);

// email field
myemail.addEventListener("focusout", dirtyInputEmail);

// prevent spaces from being typed in the email field
const blockspace = (evt: { key: string; preventDefault: () => void }) => {
  if (evt.key === " ") {
    evt.preventDefault();
  }
};

myemail.addEventListener("keydown", blockspace);

// comments field
// mycomments.addEventListener("input", dirtyInputComments);
mycomments.addEventListener("focusout", dirtyInputComments);

// name field
openmodal.addEventListener("click", privacyBtn);
