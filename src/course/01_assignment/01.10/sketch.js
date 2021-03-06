// ------------------------------------------------- //
// 29/11/2018
// Evan MacHale - N00150552
// Continuous Assessment 01.
// Generative Design Colour Experiment.
// Final - Trying to get the right look - Parbolas.
// Very little change -> only to functions.
// ------------------------------------------------- //
`use strict`;

let time = 0; // Parametric variable.

const numLines = 20; // Number of lines to draw.
const offset = 100; // Page offset
let c1, c2, colour; // Gradient c1 -> c2 + Interpolated colour
let font; //Imported font.

// The seed that will spawn our p5 sketch.
const seed = (sketch) => {

  sketch.preload = () => font = sketch.loadFont('../../assets/IBMPlexSans-Bold.otf');

  sketch.setup = () => {
    // Canvas A4.
    const canvas = sketch.createCanvas(1240,1748);
    sketch.background(0);
    // RGB is better for web gradients.
    sketch.colorMode(sketch.HSB);
    // Dertermined gradient.
    sketch.shakeColors();
    sketch.strokeCap(sketch.SQUARE);
    // Style
    sketch.textFont(font);
    sketch.textSize(200);
  }

  sketch.draw = () => {

    sketch.frameRate(20);
    sketch.background(0);

    // Draw multiple lines.
    sketch.push();
    sketch.translate(sketch.width/2,sketch.height/2);
    // sketch.rotate(time/50);
    for (let i = 0; i < numLines; i++) {

      // Interpolation.
      let amount = sketch.map(i, 0, numLines-1, 0, 1);
      colour = sketch.lerpColor(c1, c2, amount);
      sketch.stroke(colour);
      sketch.strokeWeight(i/1);

      // Setup co-ordinates.
      let x1 = sketch.x1(time + i);
      let y1 = sketch.y1(time + i);
      let x2 = sketch.x2(time + i);
      let y2 = sketch.y2(time + i);
      let x3 = sketch.x1(time + i/2);
      let y3 = sketch.y1(time + i/2);
      let x4 = sketch.x2(time + i/2);
      let y4 = sketch.y2(time + i/2);

      // Connecting grid movements.
      sketch.line(x1, y1, x2, y2);
      sketch.line(x2, y2, x3, y3);
      sketch.line(x3, y3, x4, y4);
      sketch.line(-x1, -y1, -x2, -y2);
      sketch.line(-x2, -y2, -x3, -y3);
      sketch.line(-x3, -y3, -x4, -y4);

      // Wowee iterator.
      // time += Math.PI/100;
    };
    time += 0.5;
    sketch.pop();

    // Draw text
    sketch.title(sketch.width/5,sketch.height/3);
  }

  // Experimentation for stills.
  sketch.x1 = (t) => sketch.map(Math.tan(t/100), 0, 1, offset, sketch.width-offset)
  sketch.y1 = (t) => sketch.map(Math.tan(t/50), 0, 1, offset, sketch.height-offset)
  sketch.x2 = (t) => sketch.map(Math.cos(t/10), 0, 1, offset, sketch.width-offset)
  sketch.y2 = (t) => sketch.map(Math.cos(t/20), 0, 1, offset, sketch.height-offset)

  // Type draw.
  sketch.title = (x,y) => {
    sketch.noStroke();
    sketch.fill(60,100,100);
    sketch.text('Genera-', x, y);
    sketch.text('tive', x, y + 190);
    sketch.text('Gestal-', x, y + 380);
    sketch.text('tung', x, y + 570);
  }

  // Experimentation for stills.
  sketch.shakeColors = () => {
    // c1 = sketch.color(sketch.random(200, 255),sketch.random(0, 100), 100);
    // c2 = sketch.color(sketch.random(100, 255), 100, sketch.random(0, 100));
    c1 = sketch.color('hsb(230, 10%, 100%)');
    c2 = sketch.color('hsb(230, 100%, 100%)');
  }

  // Mouse click colour change.
  sketch.mouseReleased = () => sketch.shakeColors();

  // Saving meaningful parametre data.
  sketch.keyReleased = () => {
    if (sketch.key == 's' || sketch.key == 'S') sketch.saveCanvas(gd.timestamp() + '_Colour1:_' + c1 + '_Colour2:_' + c2, 'png');
  }

}

// Create p5 instance w/ new p5 constructor + specify parent for elements.
// Learnt from Hartmut <3.
const myp5 = new p5(seed,`canvas`);
