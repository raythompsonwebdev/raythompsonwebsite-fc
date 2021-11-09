"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Contact Form
 */
var myForm = document.forms[0];
var mySubmit = document.getElementById("submit");
var error = document.getElementById("form-error"); // deconstruct array of form elements
// subscribed, select, comtype1, comtype2, comtype3 variable replaced with space g
// eslint-disable-next-line no-console

var _myForm = _slicedToArray(myForm, 8),
    text = _myForm[0],
    email = _myForm[1],
    url = _myForm[2];

error.classList.add("hide-error");
error.textContent = "";
text.addEventListener("blur", function (e) {
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
email.addEventListener("blur", function (e) {
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
url.addEventListener("blur", function (e) {
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
  // const myname = document.querySelector("#myname").value;
  // const myemail = document.querySelector("#myemail").value;
  // const reference = document.querySelector("#reference").value;
  if (text.validity.valueMissing && email.validity.valueMissing) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "name and email address are required!";
    text.style.setProperty("--text-error", "solid 2px rgb(136, 136, 241)");
    email.style.setProperty("--email-error", "solid 2px rgb(136, 136, 241)");
  } else if (!text.validity.valid && !email.validity.valid) {
    error.classList.add("show-error");
    error.classList.remove("hide-error");
    error.textContent = "name and email address are required and need to be valid!";
    text.style.setProperty("--text-error", "solid 2px rgb(136, 136, 241)");
    email.style.setProperty("--email-error", "solid 2px rgb(136, 136, 241)");
  } else {
    e.preventDefault(); // const data = new FormData(myForm);

    var URLSearchParamss = new URLSearchParams(myForm); // eslint-disable-next-line no-console

    console.log(URLSearchParamss);
    fetch("php/validation.php", {
      method: "POST",
      body: URLSearchParamss
    }).then(function (response) {
      if (response.status !== 200) {
        // eslint-disable-next-line no-alert
        alert("Looks like there was a problem. Status Code: ".concat(response.status));
      }

      return response.json(); // Examine the text in the response
    }).then(function (response) {
      // eslint-disable-next-line no-console
      console.log(response);
    })["catch"](function (err) {
      // eslint-disable-next-line no-console
      console.error("Fetch Error :-S", err);
    });
  }
}

mySubmit.addEventListener("click", showError);
//# sourceMappingURL=contact.js.map
