let scribble=[];	
let pen=[];
let storedScribble;
var r,g,b;
var canvas;
var colorPicker1;
var Ref;
function setup(){
  database = firebase.database();

  r = random(255);
  g = random(255);
  b = random(255);

  canvas = createCanvas(1422, 690);
  canvas.mousePressed(startScribbling);
  canvas.mouseReleased(stopScribbling);

  colorPicker1 = createColorPicker('#FF0000');
  colorPicker1.position(5,590);
  colorPicker1.size(100,36);

  saveBtn = createButton('Save');
  saveBtn.position(110,640);
  saveBtn.size(100,51);
  saveBtn.style('background-color', color("#CCCCFF"));
  saveBtn.mousePressed(saveScribble);


  clearBtn = createButton('Clear');
  clearBtn.position(210,640);
  clearBtn.size(100,51);
  clearBtn.style('background-color', color("#CCCCFF"));
  clearBtn.mousePressed(clearScribble);

  Ref = database.ref("canvas/touch");
  
}

function draw(){
  whiteBg();
    blackBg();
    bgChange(); 
    background(r,g,b);

    textSize(26);
    fill("black");
    stroke("white");
    strokeWeight(3);
    textSize(16);
    text("Choose",5,560);
    text("Ink Color:",5,580);

    stroke("white");
    strokeWeight(3);
    textSize(40);
    textFont("Georgia");
    text("THE WORLD IS OUR CANVAS",532,45);

    stroke("white");
    strokeWeight(3);
    textSize(23);
    textFont("Georgia");
    text("You could also choose a",1150,570);
    text("Plain background:",1180,600);
    
    noFill();
    strokeWeight(6);
    stroke(colorPicker1.color());

    if(mouseIsPressed){
      var mouseLocation = {
        x:mouseX,
        y:mouseY
      }
      pen.push(mouseLocation);
    }
    
    for(var i=0; i<scribble.length;i++){
      var scribblePath =scribble[i];
      beginShape();
      for(var point=0;point<scribblePath.length;point++){
        vertex(scribblePath[point].x,scribblePath[point].y);
      }
      endShape();
    }
 
  Ref.on("value",readVal); 
 
  drawSprites();
}

function bgChange(){
  bgButton = createButton("Change Background Color");
  bgButton.mousePressed(function(){
    r = random(255);
    g = random(255);
    b = random(255);
  });
  bgButton.position(3, 640);
  bgButton.size(100);
  bgButton.style('background-color', color("#CCCCFF"));
}

function whiteBg(){
  whiteBgBtn = createButton("");
  whiteBgBtn.mousePressed(function(){
    r = 255;
    g = 255;
    b = 255;
  })
  whiteBgBtn.position(1135,610);
  whiteBgBtn.size(140,80);
  whiteBgBtn.style('background-color', color(255));
}

function blackBg(){
  blackBgBtn = createButton("");
  blackBgBtn.mousePressed(function(){
    r = 0;
    g = 0;
    b = 0;
  })
  blackBgBtn.position(1280,610);
  blackBgBtn.size(140,80);
  blackBgBtn.style('background-color', color(0));
}

function stopScribbling(){
  pen =[];
}

function saveScribble(){
  var scribbleRef = database.ref('savedScribble');
  var info = {
  YourDrawing :scribble
  }
  scribbleRef.push(info);
}

function clearScribble(){
  scribble = [];
}

function startScribbling() {
  pen=[];
  scribble.push(pen);
  database.ref("canvas/touch").set(scribble);
  }

function readVal(data) {
  storedScribble = data.val();
  for (var i = 0; i < storedScribble.length; i++) {
   var storedPath = storedScribble[i];
 
   beginShape();
   for (var p = 0; p < storedPath.length; p++) {
     vertex(storedPath[p].x,storedPath[p].y) ;   
   }
   endShape(); 
 } 
}
