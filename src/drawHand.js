
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { World } from './World/World.js';

const video = document.getElementById("videoElement");
const canvas = document.getElementById("draw_hand");
const ctx = canvas.getContext("2d");

// Get a reference to the container element
const container = document.querySelector('#scene-container');
// create a new world
const world = new World(container);
// start the animation loop
world.start();

// canvas.width = "500px";
// canvas.hidden = "375px";
handpose.load()
    .then(model => {
        setInterval(() => {
            model.estimateHands(video)
                .then(predictions => {
                    ctx.drawImage(video, 0, 0);
                    // if (predictions.length > 0 && predictions[0].handInViewConfidence > 0.98) {
                    if (predictions.length > 0 ){
                        draw_hand(predictions);
                        world.drawHand(predictions);
                    }
                })
                .catch(err => console.log(err))
        }, 100);
    })
    .catch(err => console.log(err));

function draw_hand(predictions) {
    // console.log("draw hand");
    const prediction = predictions[0];
    // console.log(prediction);
    const { landmarks, annotations: { indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb } } = prediction;
    landmarks.forEach(([x, y]) => {
        ctx.fillRect(x - 3, y - 3, 6, 6)
    })
    // draw path
    ctx.beginPath();
    ctx.moveTo(indexFinger[0][0], indexFinger[0][1]);
    indexFinger.forEach(([x, y]) => {
        ctx.lineTo(x, y)
    })
    ctx.stroke();
    ctx.moveTo(middleFinger[0][0], middleFinger[0][1]);
    middleFinger.forEach(([x, y]) => {
        ctx.lineTo(x, y)
    })
    ctx.stroke();
    ctx.moveTo(palmBase[0][0], palmBase[0][1]);
    palmBase.forEach(([x, y]) => {
        ctx.lineTo(x, y)
    })
    ctx.stroke();
    ctx.moveTo(pinky[0][0], pinky[0][1]);
    pinky.forEach(([x, y]) => {
        ctx.lineTo(x, y)
    })
    ctx.stroke();
    ctx.moveTo(ringFinger[0][0], ringFinger[0][1]);
    ringFinger.forEach(([x, y]) => {
        ctx.lineTo(x, y)
    })
    ctx.stroke();
    ctx.moveTo(thumb[0][0], thumb[0][1]);
    thumb.forEach(([x, y]) => {
        ctx.lineTo(x, y)
    })
    ctx.stroke();

}
