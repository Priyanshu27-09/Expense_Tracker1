import React, { useState } from 'react';
import SummaryCards from './components/SummaryCards';
import MonthlyExpenseChart from './components/MonthlyExpenseChart';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';


const App = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, amount: -250, date: '2024-07-01', description: 'Groceries', type: 'expense' },
    { id: 2, amount: 3000, date: '2024-07-01', description: 'Salary', type: 'income' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({ amount: '', date: '', description: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const amount = parseFloat(formData.amount);
    const type = amount < 0 ? 'expense' : 'income';

    const newTransaction = {
      id: editingTransaction ? editingTransaction.id : Date.now(),
      amount,
      date: formData.date,
      description: formData.description.trim(),
      type
    };

    if (editingTransaction) {
      setTransactions(transactions.map(t => (t.id === editingTransaction.id ? newTransaction : t)));
    } else {
      setTransactions([...transactions, newTransaction]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ amount: '', date: '', description: '' });
    setErrors({});
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      amount: transaction.amount.toString(),
      date: transaction.date,
      description: transaction.description
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Personal Finance Tracker</h1>
          <p className="text-gray-600">Track your income and expenses with ease</p>
        </div>

        {/* Summary */}
        <SummaryCards transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MonthlyExpenseChart transactions={transactions} />
          <TransactionForm
            showForm={showForm}
            setShowForm={setShowForm}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            errors={errors}
            setErrors={setErrors}
            editingTransaction={editingTransaction}
          />
        </div>

        <TransactionList
          transactions={transactions}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
