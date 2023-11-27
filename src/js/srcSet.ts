/**
 * srcset images
 *  */

const SrcSet = () => {
  // get portfolio grid images
  const portImages = document.querySelectorAll<HTMLImageElement>("img.projectImg");

  const portImagesArray :HTMLImageElement[] = Array.from(portImages)

  // function to create srcset markup string to add to images
  const makeSrcset = (imgSrc: string) => {
    const markup = [];
    let width = 300;

    for (let i = 0; i < 10; i += 1) {
      markup[i] = `${imgSrc}.webp ${width}w `;
      width += 20;
    }

    return markup.join();
  };
  //loop over inages
  //eslint-disable-next-line no-plusplus
  // for (let i = 0; i < portImagesArray.length; i += 1) {

  //   // get relative path of image.
  //   let imgLink = portImagesArray[i].getAttribute("src");

  //   // remove file ext
  //   imgLink = imgLink?.slice(0, -5);
   
  //   const srcset = makeSrcset(imgLink) as string ;
   
  //   portImagesArray[i].setAttribute("loading", "lazy");
  //   portImagesArray[i].srcset = srcset;
  //   portImagesArray[i].sizes = "(width >= 1920px) 380px, (width >= 1440px) and (width <= 1919px) 380px, (width >= 1024px) and (width <= 1279px) 380px,(width >= 736px) and (width <= 1023px) 360px,(width >= 601px) and (width <= 735px) 360px,(width >= 481px) and (width <= 600px) 320px, (width >= 361px) and (width <= 480px) 320px, 100vw";
    
    
   
  // }

// Loop over images using forEach
  portImagesArray.forEach((img) => {
    // get relative path of image.
    const imgLink = img.getAttribute("src")?.slice(0, -5) || "";

    const srcset = makeSrcset(imgLink);
    
    img.setAttribute("loading", "lazy");
    img.srcset = srcset;
    img.sizes =
      "(width >= 1920px) 380px, (width >= 1440px) and (width <= 1919px) 380px, (width >= 1024px) and (width <= 1279px) 380px,(width >= 736px) and (width <= 1023px) 360px,(width >= 601px) and (width <= 735px) 360px,(width >= 481px) and (width <= 600px) 320px, (width >= 361px) and (width <= 480px) 320px, 100vw";
  });

}

export default SrcSet;
