"use strict";

var boxes = document.querySelectorAll(".box");
var tabs = document.querySelectorAll(".project_tab");
var arrayTabs = Array.from(tabs);
var arrayBoxes = Array.from(boxes);
arrayTabs.forEach(function (element1) {
  element1.addEventListener("click", function (e) {
    e.preventDefault();
    arrayBoxes.filter(function (element2) {
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
//# sourceMappingURL=projects.js.map
