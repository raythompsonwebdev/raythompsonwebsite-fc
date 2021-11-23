import "whatwg-fetch";
import getBaseUrl from "./baseUrl";

const baseUrl = getBaseUrl();

// get user function
// eslint-disable-next-line import/prefer-default-export
export function getUsers() {
  // eslint-disable-next-line no-use-before-define
  return get("users");
}

// GET request to api
function get(url) {
  // eslint-disable-next-line no-use-before-define
  return fetch(baseUrl + url).then(onSuccess, onError);
}

// response
function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
