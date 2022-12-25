const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");
carCanvas.width = 200;
networkCanvas.width = 400;
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = Math.round(
  lerp(50, 1000, parseInt(window.location.search.split("=")[1] || "1") / 100)
);
console.log(N, N, N);
const cars = generateCars(N);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    }
  }
}

const traffic = [
  new Car(road.getLaneCenter(2), 0, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -100, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -400, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -600, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -600, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -800, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -800, 30, 80, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -1080, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -1400, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -1400, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -1800, 36, 86, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -2000, 30, 80, "DUMMY", 1.8, getRandomColor()),
  new Car(road.getLaneCenter(1), -2400, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -2800, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -2900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -3400, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -3900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -4156, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -4356, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -4356, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -4600, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -4650, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -5500, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -5900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -5900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -6200, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -6000, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -8900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -9200, 30, 50, "DUMMY", 3.1, getRandomColor()),
  new Car(road.getLaneCenter(2), -9250, 30, 50, "DUMMY", 3.1, getRandomColor()),
  new Car(road.getLaneCenter(2), -9500, 30, 50, "DUMMY", 3.1, getRandomColor()),
  new Car(road.getLaneCenter(0), -10000, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -10000, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -10130, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -10130, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -10600, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -10600, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -10790, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -10800, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -11000, 35, 85, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -11100, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -11100, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(
    road.getLaneCenter(1),
    -15000,
    35,
    80,
    "DUMMY",
    1.8,
    getRandomColor()
  ),
  new Car(road.getLaneCenter(1), -20800, 30, 80, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -30000, 30, 80, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -41000, 30, 80, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -45000, 30, 80, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -45000, 30, 80, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -58000, 30, 80, "DUMMY", 2, getRandomColor()),
  new Car(
    road.getLaneCenter(0),
    -83700,
    30,
    80,
    "DUMMY",
    1.8,
    getRandomColor()
  ),
  new Car(
    road.getLaneCenter(1),
    -85000,
    35,
    80,
    "DUMMY",
    1.8,
    getRandomColor()
  ),
  new Car(road.getLaneCenter(2), -99900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -99900, 30, 50, "DUMMY", 2, getRandomColor()),
  new Car(
    road.getLaneCenter(1),
    -100900,
    30,
    50,
    "DUMMY",
    2.3,
    getRandomColor()
  ),
  new Car(
    road.getLaneCenter(1),
    -151000,
    30,
    80,
    "DUMMY",
    1.8,
    getRandomColor()
  ),
  new Car(
    road.getLaneCenter(1),
    -157000,
    30,
    80,
    "DUMMY",
    1.8,
    getRandomColor()
  ),
];

animate();

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}

function reload() {
  window.location.reload();
}

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 3, "blue"));
  }
  return cars;
}

function animate(time) {
  for (var i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }
  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.8);
  for (var i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  road.draw(carCtx);
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);
  carCtx.restore();
  networkCtx.lineDashOffset = -time / 100;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}
