let sketch = function(p) {
  let THE_SEED;

  p.setup = function() {
    p.createCanvas(1000, 1000);
    THE_SEED = p.floor(p.random(9999999));
    p.randomSeed(THE_SEED);
    p.noLoop();
    p.stroke(0);
    p.noFill();
    p.background(255);
  };

  p.draw = function() {
    for (let i = 0; i < 700; i++) {
      if (p.random() > 0.98) p.stroke('#f00');
      p.beginShape();
      for (let j = 0; j < 400; j++) {
        let altitude = calculate_altitude(j, i + j, 0.4);
        p.vertex(j * 4, j * 4 + i * 4 - altitude * 600 - 800);
      }
      p.endShape();

      p.beginShape();
      for (let j = 0; j < 400; j++) {
        let altitude = calculate_altitude(j, i + j, 0.4);
        p.vertex(1 + j * 4, 2 + j * 4 + i * 4 - altitude * 600 - 800);
      }
      p.endShape();
      p.stroke(0);
    }
  };

  function calculate_altitude(x, y, max) {
    let alt = 0;
    alt += p.noise(x * 0.005, y * 0.005);
    alt += 0.1 * p.noise(x * 0.01, y * 0.01);
    alt += 0.02 * p.noise(x * 0.1, y * 0.1);
    return p.max(max, alt);
  }

  p.keyPressed = function() {
    if (p.keyCode === 80) p.saveCanvas('sketch_' + THE_SEED, 'jpeg');
  };
};
new p5(sketch);
