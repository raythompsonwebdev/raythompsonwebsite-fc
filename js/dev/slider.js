const next = document.getElementById("next");
const prev = document.getElementById("prev");
const mask = window.document.querySelector(".hero-slider > .mask");
const panelContainer = document.querySelector(".slider-body");
let currentIndex = 0;

fetch("./js/dev/data/slider-data.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error("JSON data not received");
		}
		return response.json();
	})
	.then((data) => {
		const slider = data.sliderdata;
		slider.forEach((slide) => {
			const panel = document.createElement("ARTICLE");
			panel.setAttribute("class", "panel");
			panel.setAttribute("id", `#${slide.hash}`);
			const slidepanel = document.createElement("FIGURE");
			slidepanel.setAttribute("class", "slider-panel");
			const slidepanelImgLink = document.createElement("A");
			slidepanelImgLink.setAttribute("href", "");
			slidepanelImgLink.setAttribute("class", "fancybox");

			const slidepanelImg = document.createElement("SPAN");
			slidepanelImg.setAttribute(
				"style",
				`background-image: url(${slide.bgimage})`
			);

			const slidepanelCaption = document.createElement("FIGCAPTION");

			const slidepanelHeadingThree = document.createElement("H3");
			slidepanelHeadingThree.textContent = `${slide.header}`;

			// const slidepanelHeadingFour = document.createElement("H4");
			// slidepanelHeadingFour.innerHTML = `${slide.subheader}`;

			const slidepanelList = document.createElement("UL");
			const slidepanelListItem = document.createElement("lI");
			slidepanelListItem.textContent = `${slide.task1}`;

			const slidepanelListItem2 = document.createElement("lI");
			slidepanelListItem2.textContent = `${slide.task2}`;

			const slidepanelListItem3 = document.createElement("lI");
			slidepanelListItem3.textContent = `${slide.task3}`;

			const slidepanelListItem4 = document.createElement("lI");
			slidepanelListItem4.textContent = `${slide.task4}`;

			const slidepanelListItem5 = document.createElement("lI");
			slidepanelListItem5.textContent = `${slide.task5}`;

			panel.append(slidepanel);
			panelContainer.append(panel);

			slidepanel.append(slidepanelImgLink);
			slidepanelImgLink.append(slidepanelImg);
			slidepanel.append(slidepanelCaption);
			slidepanelCaption.append(slidepanelHeadingThree);
			// slidepanelCaption.append(slidepanelHeadingFour);
			slidepanelCaption.append(slidepanelList);
			slidepanelList.append(slidepanelListItem);
			slidepanelList.append(slidepanelListItem2);
			slidepanelList.append(slidepanelListItem3);
			slidepanelList.append(slidepanelListItem4);
			slidepanelList.append(slidepanelListItem5);
		});
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
		// eslint-disable-next-line no-plusplus
		currentIndex++;
	}
};

const undateIndex = () => {
	const lowerlimit = 0;

	if (currentIndex === lowerlimit) {
		currentIndex = 0;
	} else {
		// eslint-disable-next-line no-plusplus
		currentIndex--;
	}
};

// Hero Slider

next.addEventListener("click", (e) => {
	// prev.classList.remove("active");
	// e.target.classList.add("active");
	e.preventDefault();

	updateIndex();

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < panels.length; i++) {
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
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < panels.length; i++) {
		if (i === currentIndex) {
			scrollTo(document.getElementById(`${panels[i].id}`));
		}
	}

	// disable click event
	return false;
});
