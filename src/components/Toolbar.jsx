import React from 'react';
import penImage from './image/pen.png';
import eraserImage from './image/eraser.png';
import undoImage from './image/undo-arrow.png';
import downloadImage from './image/download.png';
import cleanImage from './image/clean.png';
import fillImage from './image/fill-color.png';
import lineImage from './image/line.png';
import rectangleImage from './image/icons8-rectangle-96.png';
import circleImage from './image/icons8-circle-50.png';

const Toolbar = ({
    setCurrentMode,
    fill,
    clearCanvas,
    changeColor,
    switchMode,
    changePenSize,
    changeEraserSize,
    changeShape,
    undo,
    downloadCanvas,
    selectedFillColor,
    setSelectedFillColor,
    currentColor,
    currentMode,
    currentPenSize,
    currentEraserSize,
    currentShape,
}) => {
    return (
        <div className="w-full md:w-1/4 lg:w-1/6 xl:w-1/12 bg-gray-200 p-2 flex flex-col items-center">
            <div className="flex space-x-2 mb-2">
                <button
                    className={`flex-1 bg-blue-500 text-white p-1 rounded ${currentMode === 'pen' && 'border'}`}
                    onClick={() => switchMode('pen')}
                >
                    <img src={penImage} alt="Pen" className="w-4 h-4 mr-1" />
                </button>
                <button
                    className={`flex-1 bg-red-500 text-white p-1 rounded ${currentMode === 'eraser' && 'border'}`}
                    onClick={() => switchMode('eraser')}
                >
                    <img src={eraserImage} alt="Eraser" className="w-4 h-4 mr-1" />
                </button>
            </div>
            <div className="flex items-center mb-2">
                <label className="text-sm font-medium text-gray-700 mr-2">Pen Size:</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={currentPenSize}
                    onChange={(e) => changePenSize(parseInt(e.target.value))}
                    className="w-20"
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="text-sm font-medium text-gray-700 mr-2">Eraser Size:</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={currentEraserSize}
                    onChange={(e) => changeEraserSize(parseInt(e.target.value))}
                    className="w-20"
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="text-sm font-medium text-gray-700 mr-2">Shape:</label>
                <select
                    className="w-20 p-1 border rounded text-xs"
                    value={currentShape}
                    onChange={(e) => changeShape(e.target.value)}
                >
                    <option value="round">Round</option>
                    <option value="square">Square</option>
                </select>
            </div>
            <div className="flex space-x-2 mb-2">
                <label className="text-sm font-medium text-gray-700 mr-2">Fill Color:</label>
                <input
                    type="color"
                    value={selectedFillColor}
                    onChange={(e) => setSelectedFillColor(e.target.value)}
                />
            </div>
            <div className="flex space-x-2 mb-2">
                <button className="bg-green-500 text-white p-1 rounded" onClick={undo}>
                    <img src={undoImage} alt="Undo" className="w-4 h-4 mr-1" />
                </button>
                <button className="bg-yellow-500 text-white p-1 rounded" onClick={downloadCanvas}>
                    <img src={downloadImage} alt="Download" className="w-4 h-4 mr-1" />
                </button>
            </div>
            <div className="flex space-x-2 mb-2">
                <button
                    className={`flex-1 bg-purple-500 text-white p-1 rounded ${currentMode === 'fill' && 'border'}`}
                    onClick={() => {
                        setCurrentMode('fill');
                        fill();
                    }}
                >
                    <img src={fillImage} alt="Fill" className="w-4 h-4 mr-1" />
                </button>
                <button
                    className={`flex-1 bg-yellow-500 text-white p-1 rounded ${currentMode === 'line' && 'border'}`}
                    onClick={() => switchMode('line')}
                >
                    <img src={lineImage} alt="Line" className="w-4 h-4 mr-1" />
                </button>
            </div>
            <div className="flex space-x-2 mb-2">
                <button
                    className={`flex-1 bg-pink-500 text-white p-1 rounded ${currentMode === 'rectangle' && 'border'}`}
                    onClick={() => {
                        setCurrentMode('rectangle');
                    }}
                >
                    <img src={rectangleImage} alt="Rectangle" className="w-4 h-4 mr-1" />
                </button>
                <button
                    className={`flex-1 bg-indigo-500 text-white p-1 rounded ${currentMode === 'circle' && 'border'}`}
                    onClick={() => {
                        setCurrentMode('circle');
                    }}
                >
                    <img src={circleImage} alt="Circle" className="w-4 h-4 mr-1" />
                </button>
            </div>
            <div>
                <button className="bg-red-500 text-white p-1 rounded" onClick={clearCanvas}>
                    <img src={cleanImage} alt="Clean" className="w-4 h-4 mr-1" />
                </button>
            </div>
            {/* Add other buttons as needed */}
        </div>
    );
};

export default Toolbar;
