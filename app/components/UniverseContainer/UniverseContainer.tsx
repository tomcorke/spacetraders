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
      await systemsManager.fetchAndAddSystems(token);
      setSystems(systemsManager.getAllSystems());
    };
    update();
  }, [token]);

  // const systems = useSyncExternalStore(
  //   systemsManager.subscribe,
  //   systemsManager.getAllSystems,
  //   systemsManager.getEmptySystemList
  // );

  const [{ x, y }, setViewXY] = useState({ x: 12, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const canvas = ctx.canvas;
      // Reset transform matrix to identity
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // fill with black
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // set zoom to 10x
      const zoom = 20;

      // translate canvas so that the view coordinates x, y are in the center
      const viewLeft = Math.floor(canvas.width / 2 - (x * zoom) / 2);
      const viewTop = Math.floor(canvas.height / 2 - (y * zoom) / 2);
      ctx.translate(viewLeft, viewTop);

      // draw grid that aligns with 0,0 and 10,10, adjusted by zoom factor and view x/y
      const grid = 10;
      ctx.fillStyle = "#333333";
      const gridWidth = Math.floor(canvas.width / zoom / grid);
      const gridHeight = Math.floor(canvas.height / zoom / grid);
      const top = -canvas.height / 2;
      const left = -canvas.width / 2;
      for (let i = -gridWidth / 2; i <= gridWidth / 2; i++) {
        const gx = i * grid * zoom;
        ctx.fillRect(gx, top, 1, canvas.height);
      }
      for (let i = -gridHeight / 2; i <= gridHeight / 2; i++) {
        const gy = i * grid * zoom;
        ctx.fillRect(left, gy, canvas.width, 1);
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
    },
    [systems]
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      ctx.canvas.height = window.innerHeight;
      ctx.canvas.width = window.innerWidth;
      requestAnimationFrame(() => draw(ctx));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let touchStartX: number | undefined;
    let touchStartY: number | undefined;
    const handleDragStart = (e: MouseEvent) => {
      console.log(e);
      if (e.button !== 0) {
        return;
      }
      touchStartX = e.clientX;
      touchStartY = e.clientY;
    };
    const handleDragMove = (e: MouseEvent) => {
      if (touchStartX === undefined || touchStartY === undefined) return;
      if (e.button !== 0) {
        return;
      }
      const dx = e.clientX - touchStartX;
      const dy = e.clientY - touchStartY;
      touchStartX = e.clientX;
      touchStartY = e.clientY;
      setViewXY(({ x, y }) => ({ x: x - dx / 20, y: y - dy / 20 }));
      requestAnimationFrame(() => draw(ctx));
    };

    canvas?.addEventListener("mousedown", handleDragStart);
    canvas?.addEventListener("mousemove", handleDragMove);

    return () => {
      canvas?.removeEventListener("mousedown", handleDragStart);
      canvas?.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={STYLES.UniverseContainer} ref={containerRef}>
      <canvas className={STYLES.UniverseCanvas} ref={canvasRef} />
    </div>
  );
};
