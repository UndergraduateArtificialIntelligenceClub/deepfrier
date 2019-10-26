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
        //loads face detection model
        faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    ]).then(async function () {
        // adds canvas to <div id="display"></div>
        const canvas = faceapi.createCanvasFromMedia(img);
        document.getElementById('display').append(canvas);

        // gives the dimensions of the image to scan
        const displaySize = {width: img.width, height: img.height};
        faceapi.matchDimensions(canvas, displaySize);

        // runs detection algorithm
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());

        // array of the results
        const displayResults = faceapi.resizeResults(detections, displaySize);

        // selects the canvas context and draws on it
        const ctx = canvas.getContext('2d');
        //draws the image that was scaned
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // draws the crying laughing emojis
        drawEmojis(detections, displayResults);
    });
}

faceDetection();