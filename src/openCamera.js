
// 打开摄像头
export function openCamera(videoID){
    const video = document.getElementById(videoID);
    if (video && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
    }else{
        throw new Error("something bad happen when open camera");
    }
    return video
}
