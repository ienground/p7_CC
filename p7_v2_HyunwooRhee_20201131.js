/**
 * Developed by IENGROUND of ienlab.
 * @ienground_
 * Ericano Rhee on github.com/ienground
 */

// 그냥 펜, 비밀 펜, 타임아웃 펜
// 브러시는 재귀 브러시

let prevBrush = 0;
let brush = 0;
let level = 20;
let brushColor = '#000000';
let brushSize = 20;

// default brush
let pointerX = [];
let pointerY = [];
let pointerCenterX = [];
let pointerCenterY = [];
let pointerSize = [];
let pointerColor = [];

// // secret brush
// let secretPointerX = [];
// let secretPointerY = [];
// let secretPointerCenterX = [];
// let secretPointerCenterY = [];
// let secretPointerSize = [];
// let secretPointerColor = [];

let centerX, centerY;
let radius = 20;
let distance = 100;
// let angle = 0;

// ui
let colorPicker;
let timeOutSlider, spreadSlider;
let isUVLightOff = true;
let lightToggleLevel = 26;
let px = [], py = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    colorPicker = createColorPicker('#000000');
    colorPicker.style('width', '60px');
    colorPicker.style('height', '60px');
    colorPicker.position(width - 20 - colorPicker.width, height - 80);
    colorPicker.size();

    timeOutSlider = createSlider(1, 10, 3);
    timeOutSlider.position(width - 160 - timeOutSlider.width, height - 80);

    spreadSlider = createSlider(1, 50, 10);
    spreadSlider.position(width - 160 - spreadSlider.width, height - 40);

    centerX = width / 2;
    centerY = (height - 100) / 2;
    radius = 20;
}

function draw() {
    background(255);

    noStroke();
    fill('#FF0000');
    circle(centerX, centerY, radius);

    fill('#000000');
    circle(centerX + distance * cos(frameCount % 360), centerY + distance * sin(frameCount % 360), radius);

    noFill();
    stroke('#000000');
    line(centerX, centerY, centerX + distance * cos(frameCount % 360), centerY + distance * sin(frameCount % 360));

    for (let i = 0; i < px.length - 1; i++) {
        strokeWeight(radius * 2);
        line(px[i], py[i], px[i + 1], py[i + 1]);
    }

    // createCursor();
    createUI();
}

function createUI() {
    noStroke();
    fill('#263238')
    rect(0, height - 100, width, 100);

    let brush_height = [-40, -40, -40];

    if (brush !== prevBrush) {
        brush_height[brush] -= level;
        brush_height[prevBrush] = -60;
        brush_height[prevBrush] += level;
    } else {
        brush_height[brush] = -60;
    }

    if (level < 20) {
        level++;
    } else if (level === 20) {
        prevBrush = brush;
    }

    fill('#FFFFFF');
    stroke('#FFFFFF');
    strokeWeight(1);
    beginShape();
    vertex(20, height + 5);
    vertex(20, height + brush_height[0]);
    vertex(30, height + brush_height[0] - 25);
    vertex(40, height + brush_height[0]);
    vertex(40, height + 5);
    endShape();

    fill(brushColor);
    beginShape();
    vertex(25, height + brush_height[0] - 12.5);
    vertex(30, height + brush_height[0] - 25);
    vertex(35, height + brush_height[0] - 12.5);
    endShape();

    fill('#d2a8e8');
    stroke('#d2a8e8');
    beginShape();
    vertex(60, height + 5);
    vertex(60, height + brush_height[1]);
    vertex(70, height + brush_height[1] - 25);
    vertex(80, height + brush_height[1]);
    vertex(80, height + 5);
    endShape();

    fill(brushColor);
    beginShape();
    vertex(65, height + brush_height[1] - 12.5);
    vertex(70, height + brush_height[1] - 25);
    vertex(75, height + brush_height[1] - 12.5);
    endShape();

    textAlign(CENTER);
    text("🔒", 70, height + brush_height[1] + 20);

    fill('#ff4081');
    stroke('#ff4081');
    beginShape();
    vertex(100, height + 5);
    vertex(100, height + brush_height[2]);
    vertex(110, height + brush_height[2] - 25);
    vertex(120, height + brush_height[2]);
    vertex(120, height + 5);
    endShape();

    fill(brushColor);
    beginShape();
    vertex(105, height + brush_height[2] - 12.5);
    vertex(110, height + brush_height[2] - 25);
    vertex(115, height + brush_height[2] - 12.5);
    endShape();

    textAlign(CENTER);
    text("🕒", 110, height + brush_height[2] + 20);

    noStroke();
    fill('#FFFFFF');
    rect(width - 130, height - 80, 30, 60);
    fill('#FF0000');
    rect(width - 126, height - 76, 22, 26);
    fill('#00FF00');
    rect(width - 126, height - 76 + 26, 22, 26);
    fill('#FFFFFF');
    stroke('#000000');
    strokeWeight(2);

    if (lightToggleLevel <= 26) {
        if (lightToggleLevel < 26) { lightToggleLevel++; }
        if (isUVLightOff) {
            rect(width - 126, height - 76 + lightToggleLevel, 22, 26);
        } else {
            rect(width - 126, height - 76 + 26 - lightToggleLevel, 22, 26);
        }
    }

    textAlign(LEFT);
    text('Press 1, 2, 3 to select tool,\nPress E to erase all.', 140, height - 60);
    text('Timeout Pen Duration', timeOutSlider.x - 130, timeOutSlider.y + 15);
    text('Pen spread', spreadSlider.x - 130, spreadSlider.y + 15);
}

function createSecretLight() {
    for (let i = 0; i < 100; i++) {
        let lightColor = lerpColor(color('#FFFFFF'), color('#d2a8e8'), i / 100);
        noStroke();
        fill(lightColor)
        circle(mouseX, mouseY, 100 - i)
    }
}

function createCursor() {
    if (mouseIsPressed) {
        stroke(brushColor);
        strokeWeight(brushSize / 10);
        fill(getInverseColor(brushColor));
        circle(mouseX, mouseY, brushSize);
    } else {
        fill(brushColor);
        circle(mouseX, mouseY, brushSize);
    }

    textAlign(CENTER);
    switch (brush) {
        case 1: {
            text("🔒", mouseX, mouseY + 5);
            break;
        }

        case 2: {
            text("🕒", mouseX, mouseY + 5);
            break;
        }
    }
}

function getInverseColor(colorString) {
    let c = color(colorString);
    let r = 255 - red(c);
    let g = 255 - green(c);
    let b = 255 - blue(c);

    return color(r, g, b);
}

function keyPressed(key) {
    switch (key.key) {
        case '1': {
            prevBrush = brush;
            brush = 0;
            if (prevBrush !== brush) {
                level = 0;
            }
            break;
        }

        case '2': {
            prevBrush = brush;
            brush = 1;
            if (prevBrush !== brush) {
                level = 0;
            }
            break;
        }

        case '3': {
            prevBrush = brush;
            brush = 2;
            if (prevBrush !== brush) {
                level = 0;
            }
            break;
        }

        case 'e':
        case 'E': {
            pointerX = [];
            pointerY = [];
            pointerCenterX = [];
            pointerCenterY = [];
            pointerSize = [];
            pointerColor = [];

            secretPointerX = [];
            secretPointerY = [];
            secretPointerCenterX = [];
            secretPointerCenterY = [];
            secretPointerSize = [];
            secretPointerColor = [];

            timePointerX = [];
            timePointerY = [];
            timePointerCenterX = [];
            timePointerCenterY = [];
            timePointerSize = [];
            timePointerMade = [];
            timePointerColor = [];
            break;
        }

        case ' ': {
            strokeWeight(radius * 2);
            px.push(centerX + distance * cos(frameCount % 360));
            py.push(centerY + distance * sin(frameCount % 360));

            centerX += distance * cos(frameCount % 360);
            centerY += distance * sin(frameCount % 360);
            break;
        }
    }
}

function mouseClicked() {
    if (mouseY >= height - 90 && mouseY <= height) {
        if (mouseX >= 20 && mouseX <= 40) {
            prevBrush = brush;
            brush = 0;
            if (prevBrush !== brush) {
                level = 0;
            }
        } else if (mouseX >= 60 && mouseX <= 80) {
            prevBrush = brush;
            brush = 1;
            if (prevBrush !== brush) {
                level = 0;
            }
        } else if (mouseX >= 100 && mouseX <= 120) {
            prevBrush = brush;
            brush = 2;
            if (prevBrush !== brush) {
                level = 0;
            }
        } else if (mouseX >= width - 126 && mouseX <= width - 104) {
            isUVLightOff = !isUVLightOff;
            lightToggleLevel = 0;
        }
    }
}

function mousePressed() {
    clickStartTime = new Date().getTime();
}

function mouseReleased() {
    clickEndTime = new Date().getTime();

}

function getRandomInt(min, max) {
    return Math.floor(random(min, max + 1));
}

function mouseWheel(event) {
    if (event.delta >= 0 && brushSize < 150) {
        brushSize++;
    } else if (event.delta < 0 && brushSize > 0) {
        brushSize--;
    }
}