import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyExpenseChart = ({ transactions }) => {
  const getMonthlyExpenses = () => {
    const monthlyData = {};

    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        const date = new Date(transaction.date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = { month: monthName, expenses: 0 };
        }
        monthlyData[monthYear].expenses += Math.abs(transaction.amount);
      }
    });

    return Object.values(monthlyData);
  };

  const monthlyExpenses = getMonthlyExpenses();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Expenses</h2>
      {monthlyExpenses.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-300 flex items-center justify-center text-gray-500">
          <p>No expense data available</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpenseChart;
