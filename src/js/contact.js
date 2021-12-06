/**
 * Contact Form
 */
const myForm = document.getElementById("myform");
const error = document.getElementById("form-error");

// deconstruct array of form elements
// subscribed, select, comtype1, comtype2, comtype3 variable replaced with space g

const [text, email, url, , , , , ,] = myForm;

error.classList.add("hide-error");
error.textContent = "";

text.addEventListener("blur", (e) => {
  e.preventDefault();
  text.style.setProperty("--text-error", "none");
  if (text.validity.patternMismatch) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "name too short or more than 40 characters. ";
    text.style.setProperty("--text-error", "solid 2px #f38383cb");
  } else {
    error.classList.add("hide-error");
    error.classList.remove("show-error");
    error.textContent = "";
    text.style.setProperty("--text-error", "none");
  }
});

email.addEventListener("blur", (e) => {
  e.preventDefault();
  error.textContent = "";
  email.style.setProperty("--email-error", "none");
  if (email.validity.typeMismatch) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "I am expecting an e-mail address!";
    email.style.setProperty("--email-error", "solid 2px #f38383cb");
  } else if (email.validity.patternMismatch) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "I am expecting a valid e-mail address!";
    email.style.setProperty("--email-error", "solid 2px rgb(250, 250, 135)");
  } else {
    error.classList.remove("show-error");
    error.classList.add("hide-error");
    error.textContent = "";
    email.style.setProperty("--email-error", "none");
  }
});

url.addEventListener("blur", (e) => {
  e.preventDefault();
  url.style.setProperty("--url-error", "none");
  if (url.validity.typeMismatch) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "I am expecting a web address!";
    url.style.setProperty("--url-error", "solid 2px #f38383cb");
  } else if (url.validity.patternMismatch) {
    error.classList.remove("hide-error");
    error.classList.add("show-error");
    error.textContent = "I am expecting an valid web pattern!";
    url.style.setProperty("--url-error", "solid 2px rgb(250, 250, 135)");
  } else {
    error.classList.remove("show-error");
    error.classList.add("hide-error");
    error.textContent = "";
    url.style.setProperty("--url-error", "none");
  }
});

function showError(e) {
  if (text.validity.valueMissing && email.validity.valueMissing) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "name and email address are required!";
    text.style.setProperty("--text-error", "solid 2px rgb(136, 136, 241)");
    email.style.setProperty("--email-error", "solid 2px rgb(136, 136, 241)");
  } else if (!text.validity.valid && !email.validity.valid) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent =
      "name and email address are required and need to be valid!";
    text.style.setProperty("--text-error", "solid 2px rgb(136, 136, 241)");
    email.style.setProperty("--email-error", "solid 2px rgb(136, 136, 241)");
  } else {
    e.preventDefault();
    // get user input
    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    // eslint-disable-next-line no-restricted-syntax
    for (const pair of formData) {
      searchParams.append(pair[0], pair[1]);
    }

    const urlToVal = "php/validation.php";

    fetch(urlToVal, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((response) => {
        error.classList.remove("hide-error");
        error.classList.add("show-error");
        // error.innerHTML = `${response}`;
        error.innerHTML = ` form currently under maintenance and will be operational very soon!`;
        // eslint-disable-next-line no-console
        console.error(response);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("Fetch Error :-S", err);
      });
  }
}
myForm.addEventListener("submit", showError);