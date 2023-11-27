const ChartGraph = () =>{  
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
      skill_level:"/src/images/svg/html-doc.svg"
    },
    {
      id: "2",
      datapercentage: 60,
      codeplatform: "CSS",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      title: "Link to CSS",
      skill_level:"/src/images/svg/css-doc.svg"
    },
    
    {
      id: 3,
      datapercentage: 45,
      codeplatform: "Javascript",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      title: "Link to Javascript",
      skill_level:"/src/images/svg/JS-DOC.svg"
    },
    {
      id: 4,
      datapercentage: 50,
      codeplatform: "PHP",
      link: "https://www.php.net/",
      title: "Link to PHP",
      skill_level:"/src/images/svg/php-doc.svg"
    },
    {
      id: "5",
      datapercentage: 50,
      codeplatform: "MySQL",
      link: "https://www.mysql.com/",
      title: "Link to MySQL",
      skill_level:"/src/images/svg/mysql-logo-svgrepo-com.svg"
    },
  ];

  const chartBarContainer = document.getElementById("bars") as HTMLUListElement;

 
  // eslint-disable-next-line no-restricted-syntax
  chartbars.forEach((element) => {
    // create bar chart bar using div
    const chartBar = document.createElement("DIV");

    // set bar attributes
    chartBar.setAttribute("data-percentage", `${element.datapercentage}`);
    chartBar.setAttribute("data-codeplatform", `${element.codeplatform}`);
    chartBar.setAttribute("data-skill_level", `${element.skill_level}`);
    chartBar.setAttribute("class", "bar");

    let span = document.createElement("span");

    chartBar.after(span, "text")

    // create span
    const chartBarHeader = document.createElement("SPAN");

    const chartBarHeaderImage = document.createElement("IMG");
    chartBarHeaderImage.setAttribute("src", `${element.skill_level}`);
    chartBarHeaderImage.setAttribute("alt", `${element.codeplatform}`);
    chartBarHeaderImage.setAttribute("class", "code-icon");


    chartBarHeader.appendChild(chartBarHeaderImage);

    // add text
    //chartBarHeader.textContent = `${element.codeplatform}`;

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
    chartBarContainer?.appendChild(chartBarList);

    return chartBarContainer;
  });

 
  const barChartDiv = document.getElementById("barchart") as HTMLDivElement

  // Create a new Observer
  const observer = new IntersectionObserver(
    (entries) => {
      // log the callback data to the console output

      if (entries[0].intersectionRatio >= 1) {
        // get node list
        // const { children }: HTMLElement[] = chartBarContainer;

        if (chartBarContainer !== null) {
          // loop over array
          Array.from(chartBarContainer.children).forEach((child) => {
            // using string
            let percentage = 0;

            // convert data.percentage type to number to match let percentage variable.
            // eslint-disable-next-line prefer-destructuring
            const bar = child.firstElementChild as HTMLElement | null;

            const result = Number(bar?.dataset.percentage);

            const frame = () => {
              if (bar !== null) {
                // comparing strings
                if (percentage === result) {
                  // eslint-disable-next-line no-use-before-define
                  clearInterval(id);
                } else {
                  percentage += 1;

                  bar.style.width = `${result}%`;
                  // add styles to a tag
                  // bar.style.width = "100%";
                  bar.style.display = "block";
                  bar.style.height = "100%";
                }
              }
            };

            const id = setInterval(frame, 2500);
          });
        }
      }
    },
    {
      threshold: [1],
    }
  );

  // Start observing the target element
  return observer.observe(barChartDiv);

  }

  export default ChartGraph;
