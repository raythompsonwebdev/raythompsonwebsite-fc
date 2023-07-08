// export default function projectTabs() {
const projects = document.querySelectorAll(".project");

const tabs = document.querySelectorAll(".project-tab");

const tabsArray = Array.from(tabs);
const projectsArray = Array.from(projects);

tabsArray.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    projectsArray.filter((project: any) => {
      // eslint-disable-next-line no-console
      console.log(project.dataset);

      if (project.dataset.all === tab.id) {
        // eslint  - "no-param-reassign": "off"
        project.classList.remove("project-hide");
        project.classList.add("project-show");
      } else if (project.dataset.id === tab.id) {
        project.classList.remove("project-hide");
        project.classList.add("project-show");
      } else {
        project.classList.remove("project-show");
        project.classList.add("project-hide");
      }
      return project;
    });
  });
});
// }
