import * as tflayers from '@tensorflow/tfjs-layers'
import * as tf from "@tensorflow/tfjs-core"
import { normalizeData } from './savePoseData';

export async function estimatePose(callback=null){
    const model = await tflayers.loadLayersModel('localstorage://my-model');
    return (predictions)=>{
        if (!predictions || predictions.length == 0) {
            callback(0);
            return;
        }

        const pose = normalizeData(predictions);
        const results = tf.tidy(()=>{
            const inputTensor = tf.tensor2d(pose, [1, 42]);
            const results = model.predict(inputTensor);
            return results.dataSync();
        })
        if(callback) callback(results[0]);
    }
}
