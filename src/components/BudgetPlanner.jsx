import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const initialExpenses = {
  flights: 0,
  hotels: 0,
  food: 0,
  transport: 0,
  activities: 0,
  shopping: 0,
  other: 0
};

function BudgetPlanner() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = Object.values(expenses).reduce((acc, curr) => acc + Number(curr), 0);
    setTotal(sum);
  }, [expenses]);

  const handleExpenseChange = (category, value) => {
    setExpenses(prev => ({
      ...prev,
      [category]: value || 0
    }));
  };

  const chartData = {
    labels: Object.keys(expenses).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        data: Object.values(expenses),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Trip Budget Planner</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {Object.keys(expenses).map((category) => (
            <div key={category} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={expenses[category]}
                  onChange={(e) => handleExpenseChange(category, e.target.value)}
                  className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Total Budget</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ₹{total.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <Pie data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlanner; 