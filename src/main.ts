import "./styles/style.scss";
import MainFunc from "../src/js/mainFunc.ts";
import ChartGraph from "../src/js/chart.ts";
import "./js/contact.ts";
import { filteredProject } from "../src/js/projects.ts";
import "./js/slider.ts";
import srcSet from "../src/js/srcSet.ts";

window.addEventListener("load", () => {
  MainFunc();

  filteredProject;

  ChartGraph();

  srcSet();
});
