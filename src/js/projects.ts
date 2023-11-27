// export default function projectTabs() {

const projects : NodeListOf<HTMLDivElement> = document.querySelectorAll(".project");

const tabs : NodeListOf<HTMLDivElement> = document.querySelectorAll(".project-tab");

const tabsArray : HTMLDivElement[] = Array.from(tabs);
const projectsArray : HTMLDivElement[] = Array.from(projects);

const filteredProject = tabsArray.forEach((tab : HTMLDivElement) => {
  tab.addEventListener("click", (e:MouseEvent) => {
    e.preventDefault();

    projectsArray.filter((project: HTMLDivElement) => {
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

export {filteredProject}

// const filteredProject = () => {

//   const projects: NodeListOf<HTMLDivElement> = document.querySelectorAll(".project");
//   const tabs: NodeListOf<HTMLDivElement> = document.querySelectorAll(".project-tab");

//   const tabsArray: HTMLDivElement[] = Array.from(tabs);
//   const projectsArray: HTMLDivElement[] = Array.from(projects);

//   tabsArray.forEach((tab: HTMLDivElement) => {
//     tab.addEventListener("click", (e: Event) => {
//       e.preventDefault();

//       projectsArray.forEach((project: HTMLDivElement) => {
//         if (project.dataset.all === tab.id || project.dataset.id === tab.id) {
//           project.classList.remove("project-hide");
//           project.classList.add("project-show");
//         } else {
//           project.classList.remove("project-show");
//           project.classList.add("project-hide");
//         }
//       });
//     });
//   });
// }
// export default filteredProject; // No need to export anything if you are not using `filteredProject` elsewhere

