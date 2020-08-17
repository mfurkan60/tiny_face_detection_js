let video = document.getElementById("video");
let animate = "";


Promise.all([  //these files are working  async!
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models")
]);




//start the video 
function startCamera() {
  navigator.getUserMedia(
    {
      video: {}
    },
    stream => (this.video.srcObject = stream),
    err => console.log(err)
  );
}


//startCamera()

 function oncamera(){
 
     
   animate =  setTimeout(startCamera(),100)    
 
 }
function offcamera(){
    
    
// there are some errors
    clearTimeout(animate);

}
// Starting faceapi 
video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const boxsize = {
    width: video.width,
    height: video.height
  };


  //coputing of face and cameras.
  faceapi.matchDimensions(canvas,boxsize);
    setInterval( async () =>{ 
       

 
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
      
          
        canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height); //clear canvas
        const resizesize = faceapi.resizeResults(detections, boxsize);
          //draw the canvas
          faceapi.draw.drawDetections(canvas, resizesize );


      }, 100);
    
    
})









