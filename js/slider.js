"use strict";

var next = document.getElementById("next");
var prev = document.getElementById("prev");
var mask = window.document.querySelector(".hero-slider > .mask");
var panelContainer = document.querySelector(".slider-body");
var currentIndex = 0;
fetch("./js/dev/data/slider-data.json").then(function (response) {
  if (!response.ok) {
    throw new Error("JSON data not received");
  }

  return response.json();
}).then(function (data) {
  var slider = data.sliderdata;
  slider.forEach(function (slide) {
    var panel = document.createElement("ARTICLE");
    panel.setAttribute("class", "panel");
    panel.setAttribute("id", "#".concat(slide.hash));
    var slidepanel = document.createElement("FIGURE");
    slidepanel.setAttribute("class", "slider-panel");
    var slidepanelImgLink = document.createElement("A");
    slidepanelImgLink.setAttribute("href", "");
    slidepanelImgLink.setAttribute("class", "fancybox");
    var slidepanelImg = document.createElement("SPAN");
    slidepanelImg.setAttribute("style", "background-image: url(".concat(slide.bgimage, ")"));
    var slidepanelCaption = document.createElement("FIGCAPTION");
    var slidepanelHeadingThree = document.createElement("H3");
    slidepanelHeadingThree.textContent = "".concat(slide.header); // const slidepanelHeadingFour = document.createElement("H4");
    // slidepanelHeadingFour.innerHTML = `${slide.subheader}`;

    var slidepanelList = document.createElement("UL");
    var slidepanelListItem = document.createElement("lI");
    slidepanelListItem.textContent = "".concat(slide.task1);
    var slidepanelListItem2 = document.createElement("lI");
    slidepanelListItem2.textContent = "".concat(slide.task2);
    var slidepanelListItem3 = document.createElement("lI");
    slidepanelListItem3.textContent = "".concat(slide.task3);
    var slidepanelListItem4 = document.createElement("lI");
    slidepanelListItem4.textContent = "".concat(slide.task4);
    var slidepanelListItem5 = document.createElement("lI");
    slidepanelListItem5.textContent = "".concat(slide.task5);
    panel.append(slidepanel);
    panelContainer.append(panel);
    slidepanel.append(slidepanelImgLink);
    slidepanelImgLink.append(slidepanelImg);
    slidepanel.append(slidepanelCaption);
    slidepanelCaption.append(slidepanelHeadingThree); // slidepanelCaption.append(slidepanelHeadingFour);

    slidepanelCaption.append(slidepanelList);
    slidepanelList.append(slidepanelListItem);
    slidepanelList.append(slidepanelListItem2);
    slidepanelList.append(slidepanelListItem3);
    slidepanelList.append(slidepanelListItem4);
    slidepanelList.append(slidepanelListItem5);
  });
});
var panels = document.getElementsByClassName("panel");

var scrollTo = function scrollTo(element) {
  mask.scrollTo({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop
  });
};

var updateIndex = function updateIndex() {
  var upperlimit = panels.length - 1;

  if (currentIndex === upperlimit) {
    currentIndex = 0;
  } else {
    // eslint-disable-next-line no-plusplus
    currentIndex++;
  }
};

var undateIndex = function undateIndex() {
  var lowerlimit = 0; // eslint-disable-next-line no-console

  console.log(lowerlimit);

  if (currentIndex === lowerlimit) {
    currentIndex = 0;
  } else {
    // eslint-disable-next-line no-plusplus
    currentIndex--;
  }
}; // Hero Slider


next.addEventListener("click", function (e) {
  // prev.classList.remove("active");
  // e.target.classList.add("active");
  e.preventDefault();
  updateIndex(); // eslint-disable-next-line no-plusplus

  for (var i = 0; i < panels.length; i++) {
    if (i === currentIndex) {
      scrollTo(document.getElementById("".concat(panels[i].id)));
    }
  } // disable click event


  return false;
});
prev.addEventListener("click", function (e) {
  e.preventDefault();
  undateIndex(); // eslint-disable-next-line no-plusplus

  for (var i = 0; i < panels.length; i++) {
    if (i === currentIndex) {
      scrollTo(document.getElementById("".concat(panels[i].id)));
    }
  } // disable click event


  return false;
});
//# sourceMappingURL=slider.js.map
