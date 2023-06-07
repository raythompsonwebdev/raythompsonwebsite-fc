/**
 * srcset images
 *  */
// get portfolio grid images
const portImages = document.querySelectorAll("img.projectImg");

// function to create srcset markup string to add to images
// const makeSrcset = (imgSrc: string) => {
//   const markup = [];
//   let width = 300;

//   for (let i = 0; i < 10; i += 1) {
//     markup[i] = `${imgSrc}-${width}.webp ${width}w `;
//     width += 20;
//   }

//   return markup.join();
// };
// loop over inages
// eslint-disable-next-line no-plusplus
for (let i = 0; i < portImages.length; i += 1) {
  // get relative path of image.
  let imgLink = portImages[i].getAttribute("src");

  // remove file ext
  imgLink = imgLink.slice(0, -5);
  // const srcset = makeSrcset(imgLink);

  // eslint-disable-next-line no-console
  // console.log(imgLink);
  portImages[i].setAttribute("loading", "lazy");
  // portImages[i].srcset = srcset;
  // portImages[i].sizes =
  //   "(min-width: 90em) 360px, (min-width: 80em) and (max-width: 1439px) 340px, (min-width: 64em) and (max-width: 1279px) 340px, (min-width: 46em) and (max-width: 1023px) 300px, (min-width: 37.5em) and (max-width: 735px) 300px,(min-width: 30em) and (max-width: 599px) 340px, (min-width: 22.5em) and (max-width: 479px) 320px, 85vw";
}
