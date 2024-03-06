import React, { useRef, useEffect, useState, useCallback } from 'react';
import Toolbar from './Toolbar';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [drawingRectangle, setDrawingRectangle] = useState(false);
  const [drawingCircle, setDrawingCircle] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentMode, setCurrentMode] = useState('pen');
  const [currentPenSize, setCurrentPenSize] = useState(3);
  const [currentEraserSize, setCurrentEraserSize] = useState(10);
  const [currentShape, setCurrentShape] = useState('round');
  const [drawingActions, setDrawingActions] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [fillColor, setFillColor] = useState('#ffffff');
  const [selectedFillColor, setSelectedFillColor] = useState('#ffffff');
  const [rectangleStart, setRectangleStart] = useState({ x: 0, y: 0 });
  const [rectangleEnd, setRectangleEnd] = useState({ x: 0, y: 0 });
  const [circleStart, setCircleStart] = useState({ x: 0, y: 0 });

  const redrawCanvas = useCallback((actions) => {
    if (context) {
      actions.forEach((action) => {
        context.strokeStyle = action.style.color;
        context.lineWidth = action.style.lineWidth;
        context.lineCap = action.style.shape;
        context.lineJoin = action.style.shape === 'round' ? 'round' : 'miter';
        context.beginPath();
        context.moveTo(action.path[0].x, action.path[0].y);
        action.path.forEach((point) => {
          context.lineTo(point.x, point.y);
        });
        context.stroke();
      });
    }
  }, [context]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
    }
  }, []);

  const startDrawing = useCallback(
    (e) => {
      if (context) {
        const { offsetX, offsetY } = e.nativeEvent;
        setDrawing(true);

        if (currentMode === 'rectangle') {
          setDrawingRectangle(true);
          setRectangleStart({ x: offsetX, y: offsetY });
        } else if (currentMode === 'circle') {
          setDrawingCircle(true);
          setCircleStart({ x: offsetX, y: offsetY });
        } else {
          setCurrentPath([{ x: offsetX, y: offsetY }]);
          context.beginPath();
          context.moveTo(offsetX, offsetY);
        }
      }
    },
    [context, currentMode]
  );

  const draw = useCallback(
    (e) => {
      if (drawing) {
        const { offsetX, offsetY } = e.nativeEvent;
  
        if (drawingRectangle) {
          context.clearRect(0, 0, window.innerWidth, window.innerHeight);
          redrawCanvas(drawingActions);
          drawRectangle(offsetX, offsetY);
        } else if (drawingCircle) {
          context.clearRect(0, 0, window.innerWidth, window.innerHeight);
          redrawCanvas(drawingActions);
          drawCircle(offsetX, offsetY);
        } else {
          context.lineTo(offsetX, offsetY);
          context.strokeStyle = currentMode === 'pen' ? currentColor : '#F3F4F6';
          context.lineWidth = currentMode === 'pen' ? currentPenSize : currentEraserSize;
          context.lineCap = currentShape;
          context.lineJoin = currentShape === 'round' ? 'round' : 'miter';
          context.stroke();
          setCurrentPath([...currentPath, { x: offsetX, y: offsetY }]);
        }
      }
    },
    [drawing, drawingRectangle, drawingCircle, context, currentColor, currentMode, currentPenSize, currentEraserSize, currentShape, currentPath, drawingActions, redrawCanvas]
  );
  

  const endDrawing = useCallback(() => {
    if (drawing) {
      if (drawingRectangle) {
        finishDrawingRectangle();
      } else if (drawingCircle) {
        finishDrawingCircle();
      } else {
        context.closePath();
        setDrawing(false);
        if (currentPath.length > 1) {
          // Avoid adding empty paths
          setDrawingActions([
            ...drawingActions,
            {
              path: currentPath,
              style: { color: currentColor, lineWidth: currentMode === 'pen' ? currentPenSize : currentEraserSize, shape: currentShape }
            }
          ]);
        }
        setCurrentPath([]);
      }
    }
  }, [drawing, drawingRectangle, drawingCircle, context, currentColor, currentMode, currentPenSize, currentEraserSize, currentShape, currentPath, drawingActions]);
  
  const drawRectangle = (offsetX, offsetY) => {
    const width = offsetX - rectangleStart.x;
    const height = offsetY - rectangleStart.y;
    redrawCanvas(drawingActions);
    context.strokeStyle = currentColor;
    context.lineWidth = currentMode === 'pen' ? currentPenSize : currentEraserSize;
    context.strokeRect(rectangleStart.x, rectangleStart.y, width, height);
    setRectangleEnd({ x: offsetX, y: offsetY });
  };
  

  const finishDrawingRectangle = () => {
    setDrawingRectangle(false);
  
    const width = rectangleEnd.x - rectangleStart.x;
    const height = rectangleEnd.y - rectangleStart.y;
  
    setDrawingActions([
      ...drawingActions,
      {
        path: [
          { x: rectangleStart.x, y: rectangleStart.y },
          { x: rectangleStart.x + width, y: rectangleStart.y + height },
        ],
        style: {
          color: currentColor,
          lineWidth: currentMode === 'pen' ? currentPenSize : currentEraserSize,
          shape: 'rectangle',
        },
      },
    ]);
  };
  const drawCircle = (offsetX, offsetY) => {
    const radius = Math.sqrt((offsetX - circleStart.x) ** 2 + (offsetY - circleStart.y) ** 2);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    redrawCanvas(drawingActions);
    context.strokeStyle = currentColor;
    context.lineWidth = currentMode === 'pen' ? currentPenSize : currentEraserSize;
    context.beginPath();
    context.arc(circleStart.x, circleStart.y, radius, 0, 2 * Math.PI);
    context.stroke();
    setRectangleEnd({ x: offsetX, y: offsetY });
  };

  const finishDrawingCircle = () => {
    setDrawingCircle(false);
    setDrawingActions([
      ...drawingActions,
      {
        path: [
          { x: circleStart.x, y: circleStart.y },
          { x: rectangleEnd.x, y: rectangleEnd.y },
        ],
        style: { color: currentColor, lineWidth: currentMode === 'pen' ? currentPenSize : currentEraserSize, shape: 'circle' }
      }
    ]);
  };

  const clearCanvas = useCallback(() => {
    if (context) {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      setDrawingActions([]);
    }
  }, [context]);

  const changeColor = useCallback((color) => {
    setCurrentColor(color);
    setFillColor(color);
  }, []);

  const fill = useCallback(() => {
    if (context) {
      context.fillStyle = selectedFillColor;
      context.fill();
    }
  }, [context, selectedFillColor]);

  const switchMode = useCallback(() => {
    setCurrentMode((prevMode) => (prevMode === 'pen' ? 'eraser' : 'pen'));
  }, []);

  const changePenSize = useCallback((size) => {
    setCurrentPenSize(size);
  }, []);

  const changeEraserSize = useCallback((size) => {
    setCurrentEraserSize(size);
  }, []);

  const changeShape = useCallback((shape) => {
    setCurrentShape(shape);
  }, []);

  const undo = useCallback(() => {
    if (drawingActions.length > 0) {
      const updatedActions = [...drawingActions];
      updatedActions.pop();
      setDrawingActions(updatedActions);
      redrawCanvas(updatedActions); // Redraw before clearing the canvas
      clearCanvas();
    }
  }, [drawingActions, clearCanvas, redrawCanvas]);
  

  const downloadCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'whiteboard.png';
      link.click();
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Toolbar
        fill={fill}
        clearCanvas={clearCanvas}
        changeColor={changeColor}
        switchMode={switchMode}
        changePenSize={changePenSize}
        changeEraserSize={changeEraserSize}
        changeShape={changeShape}
        undo={undo}
        downloadCanvas={downloadCanvas}
        selectedFillColor={selectedFillColor}
        setSelectedFillColor={setSelectedFillColor}
        currentColor={currentColor}
        currentMode={currentMode}
        currentPenSize={currentPenSize}
        currentEraserSize={currentEraserSize}
        currentShape={currentShape}
        setCurrentMode={setCurrentMode}
      />
      <canvas
        ref={canvasRef}
        className="flex-grow border"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
      />
    </div>
  );
};

export default Whiteboard;
