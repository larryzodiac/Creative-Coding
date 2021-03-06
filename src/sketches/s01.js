/*
  Evan MacHale - N00150552
  01.04.19
  00.js
*/

const id = 's01';
let elw;
let canvas_height;
let canvas;
let c1, c2, colour;
const numLines = 30;

// The seed that will spawn our p5 sketch.
const s01 = (p) => {

  p.setup = () => {
    elw = document.getElementById(id).offsetWidth;
    elw < 768 ? canvas_height = elw * 2 : canvas_height = elw;
    canvas = p.createCanvas(elw,canvas_height);
    canvas.parent(id);
    p.colorMode(p.RGB);
    c1 = p.color('#f093fb');
    c2 = p.color('#f5576c');
  }

  p.draw = () => {
    p.frameRate(30);
    p.scale(0.5);
    p.translate(p.width/2, p.height/2);
    p.background(255);
    
    // Draw multiple lines.
    for (let i = 0; i < numLines; i++) {
      
      // Interpolation.
      let amount = p.map(i, 0, numLines-1, 0, 1);
      colour = p.lerpColor(c1, c2, amount);
      p.stroke(colour);
      p.strokeWeight(i/5);
      
      // Setup co-ordinates.
      let x1 = p.x1(p.frameCount + i);
      let y1 = p.y1(p.frameCount + i);
      let x2 = p.x2(p.frameCount + i);
      let y2 = p.y2(p.frameCount + i);
      
      // lines.
      p.line(x1, y1, x2, y2);
    };
  }
  
  p.x1 = (i) => {
    return p.map(Math.sin(i/10),-1,1,0,p.width);
  }

  p.y1 = (i) => {
    return p.map(Math.sin(i/20),-1,1,0,p.height);
  }

  p.x2 = (i) => {
    return p.map(Math.sin(i/30),-1,1,0,p.width);
  }

  p.y2 = (i) => {
    return p.map(Math.sin(i/50),-1,1,0,p.height);
  }
  
  p.windowResized = () => {
    elw = document.getElementById(id).offsetWidth;
    elw < 768 ? canvas_height = elw * 2 : canvas_height = elw;
    p.resizeCanvas(elw, canvas_height);
  }

}

export default s01;