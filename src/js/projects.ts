// export default function projectTabs() {
const boxes = document.querySelectorAll(".project");

const tabs = document.querySelectorAll(".project-tab");

const arrayTabs = Array.from(tabs);
const arrayBoxes = Array.from(boxes);

arrayTabs.forEach((element1: HTMLElement) => {
  element1.addEventListener("click", (e) => {
    e.preventDefault();

    arrayBoxes.filter((element2: HTMLElement) => {
      if (element2.dataset.all === element1.id) {
        // eslint  - "no-param-reassign": "off"
        element2.classList.remove("project-hide");
        element2.classList.add("project-show");
      } else if (element2.dataset.id === element1.id) {
        element2.classList.remove("project-hide");
        element2.classList.add("project-show");
      } else {
        element2.classList.remove("project-show");
        element2.classList.add("project-hide");
      }
      return element2;
    });
  });
});
// }
