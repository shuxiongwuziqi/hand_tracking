// import css
import './styles/index.css'
import './styles/reset.css'

// test
// import * as tflayers from '@tensorflow/tfjs-layers'
// const model = tflayers.loadLayersModel('localstorage://my-model').then(model=> console.log(model));

// add tensorflow backend
import '@tensorflow/tfjs-backend-webgl';
import {trainHandPose} from "./trainHandPose"
import { openCamera } from './openCamera'
import { HandEstimator } from './handEstimator';
import { drawHand } from './drawHand';
import { draw3DHand } from './draw3DHand';
import { savePoseData, collectPoseData } from './savePoseData';
import { estimatePose } from './estimatePose';

const video = openCamera("videoElement");
const canvas = document.getElementById("draw_hand");
const ctx = canvas.getContext("2d");

document.getElementById("files").onchange = trainHandPose;

video.onloadeddata = () => {
    const handEstimator = new HandEstimator(video);
    const callbacks = [draw3DHand, drawHand(video, ctx)];
    handEstimator.loadModel()

    document.getElementById('stopEstimate').onclick = () => {
        handEstimator.stopEstimate.call(handEstimator);
    }


    document.getElementById('startEstimate').onclick = () => {
        canvas.style = "display: block;";
        handEstimator.startEstimate.call(handEstimator, 100, callbacks);
    }
    
    document.getElementById('startEstimatePose').onclick = async ()=>{
        const result = document.getElementById('result');
        const poseCallback = (res)=>{
            if(res < -0.8) {
                result.innerText = "左边";
            }
            else if(res > 0.8) result.innerText = "右边";
            else{
                result.innerText = "无";
            }
        };
        callbacks.push(await estimatePose(poseCallback));
        handEstimator.startEstimate.call(handEstimator, 100, callbacks);
    }

    document.body.onkeydown = (e) => {
        if (e.key === "a" || e.key === "d") {
            canvas.style = "display: block;";
            callbacks.push(collectPoseData(5000, e.key));
            handEstimator.startEstimate.call(handEstimator, 100, callbacks);
        }else if (e.key === "s"){
            savePoseData(`${Date.now()}.json`);
        }
    }

};





