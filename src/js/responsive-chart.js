// eslint-disable-next-line func-style
const responsiveChart = () => {
  // document.addEventListener("DOMContentLoaded", () => {
  const chartbars = [
    {
      id: "1",
      language: "Replt",
      datapercentage: 75,
      dataskill: "INTERMEDIATE",
    },
    {
      id: "2",
      language: "CodeWars",
      datapercentage: 75,
      dataskill: "INTERMEDIATE",
    },
    {
      id: 3,
      language: "LeetCode",
      datapercentage: 80,
      dataskill: "INTERMEDIATE",
    },
    {
      id: 4,
      language: "Codepen",
      datapercentage: "80",
      dataskill: "INTERMEDIATE",
    },
    {
      id: "5",
      language: "Execute",
      datapercentage: "70",
      dataskill: "INTERMEDIATE",
    },
  ];

  // eslint-disable-next-line no-console
  // console.log(chartbars);

  const chartBarContainer = document.getElementById("bars");

  // eslint-disable-next-line no-restricted-syntax
  chartbars.forEach((element) => {
    // eslint-disable-next-line no-console
    // console.log(element);

    // create bar chart bar using div
    const chartBar = document.createElement("DIV");

    // set bar attributes
    chartBar.setAttribute("data-percentage", `${element.datapercentage}`);
    chartBar.setAttribute("data-skill", `${element.dataskill}`);
    chartBar.setAttribute("class", "bar");

    // create span
    const chartBarHeader = document.createElement("SPAN");

    // add text
    chartBarHeader.textContent = `${element.language}`;

    // create list element to contain span and div
    const chartBarList = document.createElement("LI");

    // append div and span as children
    chartBarList.appendChild(chartBar);
    chartBarList.appendChild(chartBarHeader);

    chartBarContainer.appendChild(chartBarList);

    // eslint-disable-next-line no-console
    // console.log(chartBarContainer);

    return chartBarContainer;
  });

  // eslint-disable-next-line no-console
  //  console.log(chartBarContainer.children);

  // eslint-disable-next-line prefer-destructuring
  const chartBar = chartBarContainer.children;

  Array.from(chartBar).forEach((key) => {
    let percentage = 0;

    // eslint-disable-next-line no-console
    console.log(key.children[0].dataset.percentage);

    // eslint-disable-next-line prefer-destructuring
    const percentageMaxWidth = key.children[0].dataset.percentage;

    const frame = () => {
      if (percentage === percentageMaxWidth) {
        // eslint-disable-next-line no-use-before-define
        clearInterval(id);
      } else {
        // eslint-disable-next-line no-plusplus
        percentage++;

        // eslint-disable-next-line no-param-reassign
        key.children[0].style.width = `${percentageMaxWidth}%`;
      }
    };

    const id = setInterval(frame, 2500);
  });
};
// });

export default responsiveChart;
