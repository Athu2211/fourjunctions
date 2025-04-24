import React, { useState } from 'react';
import './WaterTank.css';

const WaterTank = () => {
  const [heights, setHeights] = useState('');
  const [waterUnits, setWaterUnits] = useState(null);

  const trapWater = (arr) => {
    let left = 0,
      right = arr.length - 1,
      leftMax = 0,
      rightMax = 0,
      water = 0;

    while (left < right) {
      if (arr[left] < arr[right]) {
        leftMax = Math.max(leftMax, arr[left]);
        water += leftMax - arr[left];
        left++;
      } else {
        rightMax = Math.max(rightMax, arr[right]);
        water += rightMax - arr[right];
        right--;
      }
    }
    return water;
  };

  const renderBars = (arr) => {
    const maxHeight = Math.max(...arr);
    return arr.map((height, i) => {
      const blocks = [];
      for (let h = 0; h < maxHeight; h++) {
        const isBlock = h < height;
        blocks.push(
          <div key={h} className={`block ${isBlock ? 'bar' : ''}`}></div>
        );
      }
      return (
        <div key={i} className="stack">
          {blocks.reverse()}
        </div>
      );
    });
  };

  const handleVisualize = () => {
    const arr = heights.split(',').map(Number);
    const trapped = trapWater(arr);
    setWaterUnits(trapped);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Water Tank Visualization</h2>
      <input
        type="text"
        placeholder="Enter heights e.g. 3,0,2,0,4"
        value={heights}
        onChange={(e) => setHeights(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleVisualize}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Visualize
      </button>
      <div className="container">{heights && renderBars(heights.split(',').map(Number))}</div>
      {waterUnits !== null && (
        <p className="mt-4 font-semibold">Trapped Water Units: {waterUnits}</p>
      )}
    </div>
  );
};

export default WaterTank;
