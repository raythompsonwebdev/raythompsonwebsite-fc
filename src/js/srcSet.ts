/**
 * srcset images
 *  */

const SrcSet = () => {
  // get portfolio grid images
  const portImages =
    document.querySelectorAll<HTMLImageElement>("img.projectImg");

  const portImagesArray: HTMLImageElement[] = Array.from(portImages);

  // function to create srcset markup string to add to images
  const makeSrcset = (imgSrc: string) => {
    const markup = [];
    let width = 390;

    for (let i = 0; i < 4; i++) {
      markup[i] = `${imgSrc}-${width}.webp ${width}w `;
      width -= 20;
    }

    return markup.join();
  };
  //loop over inages
  //eslint-disable-next-line no-plusplus
  // for (let i = 0; i < portImagesArray.length; i += 1) {
  //   // get relative path of image.
  //   let imgLink = portImagesArray[i].getAttribute("src")?.slice(0, -5) || "";

  //   // remove file ext
  //   // imgLink = imgLink?.slice(0, -5);

  //   const srcset = makeSrcset(imgLink) as string;

  //   portImagesArray[i].setAttribute("loading", "lazy");
  //   portImagesArray[i].srcset = srcset;
  //   portImagesArray[i].sizes =
  //     "(width >= 1920px) 390px, (width >= 1440px) and (width <= 1919px) 370px,  (width >= 1280px) and (width <= 1439px) 350px, (width >= 1024px) and (width <= 1279px) 350px, (width >= 736px) and (width <= 1023px) 330px,(width >= 601px) and (width <= 735px) 330px, (width >= 361px) and (width <= 480px) 330px, 100vw";
  // }

  // Loop over images using forEach
  portImagesArray.forEach((img) => {
    // get relative path of image.
    const imgLink = img.getAttribute("src")?.slice(0, -5) || "";

    const srcset = makeSrcset(imgLink);

    img.setAttribute("loading", "lazy");
    img.srcset = srcset;
    img.sizes =
      "(min-width : 1920px) 390px, (min-width : 1440px) 370px,  (min-width : 1280px) 350px, (min-width : 1024px) 350px, (min-width : 736px) 330px,(min-width : 601px) 330px, (min-width : 361px) 330px, 100vw";
  });
};

export default SrcSet;
