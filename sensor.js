class Sensor {
  constructor(car) {
    this.car = car;
    this.rayLength = 100;
    this.rayCount = 5;
    this.raySpread = Math.PI / 2;
    this.rays = [];
    this.readings = [];
  }

  update(roadBoarders, traffic) {
    this.#castRays();
    this.readings = [];
    for (let ray of this.rays) {
      this.readings.push(this.#getReading(ray, roadBoarders, traffic));
    }
  }

  #getReading(ray, roadBoarders) {
    const touches = [];
    for (let boarder of roadBoarders) {
      const touch = getIntersection(ray[0], ray[1], boarder[0], boarder[1]);
      if (touch) {
        touches.push(touch);
      }
    }

    for (var i = 0; i < traffic.length; i++) {
      for (let j = 0; j < traffic[i].polygon.length; j++) {
        const touch = getIntersection(
          ray[0],
          ray[1],
          traffic[i].polygon[j],
          traffic[i].polygon[(j + 1) % traffic[i].polygon.length]
        );
        if (touch) {
          touches.push(touch);
        }
      }
    }

    if (touches.length == 0) {
      return null;
    } else {
      const offsets = touches.map((touch) => touch.offset);
      const minOffset = Math.min(...offsets);
      return touches[offsets.indexOf(minOffset)];
    }
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;
      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - this.rayLength * Math.sin(rayAngle),
        y: this.car.y - this.rayLength * Math.cos(rayAngle),
      };

      this.rays.push([start, end]);
    }
  }

  draw(ctx) {
    ctx.lineWidth = 2;
    for (let i = 0; i < this.rays.length; i++) {
      const end = this.readings[i] ? this.readings[i] : this.rays[i][1];
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
