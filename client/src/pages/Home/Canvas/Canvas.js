import React, { useState, useEffect, useRef } from "react";
import Line from "./Line";
import "./Canvas.module.css";

export default function InteractiveCanvas() {
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
  const canvasRef = useRef();
  const resizeRef = useRef();

  const handleResize = () => {
    setCanvasWidth(window.innerWidth);
    setCanvasHeight(window.innerHeight);
  };

  let mouse = {
    x: undefined,
    y: undefined
  };
  const lineArray = [];

  useEffect(() => {
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const resize = () => {
      resizeRef.current();
    };
    const onResize = window.addEventListener("resize", resize);
    const onMouseMove = window.addEventListener("mousemove", function(e) {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    for (let i = 0; i < 100; i++) {
      const start = { x: -250, y: 800 };
      const random = Math.random() - 0.5;
      const unit = 25;

      lineArray.push(
        new Line(
          start.x + (unit + random) * i,
          start.y + (i + random) * -3 + Math.sin(i) * unit,
          0.1 + 1 * i,
          ctx,
          mouse
        )
      );
    }
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      lineArray.forEach(line => {
        line.draw();
      });
    }
    animate();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  });

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
}
