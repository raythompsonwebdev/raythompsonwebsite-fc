const next = document.getElementById("next");
const prev = document.getElementById("prev");
const mask = window.document.querySelector(".hero-slider > .mask");
const panelContainer = document.querySelector(".slider-body");
let currentIndex = 0;

fetch("./data/slider-data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status, response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const { sliderdata } = data;
    sliderdata.forEach((slide) => {
      const { hash, title, text, buttonname, bgimage } = slide;
      // panel
      const panel = document.createElement("ARTICLE");
      panel.setAttribute("class", "panel");
      panel.setAttribute("id", `#${hash}`);
      // slider panel image
      const slidepanel = document.createElement("FIGURE");
      slidepanel.setAttribute("class", "slider-panel");

      // image link
      const slidepanelImgLink = document.createElement("A");
      slidepanelImgLink.setAttribute("href", "");
      slidepanelImgLink.setAttribute("class", "fancybox");

      const slidepanelImg = document.createElement("IMG");
      slidepanelImg.setAttribute("src", bgimage);
      slidepanelImg.setAttribute("class", "panel-image");
      slidepanelImg.setAttribute("alt", `image of ${buttonname} certificate`);
      slidepanelImg.setAttribute("width", "780");
      slidepanelImg.setAttribute("height", "300");
      slidepanelImg.setAttribute("loading", "lazy");

      const slidepanelCaption = document.createElement("FIGCAPTION");

      const slidepanelHeadingThree = document.createElement("H4");
      slidepanelHeadingThree.textContent = title;

      const slidepanelText = document.createElement("P");
      slidepanelText.textContent = `${text}`;

      panel.append(slidepanel);
      panelContainer.append(panel);

      slidepanel.append(slidepanelImgLink);
      slidepanelImgLink.append(slidepanelImg);
      slidepanel.append(slidepanelCaption);
      slidepanelCaption.append(slidepanelHeadingThree);
      slidepanelCaption.append(slidepanelText);

      const fancyBoxLinks = document.getElementsByClassName("fancybox");

      Array.from(fancyBoxLinks).forEach((fancyLink) => {
        fancyLink.addEventListener("onmouseenter", (e) => {
          e.preventDefault();
          if (fancyLink.classList.contains("fancybox")) {
            fancyLink.nextSibling.classList.add("captionshow");
          }
        });

        fancyLink.nextSibling.addEventListener("onmouseleave", (e) => {
          e.preventDefault();
          if (fancyLink.nextSibling.classList.contains("captionshow")) {
            fancyLink.nextSibling.classList.remove("captionshow");
          }
        });
      });
    });
  })
  .catch((error) => {
    mask.style.fontFamily = "sans-serif";
    mask.style.textAlign = "center";
    mask.style.fontSize = "2em";
    mask.innerHTML = "Something went wrong - No Data Found";
    // eslint-disable-next-line no-console
    console.log(error);
  });

const panels = document.getElementsByClassName("panel");

const scrollTo = (element) => {
  mask.scrollTo({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop,
  });
};

const updateIndex = () => {
  const upperlimit = panels.length - 1;

  if (currentIndex === upperlimit) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
};

const undateIndex = () => {
  const lowerlimit = 0;

  if (currentIndex === lowerlimit) {
    currentIndex = 0;
  } else {
    currentIndex -= 1;
  }
};

// Hero Slider
next.addEventListener("click", (e) => {
  // prev.classList.remove("active");
  // e.target.classList.add("active");
  e.preventDefault();
  updateIndex();

  for (let i = 0; i < panels.length; i += 1) {
    if (i === currentIndex) {
      scrollTo(document.getElementById(`${panels[i].id}`));
    }
  }

  // disable click event
  return false;
});

prev.addEventListener("click", (e) => {
  e.preventDefault();
  undateIndex();

  for (let i = 0; i < panels.length; i += 1) {
    if (i === currentIndex) {
      scrollTo(document.getElementById(`${panels[i].id}`));
    }
  }

  // disable click event
  return false;
});
