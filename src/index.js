import "./fonts/cabin-2--webfont/style.css";
import "./fonts/amaranth-webfont/style.css";
import "./sass/style.scss";
import "./js/main";
import "./js/contact";
import projectTabs from "./js/projects";
import slider from "./js/slider";

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
   * Slider
   *  */
  slider();

  /**
   * Bar Chart
   *  */
  const chartbars = [
    {
      id: "1",
      datapercentage: 60,
      codeplatform: "HTML",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      title: "Link to HTML docs",
    },
    {
      id: "2",
      datapercentage: 60,
      codeplatform: "CSS",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      title: "Link to CSS",
    },
    {
      id: 3,
      datapercentage: 55,
      codeplatform: "Javascript",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      title: "Link to Javascript",
    },
    {
      id: 4,
      datapercentage: 55,
      codeplatform: "PHP",
      link: "https://www.php.net/",
      title: "Link to PHP",
    },
    {
      id: "5",
      datapercentage: 35,
      codeplatform: "Python",
      link: "https://www.python.org/",
      title: "Link to Python",
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
    chartLink.setAttribute("class", "bar-link");

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
