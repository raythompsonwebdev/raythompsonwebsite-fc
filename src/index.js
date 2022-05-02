import "./fonts/cabin-2--webfont/style.css";
import "./fonts/amaranth-webfont/style.css";
// import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./sass/style.scss";
import "./js/contact";
import "./js/main";
// import "./js/srcSetmarkUp";
import "./js/projects";
import "./js/slider";

window.addEventListener("load", () => {
  // set backround image for home page
  const bgImage = document.querySelector("#banner");
  bgImage.style.setProperty(
    "--bg-image",
    "url(images/sergi-kabrera-2xU7rYxsTiM-unsplash-sqoosh.webp)"
  );

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
});
