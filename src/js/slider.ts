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
    title: "WordCamp London 2018",
    text: "Attended WordCamp 2018 at Holloway university as a volunteer - Green Room Monitor , Support sponsor setup and breakdown, Assist the design team with putting up all signs - see all attendees at this link: https://london.wordcamp.org/2018/attendees/",
    buttonname: "Wordcamp",
    bgimage: "./images/certificates/webp/wordcamp2018.webp",
  },
  {
    id: "1",
    hash: "panel-1",
    title: "City & Guilds ITQ Level 1, 2, 3 IT Users",
    text: "6 month part-time course web design course at East London Technology Training Center :Improving productivity using IT,IT Communication Fundementals,Website Software(Dreamweaver),Database Software,Database Management,Design Software(Photoshop).",
    buttonname: "East London Advanced Technolgy Training",
    bgimage:
      "./images/certificates/webp/city-and-guilds-level-1-web-design.webp",
  },
  {
    id: "2",
    hash: "panel-2",
    title: "Responsive Web Design",
    text: "Online interacative curriculum course :HTML,CSS,Flexbox,CSS Grids, Responsive Web Design Principles.",
    buttonname: "FreeCodeCamp",
    bgimage:
      "./images/certificates/webp/freecodecamp-org-certification-responsive-web-design.webp",
  },
  {
    id: "3",
    hash: "panel-3",
    title: "JavaScript",
    text: "Online interacative curriculum course :Classes,Promises,Regular Expressions, Data Structures,Algorithim Scripting.",
    buttonname: "FreeCodeCamp",
    bgimage:
      "./images/certificates/webp/freecodecamp-org-certification-javascript-algorithms-and-data-structures.webp",
  },
  {
    id: "4",
    hash: "panel-4",
    title: "Linkedin Learning",
    text: "Online tutorial Become a Vanilla Javascript Web Developer : Javascript Essentials, Closures,Web API,Service Workers,Promises.",
    buttonname: "Lynda.com",
    bgimage:
      "./images/certificates/webp/become -a-vanilla-javaScript-developer-certificate-lynda-com.webp",
  },
  {
    id: "5",
    hash: "panel-5",
    title: "Learn Javascript",
    text: "Online interacative curriculum course :Data Types,Loops,Array Methods, Objects,Conditionals.Functions.",
    buttonname: "CodeAcademy",
    bgimage:
      "./images/certificates/webp/codecademy-javascript-certificate.webp",
  },
  {
    id: "6",
    hash: "panel-6",
    title: "Learn Ruby",
    text: "Online interacative curriculum course :Arrays,Data Types,Classes,Methods, Conditionals.",
    buttonname: "CodeAcademy",
    bgimage: "./images/certificates/webp/codecademy-ruby-certificate.webp",
  },
  {
    id: "7",
    hash: "panel-7",
    title: "Digital Futures 2017",
    text: "Four week full-time IT employability course :Interactive Programming,Debate Skills with DebateMate,Musical Composition,Negotiation skills with CitizenUK,Music creation using Sonic Pi.",
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

const panelsArray = Array.from(panels).map((ele:any)=>{   
  if(ele.id === '#panel-0'){
    ele.firstChild.lastChild.classList.add("captionshow")
  }
  return ele;  
})

console.log(panelsArray)

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

const addStyle = (element: Element |  null) => {
  if (!element?.lastElementChild?.classList.contains("captionshow")) {
    element?.lastElementChild?.classList.add("captionshow");
  }
};

// Hero Slider
next?.addEventListener("click", (e: { preventDefault: () => void }) => {
  e.preventDefault();
  updateIndex();
  for (let i = 0; i < panelsArray.length; i += 1) {
    // eslint-disable-next-line no-console
    if (i === currentIndex) {
      scrollerTo(document.getElementById(`${panelsArray[i].id}`));
      addStyle(panelsArray[i].firstElementChild);
    }
  }

  // disable click event
  return false;
});

prev?.addEventListener("click", (e: { preventDefault: () => void }) => {
  e.preventDefault();
  undateIndex();
  for (let i = 0; i < panelsArray.length; i += 1) {
    if (i === currentIndex) {
      scrollerTo(document.getElementById(`${panelsArray[i].id}`));
    }
  }

  // disable click event
  return false;
});

