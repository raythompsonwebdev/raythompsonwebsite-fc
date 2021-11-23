// replace '/' with link to api i.e. - heroku. https://myApi.herokuapp.com
export default function getBaseUrl() {
  // const inDevelopment = window.location.hostname === 'localhost';
  // return inDevelopment ? 'http://localhost:3001/' : '/';

  // to use mockapi add ?useMockApi=true to query string
  // eslint-disable-next-line no-use-before-define
  return getQueryStringParameterByName("useMockApi")
    ? "http://localhost:3001/"
    : "/";
}

// get parameters from URL
function getQueryStringParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
