// const img = document.getElementById("input_image");
const img = document.getElementById("img");

function filter() {
    Caman('#test', function () {
        this.contrast(75);
        this.saturation(75);
        this.render();
    });
};

function faceEmoji(detecion, displayInfo) {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    const x = detection.box.x / detection.imageDims.width * canvas.width;
    const y = detection.box.y / detection.imageDims.height * canvas.height;
    const emoji = document.getElementById("face-emoji");
    var d = detecion.box.width / detecion.imageDims.width * canvas.width;
    ctx.drawImage(emoji, x, y, d, d);
}

function drawEmojis(detections, displayInfo) {
    for (detection of detections) {
        faceEmoji(detection, displayInfo);
    }
}

async function faceDetection() {
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    ]).then(async function () {
        const canvas = faceapi.createCanvasFromMedia(img);
        document.getElementById('display').append(canvas);
        const displaySize = {width: img.width, height: img.height};
        faceapi.matchDimensions(canvas, displaySize);
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
        d = detections;
        const displayResults = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // faceapi.draw.drawDetections(canvas, displayResults);
        drawEmojis(detections, displayResults);
        console.table(detections)
    });
}

faceDetection();