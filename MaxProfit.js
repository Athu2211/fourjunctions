import React, { useState } from "react";

const buildings = [
  { type: "T", name: "Theatre", buildTime: 5, revenue: 1500 },
  { type: "P", name: "Pub", buildTime: 4, revenue: 1000 },
  { type: "C", name: "Commercial Park", buildTime: 10, revenue: 3000 },
];

function getMaxProfit(timeLimit) {
  let maxProfit = 0;
  let bestCombos = [];

  for (let t = 0; t <= Math.floor(timeLimit / 5); t++) {
    for (let p = 0; p <= Math.floor(timeLimit / 4); p++) {
      for (let c = 0; c <= Math.floor(timeLimit / 10); c++) {
        const totalBuildTime = t * 5 + p * 4 + c * 10;
        if (totalBuildTime > timeLimit) continue;

        const profit = t * 1500 + p * 1000 + c * 3000;

        if (profit > maxProfit) {
          maxProfit = profit;
          bestCombos = [
            { T: t, P: p, C: c, buildTime: totalBuildTime, earnings: profit },
          ];
        } else if (profit === maxProfit) {
          bestCombos.push({
            T: t,
            P: p,
            C: c,
            buildTime: totalBuildTime,
            earnings: profit,
          });
        }
      }
    }
  }

  return { maxProfit, bestCombos };
}

const MaxProfitCalculator = () => {
  const [time, setTime] = useState(0);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = getMaxProfit(Number(time));
    setResult(res);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Max Profit Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter Time Units"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">Best Combinations</h3>
          {result.bestCombos.map((combo, index) => (
            <div key={index} className="mb-4 p-2 border-b">
              <p>Theatres (T): {combo.T}</p>
              <p>Pubs (P): {combo.P}</p>
              <p>Commercial Parks (C): {combo.C}</p>
              <p>Total Build Time: {combo.buildTime} units</p>
              <p className="font-bold">Earnings: ${combo.earnings}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaxProfitCalculator;
