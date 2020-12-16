export default class Line {
  constructor(x, y, offset, c, mouse) {
    this.x = x;
    this.y = y;
    this.offset = offset;
    this.radians = 0;
    this.velocity = 0.01;
    this.c = c;
    this.mouse = mouse;
  }

  draw = () => {
    this.c.strokeStyle = "rgba(255, 255, 255, 0.2)";
    this.c.fillStyle = "rgba(255, 255, 255, 0.3)";

    const drawLinePath = (width = 0, color) => {
      this.c.beginPath();
      this.c.moveTo(this.x - width / 2, this.y + width / 2);
      this.c.lineTo(this.x - width / 2 + 300, this.y - width / 2 - 1000);
      this.c.lineTo(this.x + width / 2 + 300, this.y - width / 2 - 1000);
      this.c.lineTo(this.x + width / 2, this.y - width / 2);
      this.c.closePath();
      if (this.c.isPointInPath(this.mouse.x, this.mouse.y) && color) {
        this.c.strokeStyle = color;
      }
    };

    drawLinePath(150, "#baf2ef");
    drawLinePath(50, "#dcf3ff");

    this.c.beginPath();
    this.c.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
    this.c.fill();
    this.c.moveTo(this.x, this.y);
    this.c.lineTo(this.x + 300, this.y - 1000);
    this.c.stroke();
    this.c.closePath();

    this.update();
  };

  update = () => {
    this.radians += this.velocity;
    this.y = this.y + Math.cos(this.radians + this.offset);
  };
}
