// Plotting the animation

var hc = function( p ) {

  let angle = 0;
  let points = [];

  p.setup = function() {
    let size = p.min(p.windowWidth, p.windowHeight);
    p.createCanvas(400, 400, p.WEBGL);
    // p.frameRate(20)

    points[0] = new P4Vector(-1, -1, -1, 1);
    points[1] = new P4Vector(1, -1, -1, 1);
    points[2] = new P4Vector(1, 1, -1, 1);
    points[3] = new P4Vector(-1, 1, -1, 1);
    points[4] = new P4Vector(-1, -1, 1, 1);
    points[5] = new P4Vector(1, -1, 1, 1);
    points[6] = new P4Vector(1, 1, 1, 1);
    points[7] = new P4Vector(-1, 1, 1, 1);
    points[8] = new P4Vector(-1, -1, -1, -1);
    points[9] = new P4Vector(1, -1, -1, -1);
    points[10] = new P4Vector(1, 1, -1, -1);
    points[11] = new P4Vector(-1, 1, -1, -1);
    points[12] = new P4Vector(-1, -1, 1, -1);
    points[13] = new P4Vector(1, -1, 1, -1);
    points[14] = new P4Vector(1, 1, 1, -1);
    points[15] = new P4Vector(-1, 1, 1, -1);
  }

  p.draw = function() {
    p.background(0);
    p.stroke(255);

    p.line(200, -200, 200, 200);
    p.line(-200, -200, -200, 200);
    p.line(-200, -200, 200, -200);
    p.line(-200, 200, 200, 200);

    p.rotateX(-p.PI / 2);
    let projected3d = [];

    for (let i = 0; i < points.length; i++) {
      const v = points[i];
 
      const rotationXY = [
        [p.cos(angle), -p.sin(angle), 0, 0],
        [p.sin(angle), p.cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];

      const rotationZW = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, p.cos(angle), -p.sin(angle)],
        [0, 0, p.sin(angle), p.cos(angle)]
      ];

      let rotated = matmul(rotationXY, v);
      rotated = matmul(rotationZW, rotated);

      let distance = 2;
      let w = 1/(distance - rotated.w) + 0.7;

      const projection = [
        [w, 0, 0, 0],
        [0, w, 0, 0],
        [0, 0, w, 0]
      ];

      let projected = matmul(projection, rotated);
      projected.mult(p.width / 8);
      projected3d[i] = projected;

      p.stroke(255, 200);
      p.strokeWeight(32);
      p.noFill();

      p.point(projected.x, projected.y, projected.z);
    }

    // Connecting
    for (let i = 0; i < 4; i++) {
      connect(0, i, (i + 1) % 4, projected3d);
      connect(0, i + 4, ((i + 1) % 4) + 4, projected3d);
      connect(0, i, i + 4, projected3d);
    }

    for (let i = 0; i < 4; i++) {
      connect(8, i, (i + 1) % 4, projected3d);
      connect(8, i + 4, ((i + 1) % 4) + 4, projected3d);
      connect(8, i, i + 4, projected3d);
    }

    for (let i = 0; i < 8; i++) {
      connect(0, i, i + 8, projected3d);
    }

    //angle = map(mouseX, 0, width, 0, TWO_PI);
   angle += 0.015;
  }

  function connect(offset, i, j, points) {
    p.strokeWeight(4);
    p.stroke(255);
    const a = points[i + offset];
    const b = points[j + offset];
    p.line(a.x, a.y, a.z, b.x, b.y, b.z);
  }

};

// Add canvas into the div
var myp5 = new p5(hc, 'hypercube');
