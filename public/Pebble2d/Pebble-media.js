class PebbleMedia {}

PebbleMedia.Webcam = function(width = 100, height = 100, style = "margin: 0px auto;border: 1px dashed black;width: 200px;height: 200px;background: # 666;") {
    let video = document.createElement("video");
    video.setAttribute("style", style);
    video.width = width;
    video.height = height;

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => video.srcObject = stream)
            .catch(error => console.log(error));
    }

    let obj = {};
    Object.defineProperty(obj, "video", {
        value: video,
        writable: false,
        enumerable: true,
        configurable: true,
    });
    obj.Stop = function(o) {

    }

    document.appendChild(obj.video);
    return obj;
}