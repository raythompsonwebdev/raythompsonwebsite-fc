const myForm = document.forms[0];
const mySubmit = document.getElementById("submit");
const error = document.getElementById("formerror");
const urlRegEx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// var formData = new FormData(myForm);
// formData.append("username", "Chris");

error.style.display = "none";  
console.log(myForm);

// deconstruct array of form elements
//subscribed, select, comtype1, comtype2, comtype3, comment
const [text, email, url  ] = myForm;

function emptyFields(e) {

  e.preventDefault();

  console.log(text.validity);
  
  if(text.value == "" && email.value == ""){
    error.style.display = "block";
    error.innerHTML = "Form cannot be submitted with empty text fields";
  }

  if(text.value != "" && text.value != "/[A-Za-z ]+ [A-Za-z ]+/"){
    error.style.display = "block";
    error.innerHTML = `Please enter ${text.placeholder}`;
  }

  if(email.value != "" && email.value != emailRegEx){
    error.style.display = "block";
    error.innerHTML = `Please enter ${email.placeholder}`;
  }

  if(url.value != "" && url.value != urlRegEx){
    error.style.display = "block";
    error.innerHTML = `Please enter ${url.placeholder}`;
  }

  

}
mySubmit.addEventListener("click", emptyFields);
