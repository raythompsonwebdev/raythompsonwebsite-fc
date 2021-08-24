const boxes = document.querySelectorAll(".box");
const tabs = document.querySelectorAll(".project_tab");

const arrayTabs = Array.from(tabs);
const arrayBoxes = Array.from(boxes);

console.log(arrayTabs);
console.log(arrayBoxes);

arrayTabs.forEach((element1) => {
	// console.log(element1);
	element1.addEventListener("click", (e) => {
		e.preventDefault();

		arrayBoxes.filter((element2) => {
			// console.log(element2.dataset.id == element1.id);
			if (element2.dataset.all === element1.id) {
				// eslint  - "no-param-reassign": "off"
				element2.classList.remove("box-hide");
				element2.classList.add("box-show");
			} else if (element2.dataset.id === element1.id) {
				element2.classList.remove("box-hide");
				element2.classList.add("box-show");
			} else {
				element2.classList.remove("box-show");
				element2.classList.add("box-hide");
			}
			return element2;
		});
	});
});
