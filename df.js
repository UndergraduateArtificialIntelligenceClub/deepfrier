// const img = document.getElementById("input_image");
const img = document.getElementById("img");

function filter() {
    Caman('#test', function () {
        this.contrast(75);
        this.saturation(75);
        this.render();
    });
};

async function faceDetection() {
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    ]).then(async function () {
        const canvas = faceapi.createCanvasFromMedia(img);
        document.getElementById('display').append(canvas);
        const displaySize = {width: img.width, height: img.height};
        faceapi.matchDimensions(canvas, displaySize);
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
        console.log(detections);
        const displayResults = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, displayResults);
    });
}

faceDetection();