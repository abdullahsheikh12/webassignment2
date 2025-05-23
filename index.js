const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// In-memory data store for expenses
let expenses = [];
let nextId = 1;

// Helper function to calculate total expenses
const calculateTotalAmount = () => {
  return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
};

// Routes
// Home page - display expenses
app.get('/', (req, res) => {
  res.render('index', { 
    expenses: expenses,
    totalAmount: calculateTotalAmount()
  });
});

// Add a new expense
app.post('/expenses', (req, res) => {
  const { title, amount, date, category, description } = req.body;
  
  const newExpense = {
    id: nextId++,
    title,
    amount: parseFloat(amount),
    date,
    category,
    description: description || '',
    createdAt: new Date()
  };
  
  expenses.push(newExpense);
  res.redirect('/');
});

// Update an expense
app.post('/expenses/update', (req, res) => {
  const { id, title, amount, date, category, description } = req.body;
  const expenseId = parseInt(id);
  
  // Find the expense by ID
  const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);
  
  if (expenseIndex !== -1) {
    // Update the expense properties
    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      title,
      amount: parseFloat(amount),
      date,
      category,
      description: description || '',
      updatedAt: new Date()
    };
  }
  
  res.redirect('/');
});

// Delete an expense
app.post('/expenses/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter(expense => expense.id !== id);
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Expense Tracker app listening at http://localhost:${PORT}`);
});

module.exports = app; // For testing purposes
