import React from 'react';
import { Edit2, Trash2, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const TransactionList = ({ transactions, handleEdit, handleDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-8 w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.length > 0 ? (
          transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start md:items-center gap-5">
                  <div
                    className={`p-3 rounded-full ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-3 mt-3 md:mt-0">
                  <span
                    className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </span>
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No transactions yet. Add your first transaction to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
