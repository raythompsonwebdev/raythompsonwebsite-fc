import "./styles/style.scss";
import MainFunc from "../src/js/mainFunc.ts";
import ChartGraph from '../src/js/chart.ts'
import "./js/contact.ts";
import {filteredProject} from "../src/js/projects.ts";
import "./js/slider.ts";


//import Img from "./images/sergi-kabrera-2xU7rYxsTiM-unsplash-sqoosh.webp";

window.addEventListener("load", () => {

  MainFunc();

  filteredProject

  ChartGraph();

  /**
   * home page background image
   *
   *  */
  // const bgImage = document.querySelector("#banner") as HTMLDivElement;

  // bgImage.style.setProperty("--bg-image", Img);

 
});

// get enviroment variables
// console.log(import.meta.env)
// // mode
// console.log(import.meta.env.MODE)

// console.log(import.meta.env.DEV)
