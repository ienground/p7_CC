/**
 * Developed by IENGROUND of ienlab.
 * @ienground_
 * Ericano Rhee on github.com/ienground
 */

// 그냥 펜, 비밀 펜, 타임아웃 펜
// 브러시는 재귀 브러시

let brush = 0;
let brushColor = '#000000';

let pointerX = [];
let pointerY = [];
let pointerDirection = [];
let pointerSize = [];
let pointerVelocity = [];
let pointerMade = [];

let duration = 5 * 60;

let clickStartTime = 0, clickEndTime = 0;

function preload() {
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#F7F7F7');
    angleMode(DEGREES);

}

function draw() {
    background('#F7F7F7');
    noStroke();

    if (mouseIsPressed) {
        fill('#FF0000');
        circle(mouseX, mouseY, 20);
    } else {
        fill('#263238');
        circle(mouseX, mouseY, 20);
    }

    if (mouseIsPressed) {
        if (frameCount % 5 === 0) {
            for (let i = 0; i < 4; i++) {
                pointerX.push(mouseX);
                pointerY.push(mouseY);
                pointerDirection.push(i);
                pointerSize.push(30);
                // pointerSize.push(map(clickEndTime - clickStartTime, 0, 5000, 10, 200));
                pointerVelocity.push(random(1, 3));
                pointerMade.push(frameCount);
            }
        }

    }

    for (let i = 0; i < pointerX.length; i++) {
        stroke('#00FF00');
        noFill();
        strokeWeight(pointerSize / 10)
        let size = map(frameCount - pointerMade[i], 0, duration, pointerSize[i], 0);
        circle(pointerX[i], pointerY[i], size);

        switch (pointerDirection[i]) {
            case 0: { // 왼쪽 상위로
                pointerX[i] -= pointerVelocity[i];
                pointerY[i] -= pointerVelocity[i];

                if (pointerX[i] < pointerSize[i] / 2 || pointerX[i] > width - pointerSize[i] / 2) {
                    pointerDirection[i] = 1;
                }

                if (pointerY[i] < pointerSize[i] / 2 || pointerY[i] > height - 100 - pointerSize[i] / 2) {
                    pointerDirection[i] = 2;
                }
                break;
            }

            case 1: { // 오른쪽 상위로
                pointerX[i] += pointerVelocity[i];
                pointerY[i] -= pointerVelocity[i];

                if (pointerX[i] < pointerSize[i] / 2 || pointerX[i] > width - pointerSize[i] / 2) {
                    pointerDirection[i] = 0;
                }

                if (pointerY[i] < pointerSize[i] / 2 || pointerY[i] > height - 100 - pointerSize[i] / 2) {
                    pointerDirection[i] = 3;
                }
                break;
            }

            case 2: { // 왼쪽 하위로
                pointerX[i] -= pointerVelocity[i];
                pointerY[i] += pointerVelocity[i];

                if (pointerX[i] < pointerSize[i] / 2 || pointerX[i] > width - pointerSize[i] / 2) {
                    pointerDirection[i] = 3;
                }

                if (pointerY[i] < pointerSize[i] / 2 || pointerY[i] > height - 100 - pointerSize[i] / 2) {
                    pointerDirection[i] = 0;
                }
                break;
            }

            case 3: { // 오른쪽 하위로
                pointerX[i] += pointerVelocity[i];
                pointerY[i] += pointerVelocity[i];

                if (pointerX[i] < pointerSize[i] / 2 || pointerX[i] > width - pointerSize[i] / 2) {
                    pointerDirection[i] = 2;
                }

                if (pointerY[i] < pointerSize[i] / 2 || pointerY[i] > height - 100 - pointerSize[i] / 2) {
                    pointerDirection[i] = 1;
                }
                break;
            }
        }
    }

    for (let i = pointerX.length - 1; i >= 0; i--) {
        if (frameCount - pointerMade[i] >= duration) {
            pointerX.splice(i, 1);
            pointerY.splice(i, 1);
            pointerDirection.splice(i, 1);
            pointerSize.splice(i, 1);
            pointerVelocity.splice(i, 1);
            pointerMade.splice(i, 1);
        }
    }

    createUI();
}

function createUI() {
    noStroke();
    fill('#263238')
    rect(0, height - 100, width, 100);

    fill('#FFFFFF');
    stroke('#FFFFFF');
    beginShape();
    vertex(20, height + 5);
    vertex(20, height - 60);
    vertex(30, height - 85);
    vertex(40, height - 60);
    vertex(40, height + 5);
    endShape();

    fill(brushColor);
    beginShape();
    vertex(25, height - 72.5);
    vertex(30, height - 85);
    vertex(35, height - 72.5);
    endShape();

    fill('#d2a8e8');
    stroke('#d2a8e8');
    beginShape();
    vertex(60, height + 5);
    vertex(60, height - 60);
    vertex(70, height - 85);
    vertex(80, height - 60);
    vertex(80, height + 5);
    endShape();

    fill(brushColor);
    beginShape();
    vertex(65, height - 72.5);
    vertex(70, height - 85);
    vertex(75, height - 72.5);
    endShape();

    textAlign(CENTER);
    text("🔒", 70, height - 40);




}

function mousePressed() {
    clickStartTime = new Date().getTime();
}

function mouseReleased() {
    clickEndTime = new Date().getTime();

}

function mouseWheel(event) {
    // if (event.delta >= 0 && size < 150) {
    //     size++;
    // } else if (event.delta < 0 && size > 0) {
    //     size--;
    // }
}