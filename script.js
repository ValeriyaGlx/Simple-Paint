const canva = document.querySelector('#canvas');
const ctx = canva.getContext('2d');



canva.width = window.innerWidth/1.5;
canva.height = window.innerHeight/1.5;

let isDrawing = false;
let isColor = false;
let lastX;
let lastY;
let hue = 1;
let wide = 1;

ctx.fillStyle = '#FFFAFA';
ctx.fillRect(0,0,canva.width,canva.height);
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth= wide;


const linesWidth = document.getElementById('linesWidth');
linesWidth.addEventListener('change', chooseWide);

function chooseWide(){
    ctx.lineWidth = this.value;
    wide = this.value;
    return wide;
}

function  drow(e){
if(!isDrawing) return;
ctx.beginPath();
ctx.moveTo(lastX,lastY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke()
lastX = e.offsetX; lastY=e.offsetY;
}

function changeColor(e){
    
    isColor = false;

    ctx.lineWidth= wide;

    if(e.target.id === "white"){ctx.strokeStyle = '#FFFAFA'}
    if(e.target.id === "black"){ctx.strokeStyle = '#000000'}
    if(e.target.id === "red"){ctx.strokeStyle = '#FF0000'}
    if(e.target.id === "green"){ctx.strokeStyle = '#008000'}
    if(e.target.id === "brown"){ctx.strokeStyle = '#8B4513'}
    if(e.target.id === "grey"){ctx.strokeStyle = '#808080'}
    if(e.target.id === "blue"){ctx.strokeStyle = '#0000FF'}
    if(e.target.id === "yellow"){ctx.strokeStyle = '#FFFF00'}
    if(e.target.id === "orange"){ctx.strokeStyle = '#FF8C00'}
    if(e.target.id === "light--blue"){ctx.strokeStyle = '#ADD8E6'}
    if(e.target.id === "colorful"){listenerColor()}
return 
}

function listenerColor(){
isColor = true;
canva.addEventListener('mousemove', drowColoful);
function drowColoful(e){
 if(!isDrawing) return;
 if(!isColor) return;
ctx.beginPath();
ctx.moveTo(lastX,lastY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke()
lastX = e.offsetX; lastY=e.offsetY;
ctx.strokeStyle = `hsl(${hue}, 100% , 50%)`;
if (hue > 360){hue = 0};
hue++;
}}


function changeAction(e){
    if(e.target.id === "erase"){ctx.strokeStyle = '#FFFAFA'; ctx.lineWidth = 100};
    if(e.target.id === "pour"){ 
        ctx.fillStyle=ctx.strokeStyle; 
        ctx.fillRect(0,0,canva.width,canva.height)};
    if(e.target.id === "save"){
        const image = canva.toDataURL('image/png');
        const link = document.createElement('a');
        link.href=image;
        link.download='Paint Image';
        link.click()
    }
}

function manualModeCM(e){
    e.preventDefault();
}

const color = document.querySelectorAll('.color');
color.forEach(key => {key.addEventListener('click', changeColor)});

const key = document.querySelectorAll('.key');
key.forEach(key => {key.addEventListener('click', changeAction)});


if(canva){
canva.addEventListener('mousemove', drow);
canva.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX; lastY=e.offsetY;
});
canva.addEventListener('mouseup', () => isDrawing=false);
canva.addEventListener('mouseout', () => isDrawing=false);
canva.addEventListener('contextmenu', manualModeCM);
}


const colorInput = document.getElementById('color--input');
colorInput.addEventListener('change', inputColor);

function inputColor(){
    isColor = false;
ctx.strokeStyle = this.value;
}

