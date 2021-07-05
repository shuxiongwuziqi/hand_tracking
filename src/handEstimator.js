import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';

export class HandEstimator{
    constructor(videoEl){
        this.video = videoEl;
        this.model = null;
        this.time = null;
    }
    loadModel(){
        handpose.load().then(model=>{
            console.log("成功载入手部预测模型");
            this.model = model;
        }).catch(err=>{
            console.error(err);
        })
    }
    startEstimate(interval = 100, callbacks = []){
        if(this.model){
            console.log("开始预测")
            clearInterval(this.time);
            this.time = setInterval(() => {
                this.model.estimateHands(this.video).then(result=>{
                    for(const callback of callbacks){
                        callback(result);
                    }
                })
            }, interval);
        }else{
            console.warn("模型未载入");
            setTimeout(() => {
                this.startEstimate(interval, callbacks)
            }, 500);
        }
    }
    stopEstimate(){
        console.log("停止预测");
        clearInterval(this.time);
    }
}
