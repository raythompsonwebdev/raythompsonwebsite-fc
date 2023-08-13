const next: HTMLElement | null = document.getElementById("next");
const prev: HTMLElement | null = document.getElementById("prev");
const mask: HTMLDivElement | null = window.document.querySelector(
  ".hero-slider > .mask"
);
const panelContainer: HTMLDivElement | null =
  document.querySelector(".slider-body");

let currentIndex = 0;

const sliderdata = [
  {
    id: "0",
    hash: "panel-0",
    title: "Adobe Certified Associates",
    text: "Online exam : \nSetting project requirements,\nIdentifying Design Elements,\nUnderstanding Photoshop Interface, \nManipulating Images,\nEvaluating Digital Images.",
    buttonname: "Adobe",
    bgimage: "./images/certificates/webp/adobe-photoshop-certificate.webp",
  },
  {
    id: "1",
    hash: "panel-1",
    title: "City & Guilds ITQ Level 1, 2, 3 IT Users",
    text: "6 month part-time course web design course at East London Technology Training Center :\nImproving productivity using IT,\nIT Communication Fundementals,\nWebsite Software(Dreamweaver),\nDatabase Software,\nDatabase Management,\nDesign Software(Photoshop).",
    buttonname: "East London Advanced Technolgy Training",
    bgimage:
      "./images/certificates/webp/city-and-guilds-level-1-web-design.webp",
  },
  {
    id: "2",
    hash: "panel-2",
    title: "Responsive Web Design",
    text: "Online interacative curriculum course :\nHTML,\nCSS,\nFlexbox,\nCSS Grids, \nResponsive Web Design Principles.",
    buttonname: "FreeCodeCamp",
    bgimage:
      "./images/certificates/webp/freecodecamp-org-certification-responsive-web-design.webp",
  },
  {
    id: "3",
    hash: "panel-3",
    title: "JavaScript",
    text: "Online interacative curriculum course :\nClasses,\nPromises,\nRegular Expressions, Data Structures,\nAlgorithim Scripting.",
    buttonname: "FreeCodeCamp",
    bgimage:
      "./images/certificates/webp/freecodecamp-org-certification-javascript-algorithms-and-data-structures.webp",
  },
  {
    id: "4",
    hash: "panel-4",
    title: "Linkedin Learning",
    text: "Online tutorial Become a Vanilla Javascript Web Developer : \nJavascript Essentials, \nClosures,\nWeb API,\nService Workers,\nPromises.",
    buttonname: "Lynda.com",
    bgimage:
      "./images/certificates/webp/become -a-vanilla-javaScript-developer-certificate-lynda-com.webp",
  },
  {
    id: "5",
    hash: "panel-5",
    title: "Learn Javascript",
    text: "Online interacative curriculum course :\nData Types,\nLoops,\nArray Methods, \nObjects,\nConditionals.\nFunctions.",
    buttonname: "CodeAcademy",
    bgimage:
      "./images/certificates/webp/codecademy-javascript-certificate.webp",
  },
  {
    id: "6",
    hash: "panel-6",
    title: "Learn Ruby",
    text: "Online interacative curriculum course :\nArrays,\nData Types,\nClasses,\nMethods, \nConditionals.",
    buttonname: "CodeAcademy",
    bgimage: "./images/certificates/webp/codecademy-ruby-certificate.webp",
  },
  {
    id: "7",
    hash: "panel-7",
    title: "Digital Futures 2017",
    text: "Four week full-time IT employability course :\nInteractive Programming,\nDebate Skills with DebateMate,\nMusical Composition,\nNegotiation skills with CitizenUK,\nMusic creation using Sonic Pi.",
    buttonname: "DigitalFutures",
    bgimage:
      "./images/certificates/webp/digital-futures-2017-certificate-of-participation.webp",
  },
];

sliderdata.forEach(
  (slide: {
    id?: string;
    hash: string;
    title: string;
    text: string;
    buttonname: string;
    bgimage: string;
  }) => {
    const { hash, title, text, buttonname, bgimage } = slide;
    // panel
    const panel = document.createElement("ARTICLE");
    panel.setAttribute("class", "panel");
    panel.setAttribute("id", `#${hash}`);

    // slider panel image
    const slidepanel = document.createElement("FIGURE");
    slidepanel.setAttribute("class", "slider-panel");

    const slidepanelImg = document.createElement("IMG");
    slidepanelImg.setAttribute("src", bgimage);
    slidepanelImg.setAttribute("class", "panel-image");
    slidepanelImg.setAttribute("alt", `image of ${buttonname} certificate`);
    slidepanelImg.setAttribute("width", "auto");
    slidepanelImg.setAttribute("height", "360");
    slidepanelImg.setAttribute("loading", "lazy");

    const slidepanelCaption = document.createElement("FIGCAPTION");

    const slidepanelHeadingThree = document.createElement("H4");
    slidepanelHeadingThree.setAttribute("class", "slider-title");
    slidepanelHeadingThree.textContent = title;

    const slidepanelText = document.createElement("P");
    slidepanelText.setAttribute("class", "slider-text");
    slidepanelText.textContent = `${text}`;

    panelContainer?.append(panel);
    panel.append(slidepanel);

    slidepanel.append(slidepanelImg);
    slidepanel.append(slidepanelCaption);
    slidepanelCaption.append(slidepanelHeadingThree);
    slidepanelCaption.append(slidepanelText);
  }
);

const panels = document.getElementsByClassName("panel");

const scrollerTo = (element: HTMLElement | null) => {
  mask?.scrollTo({
    behavior: "smooth",
    left: 0,
    top: element?.offsetTop,
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

const addStyle = (element: Element | null) => {
  if (!element?.lastElementChild?.classList.contains(".captionshow")) {
    element?.lastElementChild?.classList.add("captionshow");
  }
};

// Hero Slider
next?.addEventListener("click", (e: { preventDefault: () => void }) => {
  e.preventDefault();
  updateIndex();

  for (let i = 0; i < panels.length; i += 1) {
    // eslint-disable-next-line no-console
    if (i === currentIndex) {
      scrollerTo(document.getElementById(`${panels[i].id}`));
      addStyle(panels[i].firstElementChild);
    }
  }

  // disable click event
  return false;
});

prev?.addEventListener("click", (e: { preventDefault: () => void }) => {
  e.preventDefault();
  undateIndex();
  for (let i = 0; i < panels.length; i += 1) {
    if (i === currentIndex) {
      scrollerTo(document.getElementById(`${panels[i].id}`));
    }
  }

  // disable click event
  return false;
});
// }