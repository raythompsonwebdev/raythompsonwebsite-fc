import "./fonts/cabin-2--webfont/style.css";
import "./fonts/amaranth-webfont/style.css";
import "./sass/style.scss";
import "./js/main";
import "./js/contact";
import projectTabs from "./js/projects";
import "./js/slider";

window.addEventListener("load", () => {
  /**
   * home page background image
   *
   *  */
  const bgImage = document.querySelector("#banner");
  bgImage.style.setProperty(
    "--bg-image",
    "url(images/sergi-kabrera-2xU7rYxsTiM-unsplash-sqoosh.webp)"
  );

  /**
   * Project Tabs
   *  */
  projectTabs();

  /**
   * Bar Chart
   *  */
  const chartbars = [
    {
      id: "1",
      datapercentage: 60,
      codeplatform: "Replt",
      link: "https://replit.com/@raythompsonweb",
      title: "Link to replt",
    },
    {
      id: "2",
      datapercentage: 50,
      codeplatform: "Codewars",
      link: "https://www.codewars.com/users/raythompsonwebdev/",
      title: "Link to codewars",
    },
    {
      id: 3,
      datapercentage: 70,
      codeplatform: "LeetCode",
      link: "https://leetcode.com/raythompsonwebdev/",
      title: "Link to leetcode",
    },
    {
      id: 4,
      datapercentage: 65,
      codeplatform: "Codepen",
      link: "https://codepen.io/raythompweb",
      title: "Link to codepen",
    },
    {
      id: "5",
      datapercentage: 70,
      codeplatform: "Stackblitz",
      link: "https://stackblitz.com/@raythompsonwebdev",
      title: "Link to stackblitz",
    },
  ];

  const chartBarContainer = document.getElementById("bars");

  // eslint-disable-next-line no-restricted-syntax
  chartbars.forEach((element) => {
    // create bar chart bar using div
    const chartBar = document.createElement("DIV");

    // set bar attributes
    chartBar.setAttribute("data-percentage", `${element.datapercentage}`);
    chartBar.setAttribute("data-codeplatform", `${element.codeplatform}`);
    chartBar.setAttribute("class", "bar");

    // create span
    const chartBarHeader = document.createElement("SPAN");

    // add text
    chartBarHeader.textContent = `${element.codeplatform}`;

    // create list element to contain span and div
    const chartBarList = document.createElement("LI");

    const chartLink = document.createElement("A");
    chartLink.setAttribute("href", `${element.link}`);
    chartLink.setAttribute("title", `${element.title}`);

    chartBar.append(chartLink);

    // append div and span as children
    chartBarList.appendChild(chartBar);
    chartBarList.appendChild(chartBarHeader);
    chartBarContainer.appendChild(chartBarList);

    return chartBarContainer;
  });

  // Create a new Observer
  const observer = new IntersectionObserver(
    (entries) => {
      // log the callback data to the console output

      if (entries[0].intersectionRatio >= 1) {
        // get node list
        const { children } = chartBarContainer;

        // loop over array
        Array.from(children).forEach((key) => {
          let percentage = 0;

          const [bar] = Array.from(key.childNodes);

          // // eslint-disable-next-line prefer-destructuring
          const { dataset } = bar;

          const frame = () => {
            if (percentage === dataset.percentage) {
              // eslint-disable-next-line no-use-before-define
              clearInterval(id);
            } else {
              percentage += 1;

              bar.style.width = `${dataset.percentage}%`;
              // add styles to a tag
              bar.firstChild.style.width = "100%";
              bar.firstChild.style.display = "block";
              bar.firstChild.style.height = "100%";
            }
          };

          const id = setInterval(frame, 2500);
        });
      }
    },
    {
      threshold: [1],
    }
  );
  // Start observing the target element
  observer.observe(document.getElementById("barchart"));

  // /**
  //  * srcset images
  //  *  */
  // // // get portfolio grid images
  // // const portImages = document.querySelectorAll("img.projectImg");

  // // // function to create srcset markup string to add to images
  // // const makeSrcset = (imgSrc) => {
  // //   const markup = [];
  // //   let width = 300;

  // //   for (let i = 0; i < 10; i += 1) {
  // //     markup[i] = `${imgSrc}-${width}.webp ${width}w `;
  // //     width += 20;
  // //   }

  // //   return markup.join();
  // // };
  // // // loop over inages
  // // // eslint-disable-next-line no-plusplus
  // // for (let i = 0; i < portImages.length; i += 1) {
  // //   // get relative path of image.
  // //   let imgLink = portImages[i].getAttribute("src");

  // //   // remove file ext
  // //   imgLink = imgLink.slice(0, -5);
  // //   const srcset = makeSrcset(imgLink);

  // //   // eslint-disable-next-line no-console
  // //   // console.log(imgLink);
  // //   portImages[i].setAttribute("loading", "lazy");
  // //   portImages[i].srcset = srcset;
  // //   portImages[i].sizes =
  // //     "(min-width: 90em) 360px, (min-width: 80em) and (max-width: 1439px) 340px, (min-width: 64em) and (max-width: 1279px) 340px, (min-width: 46em) and (max-width: 1023px) 300px, (min-width: 37.5em) and (max-width: 735px) 300px,(min-width: 30em) and (max-width: 599px) 340px, (min-width: 22.5em) and (max-width: 479px) 320px, 85vw";
  // // }

  // // get portfolio grid images
  // const portImages = document.querySelectorAll("img.projectImg");

  // // function to create srcset markup string to add to images
  // const makeSrcset = (imgSrc) => {
  //   const markup = [];
  //   let width = 300;

  //   for (let i = 0; i < 10; i += 1) {
  //     markup[i] = `${imgSrc}-${width}.png ${width}w `;
  //     width += 20;
  //   }

  //   return markup.join();
  // };
  // // loop over inages
  // // eslint-disable-next-line no-plusplus
  // for (let i = 0; i < portImages.length; i += 1) {
  //   // get relative path of image.
  //   let imgLink = portImages[i].getAttribute("src");

  //   // remove file ext
  //   imgLink = imgLink.slice(0, -4);
  //   const srcset = makeSrcset(imgLink);

  //   // eslint-disable-next-line no-console
  //   // console.log(imgLink);
  //   portImages[i].setAttribute("loading", "lazy");
  //   portImages[i].srcset = srcset;
  //   portImages[i].sizes =
  //     "(min-width: 90em) 360px, (min-width: 80em) and (max-width: 1439px) 340px, (min-width: 64em) and (max-width: 1279px) 340px, (min-width: 46em) and (max-width: 1023px) 300px, (min-width: 37.5em) and (max-width: 735px) 300px,(min-width: 30em) and (max-width: 599px) 340px, (min-width: 22.5em) and (max-width: 479px) 320px, 85vw";
  // }
});
