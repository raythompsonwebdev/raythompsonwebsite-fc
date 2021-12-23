document.addEventListener("DOMContentLoaded", () => {
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
  console.log(chartbars);

  const graphBarContainer = document.getElementById("bars");

  // eslint-disable-next-line no-restricted-syntax

  chartbars.forEach((element) => {
    // eslint-disable-next-line no-console
    // console.log(element);

    // create bar chart bar using div
    const graphBar = document.createElement("DIV");

    // set bar attributes
    graphBar.setAttribute("data-percentage", `${element.datapercentage}`);
    graphBar.setAttribute("data-skill", `${element.dataskill}`);
    graphBar.setAttribute("class", "bar");

    // create span
    const graphBarHeader = document.createElement("SPAN");

    // add text
    graphBarHeader.textContent = `${element.language}`;

    // create list element to contain span and div
    const graphbarList = document.createElement("LI");

    // append div and span as children
    graphbarList.appendChild(graphBar);
    graphbarList.appendChild(graphBarHeader);

    graphBarContainer.appendChild(graphbarList);

    // eslint-disable-next-line no-console
    // console.log(graphBarContainer);

    return graphBarContainer;
  });

  // eslint-disable-next-line no-console
  //  console.log(graphBarContainer.children);

  const chartBar = graphBarContainer.children;

  Array.from(chartBar).forEach((key) => {
    let percentage = 0;

    // eslint-disable-next-line no-console
    console.log(key.children[0].dataset.percentage);

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

    const id = setInterval(frame, 1500);
  });
});
