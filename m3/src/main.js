
var text = ''
var video = document.getElementById('video');

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
  }

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var train = []
var type = []


function arrdistance(arr1, arr2) {
  return arr1.slice().map((n, i) => Math.pow((n - arr2[i]), 2)).reduce((a, b) => a + b, 0);
}



document.getElementById("input_screen").addEventListener("click", function() {
  context.drawImage(video, 0, 0, 30, 30);
  var text_data = context.getImageData(0, 0, 30, 30);
  var test_class = -1;
  var min = 0;
  for (i = 0; i < type.length; i++) {
    console.log(train[i].data)
    var distance = arrdistance(text_data.data, train[i].data);
    if (i == 0) {
      min = distance;
      test_class = type[i]
    }
    else if (distance < min) {
      min = distance
      test_class = type[i]
    }
  }
  switch(test_class) {
    case 0:
      text = text+'&#9749;';
      $('#text_disp').html(text);
      break;
    case 1:
      text = text+'&#9917;';
      $('#text_disp').html(text);
      break;
    case 2:
      text = text+'&#128037;';
      $('#text_disp').html(text);
      break;
    case 3:
      text = text+'&#127759;';
      $('#text_disp').html(text);
      break;
    case 4:
      text = text+'&#9994;';
      $('#text_disp').html(text);
      break;
    default:
      break;
  }
});



document.getElementById("input_screen").addEventListener("keydown", function() {
  context.drawImage(video, 0, 0, 30, 30);
  if (event.key == ' ') {
    //space
    text = text.slice(0, text.lastIndexOf("&"));
    $('#text_disp').html(text);
  }
  else if (event.key == '1') {
    //space
    train.push(context.getImageData(0, 0, 30, 30));
    type.push(0)
  }
  else if (event.key == '2') {
    //up arrow
    train.push(context.getImageData(0, 0, 30, 30));
    type.push(1)
  }
  else if (event.key == '3') {
    //down arrow
    train.push(context.getImageData(0, 0, 30, 30));
    type.push(2)
  }
  else if (event.key == '4'){
    //left arrow
    train.push(context.getImageData(0, 0, 30, 30));
    type.push(3)
  }
  else if (event.key == '5'){
    //right arrow
    train.push(context.getImageData(0, 0, 30, 30));
    type.push(4)
  }

});
