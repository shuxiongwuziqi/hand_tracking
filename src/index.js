// import css
import './styles/index.css'
import './styles/reset.css'

// import javascript
import {openCamera} from './openCamera'
// import './drawHand'
import { HandEstimator } from './handEstimator';
import { drawHand } from './drawHand';
import { draw3DHand } from './draw3DHand';

const video = openCamera("videoElement");
const canvas = document.getElementById("draw_hand");
const ctx = canvas.getContext("2d");

const handEstimator = new HandEstimator(video);
const callbacks = [draw3DHand, drawHand(video, ctx)];
handEstimator.loadModel()
handEstimator.startEstimate(100, callbacks);

document.getElementById('stopEstimate').onclick =()=>{
    handEstimator.stopEstimate.call(handEstimator);
} 


document.getElementById('startEstimate').onclick =()=>{
    handEstimator.startEstimate.call(handEstimator, 100, callbacks);
}