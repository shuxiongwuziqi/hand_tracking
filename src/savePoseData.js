import { saveAs } from 'file-saver';

const data = { train: [] };
export function normalizeData(predictions) {
    const [{ landmarks, boundingBox }] = predictions;
    const width = boundingBox.bottomRight[0] - boundingBox.topLeft[0];
    const height = boundingBox.bottomRight[1] - boundingBox.topLeft[1];
    const pose = []
    landmarks.forEach(([x, y]) => {
        const normalized_x = (x - boundingBox.topLeft[0]) / width;
        const normalized_y = (y - boundingBox.topLeft[0]) / height;
        pose.push(normalized_x, normalized_y);
    })
    return pose;
}
export function collectPoseData(timeout, key) {
    console.log("开始获取数据: " + key);
    let collect = true;

    setTimeout(() => {
        collect = false;
        console.log("停止获取数据: " + key);
    }, timeout);

    return (predictions) => {
        if (!collect || !predictions || predictions.length == 0) return;

        const pose = normalizeData(predictions);

        data.train.push({ x: pose, y: key })
    }
}

export function savePoseData(fielname) {
    console.log("保存数据");
    const content = JSON.stringify(data);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fielname);
    console.log("销毁内存数据");
    data.train = [];
}