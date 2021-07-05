
    export function drawHand(videoEl, ctx) {
    return (predictions)=>{
        ctx.drawImage(videoEl, 0, 0);
        if (!predictions || predictions.length == 0 ) return;
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
}
