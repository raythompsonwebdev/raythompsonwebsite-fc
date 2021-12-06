(()=>{var e={150:()=>{function e(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var r,n,o=document.getElementById("myform"),a=document.getElementById("form-error"),s=(n=8,function(e){if(Array.isArray(e))return e}(r=o)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],s=!0,i=!1;try{for(r=r.call(e);!(s=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);s=!0);}catch(e){i=!0,o=e}finally{try{s||null==r.return||r.return()}finally{if(i)throw o}}return a}}(r,n)||e(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=s[0],l=s[1],c=s[2];a.classList.add("hide-error"),a.textContent="",i.addEventListener("blur",(function(e){e.preventDefault(),i.style.setProperty("--text-error","none"),i.validity.patternMismatch?(a.classList.remove("hide-error"),a.classList.add("show-error"),a.textContent="name too short or more than 40 characters. ",i.style.setProperty("--text-error","solid 2px #f38383cb")):(a.classList.add("hide-error"),a.classList.remove("show-error"),a.textContent="",i.style.setProperty("--text-error","none"))})),l.addEventListener("blur",(function(e){e.preventDefault(),a.textContent="",l.style.setProperty("--email-error","none"),l.validity.typeMismatch?(a.classList.add("show-error"),a.classList.remove("hide-error"),a.textContent="I am expecting an e-mail address!",l.style.setProperty("--email-error","solid 2px #f38383cb")):l.validity.patternMismatch?(a.classList.add("show-error"),a.classList.remove("hide-error"),a.textContent="I am expecting a valid e-mail address!",l.style.setProperty("--email-error","solid 2px rgb(250, 250, 135)")):(a.classList.remove("show-error"),a.classList.add("hide-error"),a.textContent="",l.style.setProperty("--email-error","none"))})),c.addEventListener("blur",(function(e){e.preventDefault(),c.style.setProperty("--url-error","none"),c.validity.typeMismatch?(a.classList.remove("hide-error"),a.classList.add("show-error"),a.textContent="I am expecting a web address!",c.style.setProperty("--url-error","solid 2px #f38383cb")):c.validity.patternMismatch?(a.classList.remove("hide-error"),a.classList.add("show-error"),a.textContent="I am expecting an valid web pattern!",c.style.setProperty("--url-error","solid 2px rgb(250, 250, 135)")):(a.classList.remove("show-error"),a.classList.add("hide-error"),a.textContent="",c.style.setProperty("--url-error","none"))})),o.addEventListener("submit",(function(t){if(i.validity.valueMissing&&l.validity.valueMissing)a.classList.add("show-error"),a.classList.remove("hide-error"),a.textContent="name and email address are required!",i.style.setProperty("--text-error","solid 2px rgb(136, 136, 241)"),l.style.setProperty("--email-error","solid 2px rgb(136, 136, 241)");else if(i.validity.valid||l.validity.valid){t.preventDefault();var r,n=new FormData(this),o=new URLSearchParams,s=function(t,r){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=e(t))||r&&t&&"number"==typeof t.length){n&&(t=n);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,i=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,s=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw s}}}}(n);try{for(s.s();!(r=s.n()).done;){var c=r.value;o.append(c[0],c[1])}}catch(e){s.e(e)}finally{s.f()}fetch("php/validation.php",{method:"POST",body:n}).then((function(e){return e.text()})).then((function(e){a.classList.remove("hide-error"),a.classList.add("show-error"),a.innerHTML=" form currently under maintenance and will be operational very soon!",console.error(e)})).catch((function(e){console.error("Fetch Error :-S",e)}))}else a.classList.add("show-error"),a.classList.remove("hide-error"),a.textContent="name and email address are required and need to be valid!",i.style.setProperty("--text-error","solid 2px rgb(136, 136, 241)"),l.style.setProperty("--email-error","solid 2px rgb(136, 136, 241)")}))},950:()=>{document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementsByClassName("tablink"),t=document.querySelector(["body","html"]),r=document.querySelector(".site_header"),n=document.querySelectorAll(".tabcontent");console.log(n);var o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=e.getBoundingClientRect().top;return r<=(window.innerHeight||document.documentElement.clientHeight)-t},a=function(e){e.classList.remove("scrolled"),e.classList.remove("scrolled-no-animation")};window.onscroll=function(){var e=window.matchMedia("(min-width: 30em) and (max-width: 599px)");t.scrollTop>=100?r.classList.add("fixed-header"):r.classList.remove("fixed-header"),!1===e.matches?n.forEach((function(e){var t;o(e,100)?((t=e).classList.remove("scrolled-no-animation"),t.classList.add("scrolled")):a(e)})):n.forEach((function(e){var t;o(e,100)?((t=e).classList.remove("scrolled"),t.classList.add("scrolled-no-animation")):a(e)}))};var s=document.querySelector(".menu-toggle"),i=document.querySelector(".site_navigation"),l=i.offsetHeight;s.addEventListener("click",(function(e){e.preventDefault(),i.classList.toggle("open"),i.style.transition="all 0.3s ease-in 0s",i.classList.contains("open")?i.style.top="0px":(i.style.transition="all 0.3s ease-in 0s",i.style.top="".concat(-l,"px"))})),Array.from(e).forEach((function(e){e.addEventListener("click",(function(e){var r,n=e.target.hash;""!==n&&(e.preventDefault(),r=document.querySelector("".concat(n)),t.scrollTo({behavior:"smooth",left:0,top:r.offsetTop-100})),i.classList.contains("open")?(i.style.top="".concat(-l,"px"),i.classList.remove("open")):i.style.top="0px"}))}))}))},446:()=>{var e=document.querySelectorAll(".box"),t=document.querySelectorAll(".project_tab"),r=Array.from(t),n=Array.from(e);r.forEach((function(e){e.addEventListener("click",(function(t){t.preventDefault(),n.filter((function(t){return t.dataset.all===e.id||t.dataset.id===e.id?(t.classList.remove("box-hide"),t.classList.add("box-show")):(t.classList.remove("box-show"),t.classList.add("box-hide")),t}))}))}))},157:()=>{var e=document.getElementById("next"),t=document.getElementById("prev"),r=window.document.querySelector(".hero-slider > .mask"),n=document.querySelector(".slider-body"),o=0;try{fetch("./data/slider-data.json").then((function(e){if(!e.ok)throw new Error("JSON data not received");return e.json()})).then((function(e){e.sliderdata.forEach((function(e){var t=document.createElement("ARTICLE");t.setAttribute("class","panel"),t.setAttribute("id","#".concat(e.hash));var r=document.createElement("FIGURE");r.setAttribute("class","slider-panel");var o=document.createElement("H2");o.textContent="".concat(e.title);var a=document.createElement("A");a.setAttribute("href",""),a.setAttribute("class","fancybox");var s=document.createElement("SPAN");s.setAttribute("style","background-image: url(".concat(e.bgimage,")"));var i=document.createElement("FIGCAPTION"),l=document.createElement("H3");l.textContent="".concat(e.header);var c=document.createElement("UL"),d=document.createElement("lI");d.textContent="".concat(e.task1);var m=document.createElement("lI");m.textContent="".concat(e.task2);var u=document.createElement("lI");u.textContent="".concat(e.task3);var p=document.createElement("lI");p.textContent="".concat(e.task4);var h=document.createElement("lI");h.textContent="".concat(e.task5),t.append(r),r.append(o),n.append(t),r.append(a),a.append(s),r.append(i),i.append(l),i.append(c),c.append(d),c.append(m),c.append(u),c.append(p),c.append(h)}))}))}catch(e){console.error(e)}var a=document.getElementsByClassName("panel"),s=function(e){r.scrollTo({behavior:"smooth",left:0,top:e.offsetTop})};e.addEventListener("click",(function(e){var t;e.preventDefault(),t=a.length-1,o===t?o=0:o++;for(var r=0;r<a.length;r++)r===o&&s(document.getElementById("".concat(a[r].id)));return!1})),t.addEventListener("click",(function(e){e.preventDefault(),0===o?o=0:o--;for(var t=0;t<a.length;t++)t===o&&s(document.getElementById("".concat(a[t].id)));return!1}))}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(950),r(446),r(157),r(150);document.querySelector("#banner").style.setProperty("--bg-image","url(images/sergi-kabrera-2xU7rYxsTiM-unsplash.jpg)"),document.getElementById("shoestoreImg").setAttribute("alt","shoestore-home-page"),document.getElementById("travelAgencyImg").setAttribute("alt","travel-agency-home-page"),document.getElementById("manneringImg").setAttribute("alt","mannering-musicmvc-home-page"),document.getElementById("quoteGeneratorImg").setAttribute("alt","random-quote-generator"),document.getElementById("scrollingPageImg").setAttribute("alt","scrolling-product-page"),document.getElementById("cssDocImg").setAttribute("alt","css-documentation-page"),document.getElementById("weatherAppImg").setAttribute("alt","code-pen-weather-app"),document.getElementById("tributePageImg").setAttribute("alt","obama-tribute-page"),document.getElementById("clashvibesImg").setAttribute("alt","clashvibes-home-page"),document.getElementById("drumMachineImg").setAttribute("alt","drum-machine"),document.getElementById("reactWeatherAppImg").setAttribute("alt","react-weather-app"),document.getElementById("reactQuoteGeneratorImg").setAttribute("alt","react-random-quote-generator");var e=document.querySelectorAll("img.projectImg");function t(e){for(var t=[],r=240,n=0;n<10;n++)t[n]="".concat(e,".png ").concat(r,"w"),r+=20;return t.join()}for(var n=0;n<e.length;n++){var o=e[n].getAttribute("src"),a=t(o=o.slice(0,-4));e[n].srcset=a,e[n].sizes="(min-width: 90em) 370px, (min-width: 80em) and (max-width: 1439px) 350px, (min-width: 64em) and (max-width: 1279px) 330px, (min-width: 46em) and (max-width: 1023px) 310px, (min-width: 37.5em) and (max-width: 735px) 310px,(min-width: 30em) and (max-width: 599px) 330px, (min-width: 22.5em) and (max-width: 479px) 310px, 85vw"}})()})();
//# sourceMappingURL=bundle.179e4a7a6b5ea646a51a.js.map