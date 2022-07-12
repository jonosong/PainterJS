// visit this link for more info about canvas API:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d"); // Must do this for canvas. Controls pixels inside the canvas
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveButton = document.getElementById("jsSave");
const resetButton = document.getElementById("jsReset");

const INITIAL_COLOR = "#black";
const CANVAS_SIZE = 500;
const INITIAL_LINE_SIZE = range.max/2;

canvas.width = CANVAS_SIZE; 
canvas.height = CANVAS_SIZE;
// specifically say both w & h as an element to manipulate pixels in both JS and CSS. Otherwise, it does not work 

context.strokeStyle = "INITIAL_COLOR"; // sets default color for ths line
context.fillStyle = "INITIAL_COLOR";
context.lineWidth = INITIAL_LINE_SIZE;

let painting = false; // sets to True when mouse is DOWN
let filling = false; // while filling, we don't want to draw lines when the canvas is clicked


setWhiteBGC();

function setWhiteBGC(){
    context.fillStyle = "white";
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); 
} // sets default color for the canvas 

function startPainting(){
    painting = true; // when mouseDown ie starting to draw a line
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX; 
    const y = event.offsetY;
    if(!painting) {
        context.beginPath(); // begins a path(line) when mouse is NOT clicked on the canvas ie just moving around on the canvas
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y); // lineTo = sets an straight line from the beginPath to the ending coordinates (x, y here) 
        context.stroke(); // stroke() = creates a line with the current stroke style
    }
}
// offset vs client = client shows the value where the mouse is in the whole window whereas offset shows coordinates on the canvas
// MouseMove = in this function, it only detects mouse movement on the canvas

// function onMouseDown(event){
//     painting = true;
// }
// MouseDown = fires when the user depresses the mouse button ie dragging
// this function is replaced by startPainting function. It was created for understanding the idea of mouseDown

function onMouseUp(event){
    stopPainting();
}
// MouseUp = fires when the user releases the mouse button
// Click = fires when a MD and MU event occur on the same element

function handleRangeChange(event){
    const rangeSize = event.target.value;
    context.lineWidth = rangeSize;
}

function handleCanvasClick(){
    if(filling) {
        context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE) // x, y, w, h
    }      
}

function handleCM(event){
    event.preventDefault(); 
}

function handleSaveClick(){
    const image = canvas.toDataURL(); // sets image type. Default = png. Jpeg = image/jpeg
    const link = document.createElement("a"); // a = anchor
    link.href = image;
    link.download = "Paint JS 🎨";
    link.click();
}

function handleResetClick(){
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setWhiteBGC();
    range.value = INITIAL_LINE_SIZE;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor; // BGC is retrieved from the console
    context.strokeStyle = color; 
    context.fillStyle = color;
}

function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Draw";
    }
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); // to get the color that user selected 


// Below: Why if(variable)? Checking that the variable is not full
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); // MouseLeave = for detecting mouse movement outside of the canvas
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // prevents user to right click on the canvas
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);   
}

if(saveButton){
    saveButton.addEventListener("click", handleSaveClick);
}

if(resetButton){
    resetButton.addEventListener("click", handleResetClick);
}
