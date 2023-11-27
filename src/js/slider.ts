const next = document.getElementById("next") as HTMLButtonElement;
const prev = document.getElementById("prev") as HTMLButtonElement;
const mask = document.querySelector( ".hero-slider > .mask") as HTMLDivElement;

const panelContainer = document.querySelector(".slider-body") as HTMLDivElement;

let currentIndex = 0;

const sliderdata = [
  {
    id: "0",
    hash: "panel-0",
    title: "WordCamp London 2018",
    text: "Attended WordCamp 2018 at Holloway university as a volunteer - Green Room Monitor , Support sponsor setup and breakdown, Assist the design team with putting up all signs - see all attendees at this ",
    buttonname: "Wordcamp",
    bgimage: "./images/certificates/webp/wordcamp2018.webp",
    sliderlink:"https://london.wordcamp.org/2018/attendees/",
    sliderlinktext : "link here"
  },
  {
    id: "1",
    hash: "panel-1",
    title: "City & Guilds ITQ Level 1, 2, 3 IT Users",
    text: "6 month part-time course web design course at East London Technology Training Center : Improving productivity using IT, IT Communication Fundementals, Website Software(Dreamweaver), Database Software, Database Management, Design Software(Photoshop).",
    buttonname: "East London Advanced Technolgy Training",
    bgimage: "./images/certificates/webp/city-and-guilds-level-1-web-design.webp",
    sliderlink: " ",
    sliderlinktext : " "
  },
  {
    id: "2",
    hash: "panel-2",
    title: "Responsive Web Design",
    text: "Online interacative curriculum course : HTML, CSS, Flexbox, CSS Grids, Responsive Web Design Principles. see certificate at this ",
    buttonname: "FreeCodeCamp",
    bgimage: "./images/certificates/webp/freecodecamp-org-certification-responsive-web-design.webp",
    sliderlink: "https://www.freecodecamp.org/certification/raythompsonwebdev/responsive-web-design",
    sliderlinktext : "link here"
  },
  {
    id: "3",
    hash: "panel-3",
    title: "JavaScript",
    text: "Online interacative curriculum course : Classes, Promises, Regular Expressions, Data Structures, Algorithim Scripting. See certificate at this ",
    buttonname: "FreeCodeCamp",
    bgimage: "./images/certificates/webp/freecodecamp-org-certification-javascript-algorithms-and-data-structures.webp",
    sliderlink: "https://www.freecodecamp.org/certification/raythompsonwebdev/javascript-algorithms-and-data-structures",
    sliderlinktext : "link here"
  },
  {
    id: "4",
    hash: "panel-4",
    title: "Linkedin Learning",
    text: "Online tutorial Become a Vanilla Javascript Web Developer : Javascript Essentials, Closures,Web API,Service Workers,Promises. See certificate at this ",
    buttonname: "Lynda.com",
    bgimage: "./images/certificates/webp/become -a-vanilla-javaScript-developer-certificate-lynda-com.webp",
    sliderlink: "https://www.linkedin.com/learning/certificates/49ebce65c0bf606ec55fee010f2cf2383a99ed1a323ac7e62c578fa045161b84?trk=backfilled_certificate",
    sliderlinktext : "link here"
  },
  {
    id: "5",
    hash: "panel-5",
    title: "Learn Javascript",
    text: "Online interacative curriculum course : Data Types, Loops, Array Methods, Objects, Conditionals.Functions. See certificate at this ",
    buttonname: "CodeAcademy",
    bgimage: "./images/certificates/webp/codecademy-javascript-certificate.webp",
    sliderlink: "https://www.codecademy.com/profiles/raythompsonwebdev/certificates/705dcb15de0da4dd9d9fc4f3274b430e",
    sliderlinktext : "link here"
  },
  {
    id: "6",
    hash: "panel-6",
    title: "Learn Ruby",
    text: "Online interacative curriculum course : Arrays, Data Types, Classes, Methods, Conditionals. see certificate at this ",
    buttonname: "CodeAcademy",
    bgimage: "./images/certificates/webp/codecademy-ruby-certificate.webp",
    sliderlink: "https://www.codecademy.com/profiles/raythompsonwebdev/certificates/1c05e0382bc5681c824c4cbe85c126fd",
    sliderlinktext : "link here"
  },
  {
    id: "7",
    hash: "panel-7",
    title: "Digital Futures 2017",
    text: "Four week full-time IT employability course :Interactive Programming, Debate Skills with DebateMate, Musical Composition, Negotiation skills with CitizenUK, Music creation using Sonic Pi. See promo video at this ",
    buttonname: "DigitalFutures",
    bgimage: "./images/certificates/webp/digital-futures-2017-certificate-of-participation.webp",
    sliderlink: "https://vimeo.com/232481032",
    sliderlinktext : "link here"
  },
];

sliderdata.forEach(
  (slide: {
    id: string;
    hash: string;
    title: string;
    text: string;
    buttonname: string;
    bgimage: string;
    sliderlink:string;
    sliderlinktext:string;
  }) => {
    const { hash, title, text, buttonname, bgimage, sliderlink, sliderlinktext } = slide;
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

    const slidepanelLink = document.createElement("A");
    slidepanelLink.setAttribute("class", "slider-link");
    slidepanelLink.setAttribute("href", `${sliderlink}`);
    slidepanelLink.setAttribute("title", `${title}`);
    slidepanelLink.textContent = sliderlinktext;

    const slidepanelText = document.createElement("P");
    slidepanelText.setAttribute("class", "slider-text");
    slidepanelText.textContent = text;
    
    
    panelContainer?.append(panel);
    panel.append(slidepanel);

    slidepanel.append(slidepanelImg);
    slidepanel.append(slidepanelCaption);
    slidepanelCaption.append(slidepanelHeadingThree);    
    slidepanelCaption.append(slidepanelText);
    slidepanelText.append(slidepanelLink)
  
  }
);

const panels :HTMLCollectionOf<Element> = document.getElementsByClassName("panel");

const panelsArray : Element[] = Array.from(panels);

panelsArray.map((panel:Element)=>{   

  // find first panel in slide show and show caption on the first panel only at beginning of slide. 
  if(panel.id === '#panel-0'){    
    // find figure element - slider panel with image and caption
    const firstChild = panel.firstChild;

    if(firstChild){
      // find caption  
      const lastChild = firstChild.lastChild as HTMLElement;

      if(lastChild){
        // add caption show style to first slide at 0 index.
        lastChild.classList.add("captionshow")
      }
    }
  }
  return panel;  
})

const scrollerTo = (element: HTMLElement) => {
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

const addStyle = (element: Element |  null) => {
  if (!element?.lastElementChild?.classList.contains("captionshow")) {
    element?.lastElementChild?.classList.add("captionshow");
  }
};

// Hero Slider
next.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  updateIndex();

  for (let i = 0; i < panelsArray.length; i += 1) {
    
    let PanelId = document.getElementById(`${panelsArray[i].id}`)

    if (i === currentIndex && PanelId !== null) {
      scrollerTo(PanelId);
      addStyle(panelsArray[i].firstElementChild);
    }
  }
  // disable click event
  return false;
});

prev.addEventListener("click", (e: MouseEvent ) => {
  e.preventDefault();
  undateIndex();

  for (let i = 0; i < panelsArray.length; i += 1) {

    let PanelId = document.getElementById(`${panelsArray[i].id}`)

    if (i === currentIndex && PanelId !== null) {
      scrollerTo(PanelId);
    }
  }
  // disable click event
  return false;
});

