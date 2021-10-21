// eslint-disable-next-line func-names

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const mask = window.document.querySelector(".hero-slider > .mask");
const panelContainer = document.querySelector(".slider-body");
let currentIndex = 0;

fetch("./js/dev/data/slider-data.json")
	.then((response) => response.json())
	.then((data) => {
		const slider = data.sliderdata;
		slider.forEach((slide) => {
			// eslint-disable-next-line no-console
			// console.log(slide);

			const panel = document.createElement("ARTICLE");
			panel.setAttribute("class", "panel");
			panel.setAttribute("id", `#${slide.hash}`);
			const slidepanel = document.createElement("FIGURE");
			slidepanel.setAttribute("class", "slider-panel");
			const slidepanelImage = document.createElement("A");
			slidepanelImage.setAttribute("href", "");

			const slidepanelCaption = document.createElement("FIGCAPTION");

			const slidepanelHeadingThree = document.createElement("H3");
			slidepanelHeadingThree.innerHTML = `${slide.header}`;

			const slidepanelHeadingFour = document.createElement("H4");
			slidepanelHeadingFour.innerHTML = `${slide.subheader}`;

			const slidepanelList = document.createElement("UL");
			const slidepanelListItem = document.createElement("lI");
			slidepanelListItem.innerHTML = `${slide.task1}`;

			const slidepanelListItem2 = document.createElement("lI");
			slidepanelListItem2.innerHTML = `${slide.task2}`;

			const slidepanelListItem3 = document.createElement("lI");
			slidepanelListItem3.innerHTML = `${slide.task3}`;

			const slidepanelListItem4 = document.createElement("lI");
			slidepanelListItem4.innerHTML = `${slide.task4}`;

			const slidepanelListItem5 = document.createElement("lI");
			slidepanelListItem5.innerHTML = `${slide.task5}`;

			panel.append(slidepanel);
			panelContainer.append(panel);

			slidepanel.append(slidepanelImage);
			slidepanel.append(slidepanelCaption);
			slidepanelCaption.append(slidepanelHeadingThree);
			slidepanelCaption.append(slidepanelHeadingFour);
			slidepanelCaption.append(slidepanelList);
			slidepanelList.append(slidepanelListItem);
			slidepanelList.append(slidepanelListItem2);
			slidepanelList.append(slidepanelListItem3);
			slidepanelList.append(slidepanelListItem4);
			slidepanelList.append(slidepanelListItem5);
		});
	});

const panels = document.getElementsByClassName("panel");

// eslint-disable-next-line no-console
console.log(panels);

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

	// eslint-disable-next-line no-console
	console.log(lowerlimit);

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
			// eslint-disable-next-line no-console
			// console.log(panels[i]);
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
			// eslint-disable-next-line no-console
			// console.log(panels[i]);
			scrollTo(document.getElementById(`${panels[i].id}`));
		}
	}

	// disable click event
	return false;
});
