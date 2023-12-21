const DARKEN = "DARKEN";
const LIGHTEN = "LIGHTEN";
const COLOR = "COLOR";
const RAINBOW = "RAINBOW";

const root = document.querySelector("section#grid");
const bgColor = document.querySelector("#bg-color");
const penColor = document.querySelector("#pen-color");
const slider = document.querySelector("#slider");

let COLORSTATE = { color: null, state: null };

createTable(slider.value);
togglePenColor();

penColor.oninput = () => (COLORSTATE.color = penColor.value);
bgColor.oninput = () => (root.style.background = bgColor.value);
slider.oninput = () => createTable(slider.value);

function toggleEraser() {
  COLORSTATE = { color: bgColor.value, state: COLOR };
  handleClickedColor("eraser");
}
function togglePenColor() {
  COLORSTATE = { color: penColor.value, state: COLOR };
  handleClickedColor("pen");
}
function toggleRainbow() {
  COLORSTATE = { color: null, state: RAINBOW };
  handleClickedColor("rainbow");
}
function toggleLighten() {
  COLORSTATE = { color: null, state: LIGHTEN };
  handleClickedColor("lighten");
}
function toggleDarken() {
  COLORSTATE = { color: null, state: DARKEN };
  handleClickedColor("darken");
}

function clearGrid() {
  return createTable(slider.value);
}

function createTable(end) {
  // Clear Old Grid
  document
    .querySelectorAll("div.parent")
    .forEach((item) => root.removeChild(item));

  // Set Grid Size
  document.querySelector("#grid-size").innerHTML = `${end} x ${end}`;

  for (let index = 0; index < end; index++) {
    const parent = document.createElement("div");
    parent.className = "parent";
    for (let i = 0; i < end; i++) {
      const child = document.createElement("div");
      if (i == end - 1) {
        child.style.borderRight = "0.1px rgb(0, 65, 243) solid";
      }
      if (index == end - 1) {
        child.style.borderBottom = "0.1px rgb(0, 65, 243) solid";
      }
      child.onmouseover = () => {
        if (COLORSTATE.state == RAINBOW) {
          child.style.background = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
        } else if (COLORSTATE.state == DARKEN) {
          let a = child.style.background;
          if (!a.match("rgba")) {
            child.style.background = "rgba(0,0,0,0.1)";
            return;
          }
          let opacity = Number.parseFloat(
            child.style.background.split(",")[3].split(")")[0]
          );
          child.style.background = `rgba(0,0,0,${
            opacity == 0.9 ? opacity : opacity + 0.1
          })`;
        } else if (COLORSTATE.state == LIGHTEN) {
          let a = child.style.background;
          if (!a.match("rgba")) {
            return;
          }
          let opacity = Number.parseFloat(
            child.style.background.split(",")[3].split(")")[0]
          );
          child.style.background = `rgba(0,0,0,${
            opacity == 0 ? opacity : opacity - 0.1
          })`;
        } else {
          child.style.background = COLORSTATE.color;
        }
      };
      parent.appendChild(child);
    }
    root.appendChild(parent);
  }
}

function getRandomColor() {
  return Math.floor(Math.random() * 256);
}

function handleClickedColor(id) {
  document
    .querySelectorAll(".toggle")
    .forEach((item) => item.classList.remove("clicked"));
  document.querySelector(`#${id}`).classList.add("clicked");
}
