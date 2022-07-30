const fileInput = document.getElementById("input-image");
const img = document.getElementById("img");
let canvas;


function faceEmoji(detecion, displayInfo) {
    canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    const x = detection.box.x / detection.imageDims.width * canvas.width;
    const y = detection.box.y / detection.imageDims.height * canvas.height;
    const emoji = document.getElementById("face-emoji");
    var d = detecion.box.width / detecion.imageDims.width * canvas.width;
    ctx.drawImage(emoji, x, y, d, d);
}

async function faceDetection(image) {
    Promise.all([
        //loads face detection model
        faceapi.nets.tinyFaceDetector.loadFromUri('models/')
    ]).then(async function () {
        // to add: loading animation here

        // adds canvas to <div id="display"></div>
        canvas = faceapi.createCanvasFromMedia(image);
        document.getElementById('display').append(canvas);
        console.log(canvas);

        // gives the dimensions of the image to scan
        const displaySize = {width: image.width, height: image.height};
        faceapi.matchDimensions(canvas, displaySize);

        // runs detection algorithm
        const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions());

        // array of the results
        const displayResults = faceapi.resizeResults(detections, displaySize);

        // selects the canvas context and draws on it
        const ctx = canvas.getContext('2d');
        //draws the image that was scaned
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        // draws the crying laughing emojis
        for (detection of detections) {
            faceEmoji(detection, displayResults);
        }

        // filter(canvas);
    });
}

async function handDetection(image) {
    Promise.all([
        // load PoseNet model
    ]).then(async function () {
        // gives the dimensions of the image to scan
        const displaySize = {width: image.width, height: image.height};

        // runs detection algorithm

        // array of the results

        // selects the canvas context and draws on it
        const ctx = canvas.getContext('2d');
        //draws the image that was scaned
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        // draws the ok emojis
        for (detection of detections) {
            faceEmoji(detection, displayResults);
        }
    });
}

function loadImage() {
    // get rid of old canvas and upload message
    const uploadMessage = document.getElementById("pre-upload-message");
    if (canvas) {
        canvas.outerHTML = "";
    }
    if (uploadMessage) {
        uploadMessage.outerHTML = "";
    }

    const container = document.getElementById("display");
    // only one file will be uploaded
    const file = fileInput.files[0];

    if (fileInput.files.length == 0) {
        // if user did not select a file:
        // will print out message
        let para = document.createElement('p');
        para.innerHTML = "No image was uploaded 😥";
        container.appendChild(para);
    } else {
        // if user selected file:
        // will replace the img tag that faceDetection runs off
        img.src = window.URL.createObjectURL(file);
    }

    // returns img element so function can be used as arg in faceDetection()
    return img;
}

function filter(obj) {
    console.log(obj);
    Caman(obj, function () {
        this.reloadCanvasData();
        this.contrast(500);
        this.saturation(500);
        this.render();
    });
};

function deepfry() {
    let image = loadImage();
    Promise.all([
        faceDetection(image)
        // handDetection(image)
    ]).then(async function () {
        // filter(canvas);
    });
}