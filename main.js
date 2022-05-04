function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function modelLoaded() {
  console.log("Model is loaded");
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

previous_result = "";

function gotResult(error, result) {
  if (error) {
    console.log(error);
  } else if ((result[0].confidence > 0.5) && (previous_result != result[0].label)) {
    console.log(result);
    previous_result = result[0].label;
    synth = window.speechSynthesis;
    speak_data = "object detected is: " + result[0].label;
    utterance = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterance);
    document.getElementById("result").innerHTML = result[0].label;
    document.getElementById("confidence").innerHTML = Math.floor(result[0].confidence*100) + "%";
  }
}