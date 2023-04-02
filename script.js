const scoreEl = document.getElementById('score');

let debugMode = false;
let mockMode = false;

console.log('FT Online!');

// Called to reset all the variables and set up the page
stopMyVideo();

function startMyVideo() {
    // Setup element show hide states
    hideElement("startVideo");
    showElement("stopVideo");
    showElement("debug");
    // Call helper library to start webcam
    startVideo();
}

function stopMyVideo() {
    // Setup element show hide states
    showElement("startVideo");
    hideElement("stopVideo");
    hideElement("debug");
    // Call helper library to stop webcam
    stopVideo();
    mockMode = false;
}
registerVideoPlay(playMyVideo);

function playMyVideo(){
    console.log("Now playing webcam...");

    // Start Facetracker
    startFT();

    // Draw my face
    drawMyFace();
}

function debugMyApp(){
  debugMode = !debugMode;
  if(!isVideoStarted()){
      console.log("no signal :(");
      mockMode = true;
      console.log("Starting mock mode...");
      drawMyFace();
  }
  if(!debugMode){
    mockMode = false;
  }
}

function drawMyFace(){
    clearCanvas();
    let positions = [];
    if(mockMode){
      positions = mockFacePositions;
    }else{
      positions = getFTPositions();
    }
    setMyFaceScore();
    
    if(positions.length>0){
      drawMyFaceLine(positions);
      drawMyFaceDots(positions);

    }

    if(isVideoStarted() || mockMode){
        setTimeout(drawMyFace, 100);
    }
}

function setMyFaceScore(){
  const score = 0; /*getFTScore();*/
  scoreEl.innerText = Math.round(score);
}

/**
 * Draws the face dots
 * @param positions - array of face positions
 */
function drawMyFaceDots(positions){
  // loop through all dots to draw the face
  for(let i=0;i<positions.length;i++){
    const posX = positions[i][0];
    const posY = positions[i][1];
    drawCircle(posX,posY,'#0000FF');
    if(debugMode){
        // write the dot label on the screen with drawText
    }
  }
}

/**
 * Draws the face line
 * @param positions - array of face positions
 */
function drawMyFaceLine(positions){
  const dots = getFTModelDotConnections()
  while(dots.length>0){
    const dotPosition = dots.pop();
    // connect the dots positions with drawLine
  }
}
