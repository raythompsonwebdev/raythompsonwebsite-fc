import "./fonts/cabin-2--webfont/style.css";
import "./fonts/amaranth-webfont/style.css";
import "./sass/style.scss";
import "./js/main";
import "./js/projects";
import "./js/slider";
import "./js/contact";

// set backround image for home page
const bgImage = document.querySelector("#banner");
bgImage.style.setProperty(
  "--bg-image",
  "url(images/sergi-kabrera-2xU7rYxsTiM-unsplash.jpg)"
);

// set alt attributes for portfolio grid images
const shoeStore = document.getElementById("shoestoreImg");
shoeStore.setAttribute("alt", "shoestore-home-page");

const travelagency = document.getElementById("travelAgencyImg");
travelagency.setAttribute("alt", "travel-agency-home-page");

const mannering = document.getElementById("manneringImg");
mannering.setAttribute("alt", "mannering-musicmvc-home-page");

const quoteGenerator = document.getElementById("quoteGeneratorImg");
quoteGenerator.setAttribute("alt", "random-quote-generator");

const productPage = document.getElementById("scrollingPageImg");
productPage.setAttribute("alt", "scrolling-product-page");

const cssDoc = document.getElementById("cssDocImg");
cssDoc.setAttribute("alt", "css-documentation-page");

const weatherApp = document.getElementById("weatherAppImg");
weatherApp.setAttribute("alt", "code-pen-weather-app");

const tributePage = document.getElementById("tributePageImg");
tributePage.setAttribute("alt", "obama-tribute-page");

const clashvibes = document.getElementById("clashvibesImg");
clashvibes.setAttribute("alt", "clashvibes-home-page");

const drumMachine = document.getElementById("drumMachineImg");
drumMachine.setAttribute("alt", "drum-machine");

const reactDrumMachine = document.getElementById("reactWeatherAppImg");
reactDrumMachine.setAttribute("alt", "react-weather-app");

const reactWeatherApp = document.getElementById("reactQuoteGeneratorImg");
reactWeatherApp.setAttribute("alt", "react-random-quote-generator");

// get portfolio grid images
const portImages = document.querySelectorAll("img.projectImg");

// function to create srcset markup string to add to images
function makeSrcset(imgSrc) {
  const markup = [];
  let width = 240;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    markup[i] = `${imgSrc}.png ${width}w`;
    width += 20;
  }

  return markup.join();
}
// loop over inages
// eslint-disable-next-line no-plusplus
for (let i = 0; i < portImages.length; i++) {
  // get relative path of image.
  let imgLink = portImages[i].getAttribute("src");
  imgLink = imgLink.slice(0, -4);
  const srcset = makeSrcset(imgLink);
  // eslint-disable-next-line no-console
  // console.log(srcset);

  portImages[i].srcset = srcset;
  portImages[i].sizes =
    "(min-width: 90em) 370px, (min-width: 80em) and (max-width: 1439px) 350px, (min-width: 64em) and (max-width: 1279px) 330px, (min-width: 46em) and (max-width: 1023px) 310px, (min-width: 37.5em) and (max-width: 735px) 310px,(min-width: 30em) and (max-width: 599px) 330px, (min-width: 22.5em) and (max-width: 479px) 310px, 85vw";
}
