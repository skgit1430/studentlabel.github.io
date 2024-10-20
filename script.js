let canvas = document.getElementById('stickerCanvas');
let ctx = canvas.getContext('2d');

let img = new Image();
let scale = 1;
let rotateAngle = 0;
let posX = canvas.width / 2;  // Centering the image by default
let posY = canvas.height / 2;  // Centering the image by default

// Load the image when the file input changes
document.getElementById('uploadImage').addEventListener('change', function (e) {
    let reader = new FileReader();
    reader.onload = function (event) {
        img.src = event.target.result;
        img.onload = () => drawCanvas();  // Draw canvas after image loads
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Function to draw the canvas
function drawCanvas() {
    // Set the entire background to light yellow
    ctx.fillStyle = 'lightyellow'; // Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas

    ctx.save();
    ctx.translate(posX, posY);
    ctx.rotate(rotateAngle * Math.PI / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2); // Center the image
    ctx.restore();

    // Add text labels after the image is drawn
    addText();
}

// Function to add text labels to the canvas
function addText() {
    const xPosition = 550; // Right-hand side position for labels
    ctx.font = '20px Arial';
    
    // Draw Name
    ctx.fillStyle = 'red';
    const nameText = `Name: ${document.getElementById('name').value || 'Name'}`;
    ctx.fillText(nameText, xPosition, 50); 
    drawLine(xPosition, 55, nameText);
    
    // Draw Age
    ctx.fillStyle = 'green';
    const ageText = `Age: ${document.getElementById('age').value || 'Age'}`;
    ctx.fillText(ageText, xPosition, 80);
    drawLine(xPosition, 85, ageText);
    
    // Draw Standard
    const standardText = `Standard: ${document.getElementById('standard').value || 'Standard'}`;
    ctx.fillText(standardText, xPosition, 110);
    drawLine(xPosition, 115, standardText);
    
    // Draw Section
    const sectionText = `Section: ${document.getElementById('section').value || 'Section'}`;
    ctx.fillText(sectionText, xPosition, 140);
    drawLine(xPosition, 145, sectionText);

    // Draw School
    ctx.fillStyle = 'blue';
    const schoolText = `School: ${document.getElementById('school').value || 'School'}`;
    ctx.fillText(schoolText, xPosition, 170);
    drawLine(xPosition, 175, schoolText);
}

// Function to draw line based on text width
function drawLine(x, y, text) {
    ctx.beginPath();
    const textWidth = ctx.measureText(text).width; // Measure the text width
    ctx.moveTo(x, y); // Start point
    ctx.lineTo(x + textWidth + 20, y); // Line end point, +20 for padding
    ctx.stroke();
}

// Image manipulation functions
function moveImage(direction) {
    const moveBy = 10;
    if (direction === 'left') posX -= moveBy;
    if (direction === 'right') posX += moveBy;
    if (direction === 'up') posY -= moveBy;
    if (direction === 'down') posY += moveBy;
    drawCanvas();
}

function rotateImage(direction) {
    if (direction === 'cw') rotateAngle += 5;
    if (direction === 'ccw') rotateAngle -= 5;
    drawCanvas();
}

function zoomImage(zoomType) {
    if (zoomType === 'in') scale += 0.05;
    if (zoomType === 'out') scale = Math.max(0.05, scale - 0.05);
    drawCanvas();
}

function flipImage(flipType) {
    if (flipType === 'horizontal') {
        scale *= -1;  // Flip horizontally
    } else if (flipType === 'vertical') {
        scale *= -1;  // Flip vertically
    }
    drawCanvas();
}

function saveSticker() {
    const link = document.createElement('a');
    link.download = 'sticker.png';
    link.href = canvas.toDataURL();
    link.click();
}
