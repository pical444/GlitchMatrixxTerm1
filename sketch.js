// From live input to ASCII
// Paula Carrascal
// Translaing a live capture to ASCII and modifying
// the brightness of the characters using FFT function
// to change characters brightness


let capture; //to manipulate the video I'm getting
const density = "Ñ@#W$9876543210?!abc;:+=-,._                            "; //string to use as image for video
let asciiDiv;
let fft;
let song;
let song2;
let song3;
let slider;


// Play each song by pressing each button
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
 }

 function toggleSong2(){
  if (song2.isPlaying()) {
    song2.pause();
  } else {
    song2.play();
  }
 }

 function toggleSong3(){
  if (song3.isPlaying()) {
    song3.pause();
  } else {
    song3.play();
  }
 }


 // Load the songs
function preload() {
  song = loadSound('LimitZero.mp3');
  song2 = loadSound('Cujo.mp3');
  song3 = loadSound('Skins.mp3');
}

// Create each button; add the values to catch the FFT; capture the
// live input video 
function setup() {
  noCanvas();
  background(0);
  slider = createSlider(0, 1, 0.5, 0.1);
  button = createButton('Play LimitZero');
  button.mousePressed(toggleSong);
  button2 = createButton('Play Cujo');
  button2.mousePressed(toggleSong2);
  button3 = createButton('Play Skins');
  button3.mousePressed(toggleSong3);

  fft = new p5.FFT(0, 128);
 
  capture = createCapture(VIDEO); //input webcam video
  capture.size(192,96);
  asciiDiv = createDiv();
  
}

// Declare the slider function to work with each song; 
// Start load pixels with the video in order to get the pixel array;
// Declaring a nested for loop for the FFT function to work with the
// values obtained from the pixel array
// Mapping the values of the pixel array average with the FFT function
// for results
// Returning the ASCII image in the console
function draw() {

  song.setVolume(slider.value());
  song2.setVolume(slider.value());
  song3.setVolume(slider.value());

  capture.loadPixels();
  var spectrum = fft.analyze();
  console.log(spectrum);
  let asciiImage = '';
  
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp,0,128,height,0);
    for (j = 0; j < capture.height; j++) {
      for (i = 0; i < capture.width; i++) {
      const pixelIndex = (i + j * capture.width) * 4;
      let r = capture.pixels[pixelIndex + 0];
      let g = capture.pixels[pixelIndex + 1];
      let b = capture.pixels[pixelIndex + 2];
      
      const avg = (r + g + b) / 3;

        asciiDiv.style("color","rgb("+avg+","+140+",0)");

      
     
      const len = density.length;
      const charIndex = floor(map(avg, y, 255, len, 0));
      
      const c = density.charAt(charIndex);
      if (c == ' ') asciiImage += '&nbsp;'
      else asciiImage += c;

}
asciiImage += '<br/>';
    }
    asciiDiv.html(asciiImage);
    
  }

}