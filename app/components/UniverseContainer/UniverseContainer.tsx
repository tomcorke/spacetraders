import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { UniverseContext } from "~/contexts/UniverseContext";
import type { SystemModel } from "~/models/systems";
import { AuthContext } from "~/contexts/AuthContext";

import STYLES from "./UniverseContainer.module.css";

export const UniverseContainer = () => {
  const { token } = useContext(AuthContext);
  const { systemsManager } = useContext(UniverseContext);

  const [systems, setSystems] = useState<SystemModel[]>([]);

  useEffect(() => {
    if (!token) return;
    const update = async () => {
      for await (const systems of systemsManager.fetchAndAddSystems(token)) {
        setSystems(systemsManager.getAllSystems());
      }
    };
    update();
  }, [token, systemsManager]);

  // const systems = useSyncExternalStore(
  //   systemsManager.subscribe,
  //   systemsManager.getAllSystems,
  //   systemsManager.getEmptySystemList
  // );

  const [{ x, y }, setViewXY] = useState({ x: 5, y: -2 });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type DrawOptions = {
      cursor?: { x: number; y: number };
    };

    const draw = ({ cursor }: DrawOptions) => {
      const canvas = ctx.canvas;
      // Reset transform matrix to identity
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // fill with black
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // set zoom to 10x
      const zoom = 20;

      // translate canvas so that the view coordinates x, y are in the center
      const viewLeft = canvas.width / 2;
      const viewTop = canvas.height / 2;
      ctx.translate(viewLeft, viewTop);

      // draw grid that aligns with 0,0 and 10,10, adjusted by zoom factor and view x/y
      const grid = 10;
      ctx.fillStyle = "#333333";
      const cellSize = grid * zoom;
      const offsetX = (x / grid) * cellSize;
      const offsetY = (y / grid) * -cellSize;
      const cellsWide = Math.ceil(canvas.width / cellSize);
      const cellsHigh = Math.ceil(canvas.height / cellSize);
      const startX = -(Math.floor(cellsWide / 2) * cellSize) + offsetX;
      const startY = -(Math.floor(cellsHigh / 2) * cellSize) + offsetY;
      for (let gx = startX; gx <= canvas.width; gx += cellSize) {
        ctx.fillRect(gx, -canvas.height, 1, canvas.height * 2);
      }
      for (let gy = startY; gy <= canvas.height; gy += cellSize) {
        ctx.fillRect(-canvas.width, gy, canvas.width * 2, 1);
      }

      // draw lighter grey "crosshair" 50px in size at center
      ctx.fillStyle = "#555555";
      ctx.fillRect(-25, 0, 50, 1);
      ctx.fillRect(0, -25, 1, 50);
      // set font size to 12
      ctx.font = "12px sans-serif";
      // draw coordinates below
      ctx.fillText(`(${x}, ${y})`, 5, 17);

      // draw systems
      ctx.fillStyle = "white";
      systems.forEach((system) => {
        const { x: sx, y: sy } = system.system;
        const px = (sx - x) * zoom;
        const py = (sy - y) * zoom;
        // draw white circle
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, 2 * Math.PI);
        ctx.fill();
        // set font size to 12
        ctx.font = "12px sans-serif";
        // draw white text for name
        ctx.fillText(system.system.symbol, px + 10, py + 10);
        // draw coordinates below
        ctx.fillText(`(${sx}, ${sy})`, px + 10, py + 22);
      });

      if (cursor) {
        // Draw cursor
        const { x: cx, y: cy } = cursor;
        const px = cx - canvas.width / 2;
        const py = cy - canvas.height / 2;
        const rx = Math.round(px / zoom);
        const ry = Math.round(py / zoom);
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(rx * zoom, ry * zoom, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(`(${rx + x}, ${ry + y})`, rx * zoom + 10, ry * zoom - 12);
      }
    };

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      requestAnimationFrame(() => draw({}));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // const target = e.currentTarget as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      requestAnimationFrame(() =>
        draw({ cursor: { x: e.clientX - rect.left, y: e.clientY - rect.top } })
      );
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [systems, x, y]);

  return (
    <div className={STYLES.UniverseContainer} ref={containerRef}>
      <canvas className={STYLES.UniverseCanvas} ref={canvasRef} />
    </div>
  );
};
