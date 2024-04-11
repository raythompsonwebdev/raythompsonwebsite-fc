const myForm = document.getElementById("myform") as HTMLFormElement;

const error = document.getElementById("form-error") as HTMLSpanElement;

const { myname, myemail, mycomments, openmodal, myprivacy, submitter } = myForm;

const dirtyInputName = (e: FocusEvent) => {
  e.preventDefault();

  if (error.textContent !== "") {
    error.textContent = "";
  }

  const nameRegEx = /^[a-zA-Z\s]+$/;

  if (myname.value.length <= 5) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent =
      "Name must not contain less than 5 characters or be empty.";
    myname.classList.remove("dirty");
    myname.classList.add("dirty-invalid");
  } else if (myname.value.length > 30) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Name must not contain more than 30 characters.";
    myname.classList.remove("dirty-valid");
    myname.classList.add("dirty-invalid");
  } else if (!nameRegEx.test(myname.value)) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Name must not contain numbers or special characters";
    myname.classList.remove("dirty-valid");
    myname.classList.add("dirty-invalid");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    myname.classList.remove("dirty-invalid");
    myname.classList.add("dirty-valid");
  }
};

// email
const dirtyInputEmail = (e: FocusEvent) => {
  e.preventDefault();

  if (error.textContent !== "") {
    error.textContent = "";
  }
  // regex to detect valid email
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Basic Email Validation:
  //const emailRegExpOne =
  //  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/; //Strict Email Validation:
  // const emailRegExpTwo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/; //Email Validation with Extended Characters:
  //const emailRegExpThree =
  //  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,}){0,1}$/; //Email Validation with More Strict Domain Part:
  // const emailRegExpFour = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/; //Email Validation Allowing Single Quote and Double Quote
  console.log(emailRegExp.test(myemail.value));
  // check if input matches pattern
  if (!emailRegExp.test(myemail.value)) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "Please provide a valid e-mail address";
    myemail.classList.remove("dirty-valid");
    myemail.classList.add("dirty-invalid");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    myemail.classList.add("dirty-valid");
    myemail.classList.remove("dirty-invalid");
  }

  if (myemail.value.length <= 7) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "e-mail address should be no shorter than 4 characters";
    myemail.classList.remove("dirty-valid");
    myemail.classList.add("dirty-invalid");
  }
  if (myemail.value.length >= 50) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "e-mail address should be no longer than 50 characters";
    myemail.classList.remove("dirty-valid");
    myemail.classList.add("dirty-invalid");
  }
};

// comments
const dirtyInputComments = (e: FocusEvent) => {
  e.preventDefault();

  if (error.textContent !== "") {
    error.textContent = "";
  }

  // regex to detect html tags
  const commentsRegExp = /<\/?[^>]+(>|$)/g || /[a-zA-Z0-9@=\-'"]+/g;

  // check if input matches pattern
  if (commentsRegExp.test(mycomments.value)) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "No HTML Tags allowed.";
    mycomments.classList.remove("dirty-valid");
    mycomments.classList.add("dirty-invalid");
  } else if (mycomments.value.length < 10) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Comment cannot be less than 10 Characters";
    mycomments.classList.remove("dirty-valid");
    mycomments.classList.add("dirty-invalid");
  } else if (mycomments.value.length > 250) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Comment can be up to 250 characters";
    mycomments.classList.remove("dirty-valid");
    mycomments.classList.add("dirty-invalid");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    mycomments.classList.remove("dirty-invalid");
    mycomments.classList.add("dirty-valid");
  }
};

// privacy button
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

// form submit button
const submitForm = (e: MouseEvent) => {
  e.preventDefault();
  if (myname.validity.valueMissing && myemail.validity.valueMissing) {
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

// prevent spaces from being typed in the email field
const blockspace = (evt: { key: string; preventDefault: () => void }) => {
  if (evt.key === " ") {
    evt.preventDefault();
  }
};

// clear errors and text in fields
error.classList.add("hide-error");
error.textContent = "";

// form submit button
submitter.addEventListener("click", submitForm);

// name field focus out
myname.addEventListener("focusout", dirtyInputName);

// email field focus out
myemail.addEventListener("focusout", dirtyInputEmail);

// email field prevent spaces from being typed in the email field
myemail.addEventListener("keydown", blockspace);

// comments field focus out
mycomments.addEventListener("focusout", dirtyInputComments);

// open privacy policy modal
openmodal.addEventListener("click", privacyBtn);
