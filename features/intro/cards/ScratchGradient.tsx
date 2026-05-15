"use client";

import Card from "@/ui/Card";
import Gradient from "@/images/gradient.svg";
import { useEffect, useRef, useState } from "react";

const REVEAL_TEXT = "Scroll to discover";
const REVEAL_FONT_SIZE = 14;
const REVEAL_BRUSH_RADIUS = 50;

const Canvas = ({
  dimension,
}: {
  dimension: { width: number; height: number };
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const maskCanvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    dimension.width > 0 && init();
  }, [dimension]);

  const init = () => {
    const main = canvas.current;
    if (!main) return;

    if (!maskCanvas.current) {
      maskCanvas.current = document.createElement("canvas");
    }

    const mask = maskCanvas.current;
    const ctx = main.getContext("2d");
    const maskCtx = mask.getContext("2d");

    if (!ctx || !maskCtx) return;

    mask.width = dimension.width;
    mask.height = dimension.height;

    maskCtx.clearRect(0, 0, dimension.width, dimension.height);

    render(ctx, mask);
  };

  const render = (ctx: CanvasRenderingContext2D, mask: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, dimension.width, dimension.height);

    // Draw painted circles from the mask.
    ctx.drawImage(mask, 0, 0);

    // Render text only inside painted areas.
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    drawRevealText(ctx);
    ctx.restore();
  };

  const drawRevealText = (ctx: CanvasRenderingContext2D) => {
    const chakraFamily = getComputedStyle(document.body)
      .getPropertyValue("--font-chakra")
      .trim();
    const fontFamily = chakraFamily || "sans-serif";

    ctx.fillStyle = "white";
    ctx.font = `500 ${REVEAL_FONT_SIZE}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(REVEAL_TEXT, dimension.width / 2, dimension.height / 2);
  };

  const manageMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draw(x, y, REVEAL_BRUSH_RADIUS);
  };

  const draw = (x: number, y: number, radius: number) => {
    const main = canvas.current;
    const mask = maskCanvas.current;
    if (!main || !mask) return;

    const ctx = main.getContext("2d");
    const maskCtx = mask.getContext("2d");

    if (!ctx || !maskCtx) return;

    // Build up paint on the offscreen mask.
    maskCtx.fillStyle = "#181818";
    maskCtx.beginPath();
    maskCtx.arc(x, y, radius, 0, 2 * Math.PI);
    maskCtx.fill();

    // Re-render from clean state to avoid stacked text distortion.
    render(ctx, mask);
  };

  return (
    <div className="absolute inset-0 z-2 h-full w-full">
      <canvas
        className="size-full"
        ref={canvas}
        onMouseMove={manageMouseMove}
        height={dimension.height}
        width={dimension.width}
      />
    </div>
  );
};

const ScratchGradient = () => {
  const card = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const resize = () => {
    setDimension({
      width: card.current?.offsetWidth || 0,
      height: card.current?.offsetHeight || 0,
    });
  };

  useEffect(() => {
    resize();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <Card
      className="border-muted/10 col-span-2 row-span-6 hidden overflow-hidden 2xl:block"
      ref={card}
    >
      <Gradient className="pointer-events-none absolute aspect-550/825 h-auto w-full select-none" />
      <Canvas dimension={dimension} />
    </Card>
  );
};

export default ScratchGradient;
