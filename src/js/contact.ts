const myForm = document.getElementById("myform") as HTMLFormElement;

const error = document.getElementById("form-error") as HTMLSpanElement;

const { myname, myemail, mycomments, openmodal, myprivacy, submitter } = myForm;

const dirtyInputName = (e: FocusEvent) => {
  e.preventDefault();

  if (error.textContent !== "") {
    error.textContent = "";
  }

  const name = myname.value.trim();

  if (name.value === "") {
    error.classList.remove("show-error");
    error.classList.add("hide-error");
  }

  if (name.length <= 5) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent =
      "Name must not contain less than 5 characters or be empty.";
    myname.style.setProperty("--name-error", "#d30d0d");
  } else if (name.length > 30) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Name must not contain more than 30 characters.";
    myname.style.setProperty("--name-error", "#d30d0d");
  } else if (/^[a-zA-Z\s]+$/.test(name) === false) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Name must not contain numbers or special characters";
    myname.style.setProperty("--name-error", "#d30d0d");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    myname.style.setProperty("--name-error", "#b0f1b0");
  }
};

// email
const dirtyInputEmail = (e: FocusEvent) => {
  e.preventDefault();

  if (error.textContent !== "") {
    error.textContent = "";
  }

  const email = myemail.value.trim();

  console.log(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));

  if (email.value === "") {
    error.classList.remove("show-error");
    error.classList.add("hide-error");
  }
  // check if input matches pattern
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myemail.value) ===
    false
  ) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "Please provide a valid e-mail address";
    myemail.style.setProperty("--email-error", "#d30d0d");
  } else if (email.length <= 7) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "e-mail address should be no shorter than 4 characters";
    myemail.style.setProperty("--email-error", "#d30d0d");
  } else if (email.length >= 50) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "e-mail address should be no longer than 50 characters";
    myemail.style.setProperty("--email-errorr", "#d30d0d");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    myemail.style.setProperty("--email-error", "#b0f1b0");
  }
};

// comments
const dirtyInputComments = (e: FocusEvent) => {
  e.preventDefault();

  if (error.textContent !== "") {
    error.textContent = "";
  }

  const comments = mycomments.value.trim();

  if (comments.value === "") {
    error.classList.remove("show-error");
    error.classList.add("hide-error");
  }

  // check if input matches pattern
  if (/<\/?[^>]+(>|$)/.test(comments)) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "No HTML Tags allowed.";
    mycomments.style.setProperty("--comments-error", "#d30d0d");
  } else if (comments.length > 250) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "Comment can be up to 250 characters";
    mycomments.style.setProperty("--comments-error", "#d30d0d");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    mycomments.style.setProperty("--comments-error", "#b0f1b0");
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
    myname.style.setProperty("--name-error", "#d30d0d");
    myemail.style.setProperty("--name-error", "#d30d0d");
  } else {
    error?.classList.add("hide-error");
    error?.classList.remove("show-error");
    error.textContent = "";

    const formData = new FormData(myForm);

    //const resultOne = Object.fromEntries(formData);
    //console.log(resultOne);

    fetch("php/validation.php", {
      method: "POST",
      mode: "no-cors", //// no-cors, *cors, same-origin
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
        error.innerHTML = `<h1>${response}</h1>`;
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
