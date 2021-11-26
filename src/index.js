import "./fonts/cabin-2--webfont/style.css";
import "./fonts/amaranth-webfont/style.css";
import "./fonts/font-awesome-4.7.0/scss/font-awesome.scss";
import "./sass/style.scss";
import "./js/main";
import "./js/projects";
import "./js/slider";
import "./js/contact";

import shoestorePic from "./images/Projects/www-shoestore-website-home-page.png";
import travelagencyPic from "./images/Projects/travel-agency-home-page.png";
import manneringPic from "./images/Projects/mannering-musicmvc-home-page.png";
import quoteGeneratorPic from "./images/Projects/codepen-random-quote-generator.png";
import productPagePic from "./images/Projects/codepen-scrolling-product-page.png";
import cssDocPic from "./images/Projects/codepen-css-documentation-page.png";
import weatherAppPic from "./images/Projects/code-pen-weather-app.png";
import tributePagePic from "./images/Projects/codepen-obama-tribute-page.png";
import clashvibesPic from "./images/Projects/www-clashvibes-website-home-page.png";
import drumMachinePic from "./images/Projects/codepen-drum-machine-2021.10.26.png";
import reactDrumMachinePic from "./images/Projects/codepen-react-weather-app-2021.10.26.png";
import reactWeatherAppPic from "./images/Projects/codepen-react-random-quote-generator-2021.10.26.png";

const bgImage = document.querySelector("#banner");

bgImage.style.setProperty(
  "--bg-image",
  "url(images/sergi-kabrera-2xU7rYxsTiM-unsplash.jpg)"
);

// const profileImage = document.querySelector("#pageImage").srcset;

// eslint-disable-next-line no-console
// console.log(profileImage);

const shoeStore = document.getElementById("shoestoreImg");
shoeStore.src = shoestorePic;
shoeStore.setAttribute("alt", "Image of shoestore website home page");

const travelagency = document.getElementById("travelAgencyImg");
travelagency.src = travelagencyPic;
travelagency.setAttribute("alt", "Image of travel Agency website home page");

const mannering = document.getElementById("manneringImg");
mannering.src = manneringPic;
mannering.setAttribute(
  "alt",
  "Image of mannering music store website home page"
);

const quoteGenerator = document.getElementById("quoteGeneratorImg");
quoteGenerator.src = quoteGeneratorPic;
quoteGenerator.setAttribute(
  "alt",
  "Image of Javascript Random Quote Generator home page"
);

const productPage = document.getElementById("scrollingPageImg");
productPage.src = productPagePic;
productPage.setAttribute(
  "alt",
  "Image of scrolling product page website home page"
);

const cssDoc = document.getElementById("cssDocImg");
cssDoc.src = cssDocPic;
cssDoc.setAttribute("alt", "Image of css documentation website home page");

const weatherApp = document.getElementById("weatherAppImg");
weatherApp.src = weatherAppPic;
weatherApp.setAttribute("alt", "Image of Javascript Weather App home page");

const tributePage = document.getElementById("tributePageImg");
tributePage.src = tributePagePic;
tributePage.setAttribute("alt", "Image of Barack Obama tribute page ");

const clashvibes = document.getElementById("clashvibesImg");
clashvibes.src = clashvibesPic;
clashvibes.setAttribute("alt", "Image of clashvibes wordpress theme home page");

const drumMachine = document.getElementById("drumMachineImg");
drumMachine.src = drumMachinePic;
drumMachine.setAttribute("alt", "Image of javascript drum machine");

const reactDrumMachine = document.getElementById("reactWeatherAppImg");
reactDrumMachine.src = reactDrumMachinePic;
reactDrumMachine.setAttribute("alt", "Image of react weather app home page");

const reactWeatherApp = document.getElementById("reactQuoteGeneratorImg");
reactWeatherApp.src = reactWeatherAppPic;
reactWeatherApp.setAttribute("alt", "Image of shoestore-website-home-page");
