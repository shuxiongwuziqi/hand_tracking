
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
handpose.load()
    .then(model => {
        setInterval(() => {
            model.estimateHands(video)
                .then(predictions => {
                    if (predictions.length > 0) {
                    }
                })
                .catch(err => console.log(err))
        }, 500);
    })
    .catch(err => console.log(err));



