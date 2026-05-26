const colorPicker=document.getElementById("color");
const brushSizeSelector=document.getElementById("Brushsize");
const penTool=document.getElementById("pen");
const eraserTool=document.getElementById("eraser");
const drawSquareBtn=document.getElementById("square");
const clearCanvasBtn=document.getElementById("clean");
const DownloadDrawingBtn=document.getElementById("download");
const canvas=document.getElementById("canvas");

const ctx=canvas.getContext("2d");

canvas.height=420;
canvas.width=800;
let isDrawing=false; 
let currentTool="pen"; 
let isDrawingSquare=false;

ctx.strokeStyle=colorPicker.value;
ctx.lineWidth=brushSizeSelector.value;
ctx.lineCap="round";

let startX=0;
let startY=0;

function startDraw(e){
    isDrawing=true;
    if(isDrawingSquare){
        startX=e.offsetX;
        startY=e.offsetY;
        return;
    }
    
    ctx.beginPath();
    ctx.moveTo(e.offsetX,e.offsetY);
    
}
function draw(e)
{
    if(!isDrawing) return;

    if(currentTool === "eraser"){
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = brushSizeSelector.value;
    } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSizeSelector.value;
    }

    

    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX,e.offsetY);
}
function stopDrawing(e)
{
    if(!isDrawing) return;
    if(isDrawingSquare){
       let endX=e.offsetX;
        let endY=e.offsetY; 

        let width=endX-startX;
        let height=endY-startY;
         ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle=colorPicker.value;
        const brushSizeSelector=document.getElementById("Brushsize");

        ctx.beginPath();
        ctx.rect(startX,startY,width,height);
        ctx.stroke();
        
        
    }
    isDrawing=false;
    ctx.beginPath();

}
eraserTool.addEventListener("click",()=>{
    isDrawingSquare=false;
    penTool.classList.remove("active");
    eraserTool.classList.add("active");
    drawSquareBtn.classList.remove("active");
    currentTool="eraser";
    console.log(currentTool)

})
penTool.addEventListener("click",()=>{
    isDrawingSquare=false;
    penTool.classList.add("active");
    eraserTool.classList.remove("active");
    drawSquareBtn.classList.remove("active");
    currentTool="pen";

})
drawSquareBtn.addEventListener("click",()=>{
    
    penTool.classList.remove("active");
    eraserTool.classList.remove("active");
    drawSquareBtn.classList.add("active");
    currentTool="square";
    isDrawingSquare=true;


})
clearCanvasBtn.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})
DownloadDrawingBtn.addEventListener("click",()=>{
    let canvasImage=canvas.toDataURL("image/png");
    let anchorElement=document.createElement("a");
    anchorElement.href=canvasImage;
    anchorElement.download="myDrawing.png";
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);

})

canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",draw);
canvas.addEventListener("mouseup",stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);









