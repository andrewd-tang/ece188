//
//
//

var ISKETCH = ISKETCH || {}

$(document).ready(() => {
    //
    //  TIP: how you print information
    //
    console.log('Welcome to iSketch!')

    // initialize the canvas
    $('#cvsMain')[0].width = 256;
    $('#cvsMain')[0].height = 256;
    $('#cvsMain').css('background-color', '#eeeeee');
    ISKETCH.context = $('#cvsMain')[0].getContext('2d');


    // add input event handlers
    $('#cvsMain').on('mousedown', ISKETCH.canvasMouseDown);
    $('#cvsMain').on('mousemove', ISKETCH.canvasMouseMove);
    $('#cvsMain').on('mouseup', ISKETCH.canvasMouseUp);
})

//
//
//
ISKETCH.canvasMouseDown = function (e) {
    ISKETCH.context.strokeStyle = "#df4b26";
    ISKETCH.context.lineJoin = "round";
    ISKETCH.context.lineWidth = 4;

    ISKETCH.context.clearRect(0, 0, $('#cvsMain').width(), $('#cvsMain').height());
    ISKETCH.context.beginPath();

    let rect = $('#cvsMain')[0].getBoundingClientRect();
    let x = e.clientX - rect.left, y = e.clientY - rect.top
    ISKETCH.context.moveTo(x, y);
    ISKETCH.context.stroke();
    ISKETCH.isDragging = true;
    ISKETCH.coords = []
    ISKETCH.coords.push({x: x, y: y})

}

//
//
//
ISKETCH.canvasMouseMove = function (e) {
    if (!ISKETCH.isDragging) return;

    let rect = $('#cvsMain')[0].getBoundingClientRect();
    let x = e.clientX - rect.left, y = e.clientY - rect.top
    ISKETCH.context.lineTo(x, y);
    ISKETCH.context.moveTo(x, y);
    ISKETCH.context.stroke();
    ISKETCH.coords.push({x: x, y: y})
}

function pDistance(a, b, c) {

  var A = a.x - b.x;
  var B = a.y - b.y;
  var C = c.x - b.x;
  var D = c.y - b.y;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
      param = dot / len_sq;

  var xx, yy;

  if (param < 0) {
    xx = b.x;
    yy = b.y;
  }
  else if (param > 1) {
    xx = c.x;
    yy = c.y;
  }
  else {
    xx = b.x + param * C;
    yy = b.y + param * D;
  }

  var dx = a.x - xx;
  var dy = a.y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}


function rdp(array, epsilon) {
  var dmax = 0;
  var index = 0;
  var end = array.length;
  for (i = 1; i < end-1; i++) {
    var d = pDistance(array[i], array[0], array[end-1]);
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }

  let t_points = [];

  if (dmax > epsilon) {
    let t_points1 = rdp(array.slice(0,index), epsilon);
    let t_points2 = rdp(array.slice(index, end), epsilon);

    t_points = t_points1.concat(t_points2.slice(1, end));
  }
  else {
    t_points = [array[0], array[end-1]]
  }

  return t_points;
}

function drawline(array) {

}


//
//
//
ISKETCH.canvasMouseUp = function (e) {
    ISKETCH.isDragging = false;
    ISKETCH.context.closePath();

    let t_points = rdp(ISKETCH.coords, 5);
    console.log(t_points)
    ISKETCH.context.strokeStyle = "#4b0082";
    ISKETCH.context.lineJoin = "round";
    ISKETCH.context.lineWidth = 2;
    ISKETCH.context.beginPath();
    ISKETCH.context.moveTo(t_points[0].x, t_points[0].y);
    ISKETCH.context.stroke();
    for (i = 1; i < t_points.length; i++) {
      ISKETCH.context.lineTo(t_points[i].x, t_points[i].y);
      ISKETCH.context.moveTo(t_points[i].x, t_points[i].y);
      ISKETCH.context.stroke();

    }

    if ((t_points[0].x - t_points[1].x)*(t_points[0].x - t_points[1].x) +
    (t_points[0].y - t_points[1].y)*(t_points[0].y - t_points[1].y) < 10)  {
      text = text.slice(0, text.lastIndexOf("&"));
      $('#text_disp').html(text);
    }
    else {
      switch(t_points.length - 2) {
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
        default:
          text = text+'&#9994;';
          $('#text_disp').html(text);
          break;
      }
    }

}
