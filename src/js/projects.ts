// export default function projectTabs() {

const projects: NodeListOf<HTMLDivElement> =
  document.querySelectorAll(".project");

const tabs: NodeListOf<HTMLDivElement> =
  document.querySelectorAll(".project-tab");

const tabsArray: HTMLDivElement[] = Array.from(tabs);
const projectsArray: HTMLDivElement[] = Array.from(projects);

const filteredProject = tabsArray.forEach((tab: HTMLDivElement) => {
  tab.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();

    projectsArray.filter((project: HTMLDivElement) => {
      if (project.dataset.all === tab.id) {
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

export { filteredProject };
