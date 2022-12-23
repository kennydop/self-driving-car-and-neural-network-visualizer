const canvas = document.getElementById("canvas");
canvas.width = 200;
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 200, 30, 50, "KEYS");
const traffic = [
  new Car(road.getLaneCenter(0), 200, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(2), 300, 30, 50, "DUMMY", 2),
  new Car(road.getLaneCenter(1), 100, 30, 50, "DUMMY", 2),
];

animate();

function animate() {
  for (var i = 0; i < traffic.length; i++) {
    traffic[i].update(road.boarders, []);
  }
  car.update(road.boarders, traffic);
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.8);
  for (var i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "red");
  }
  road.draw(ctx);
  car.draw(ctx, "blue");
  ctx.restore();
  requestAnimationFrame(animate);
}
