export default function slider() {
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  const mask = window.document.querySelector(".hero-slider > .mask");
  const panelContainer = document.querySelector(".slider-body");
  let currentIndex = 0;

  const sliderdata = [
    {
      id: "0",
      hash: "panel-0",
      title: "Adobe Certified Associates",
      text: "Online exam covering following topics: \nSetting project requirements,\nIdentifying Design Elements,\nUnderstanding Photoshop Interface, \nManipulating Images,\nEvaluating Digital Images.",
      buttonname: "Adobe",
      bgimage: "./images/certificates/webp/adobe-photoshop-certificate.webp",
    },
    {
      id: "1",
      hash: "panel-1",
      title: "City & Guilds ITQ Level 1, 2, 3 IT Users",
      text: "6 month part-time course at East London Technology Training Center covering:\nImproving productivity using IT,\nIT Communication Fundementals,Adding Content,\nIT User fundementals,\nOrganizing Content,Website Software(Dreamweaver),\nDatabase Software,Database Management,\nDesign Software(Photoshop).",
      buttonname: "East London Aadvanced Technolgy Training",
      bgimage:
        "./images/certificates/webp/city-and-guilds-level-1-web-design.webp",
    },
    {
      id: "2",
      hash: "panel-2",
      title: "Responsive Web Design",
      text: "Online interacative curriculum course covering:\nHTML,\nCSS,\nFlexbox,\nCSS Grids, \nResponsive Web Design Principles.",
      buttonname: "FreeCodeCamp",
      bgimage:
        "./images/certificates/webp/freecodecamp-org-certification-responsive-web-design.webp",
    },
    {
      id: "3",
      hash: "panel-3",
      title: "JavaScript Algorithms and Data Structures",
      text: "Online interacative curriculum course covering:\nClasses,\nPromises,\nRegular Expressions, Data Structures,\nAlgorithim Scripting.",
      buttonname: "FreeCodeCamp",
      bgimage:
        "./images/certificates/webp/freecodecamp-org-certification-javascript-algorithms-and-data-structures.webp",
    },
    {
      id: "4",
      hash: "panel-4",
      title: "Linkedin Learning",
      text: "Online tutorial Become a Vanilla Javascript Web Developer covering:\nJavascript Essentials, \nClosures,\nWeb API,\nService Workers,\nPromises.",
      buttonname: "Lynda.com",
      bgimage:
        "./images/certificates/webp/become -a-vanilla-javaScript-developer-certificate-lynda-com.webp",
    },
    {
      id: "5",
      hash: "panel-5",
      title: "Code Academy - Learn Javascript",
      text: "Online interacative curriculum course covering:\nData Types,\nLoops,\nArray Methods, \nObjects,\nConditionals.\nFunctions.",
      buttonname: "CodeAcademy",
      bgimage:
        "./images/certificates/webp/codecademy-javascript-certificate.webp",
    },
    {
      id: "6",
      hash: "panel-6",
      title: "Code Academy - Learn Ruby",
      text: "Online interacative curriculum course covering:\nArrays,\nData Types,\nClasses,\nMethods, \nConditionals.",
      buttonname: "CodeAcademy",
      bgimage: "./images/certificates/webp/codecademy-ruby-certificate.webp",
    },
    {
      id: "7",
      hash: "panel-7",
      title: "Digital Futures 2017",
      text: "Four week full-time IT employability course covering:\nInteractive Programming,\nDebate Skills with DebateMate,\nMusical Composition,\nNegotiation skills with CitizenUK,\nMusic creation using Sonic Pi.",
      buttonname: "DigitalFutures",
      bgimage:
        "./images/certificates/webp/digital-futures-2017-certificate-of-participation.webp",
    },
  ];

  sliderdata.forEach((slide) => {
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

    const slidepanelHeadingThree = document.createElement("H3");
    slidepanelHeadingThree.setAttribute("class", "slider-title");
    slidepanelHeadingThree.textContent = title;

    const slidepanelText = document.createElement("P");
    slidepanelText.setAttribute("class", "slider-text");
    slidepanelText.textContent = `${text}`;

    panel.append(slidepanel);
    panelContainer.append(panel);

    slidepanel.append(slidepanelImg);
    slidepanel.append(slidepanelCaption);
    slidepanelCaption.append(slidepanelHeadingThree);
    slidepanelCaption.append(slidepanelText);
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
}
