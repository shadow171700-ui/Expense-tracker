import { useState } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import useLocalStorage from "./Hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage("expense", []);
  const [editing, setEditing] = useState(null);

  function onAdd(newExpense) {
    setExpense([
      ...expense,
      { ...newExpense, id: crypto.randomUUID(), type: newExpense.type || "expense" },
    ]);
  }
  function onDelete(id) {
    setExpense(expense.filter((e) => e.id !== id));
    console.log(expense);
  }
  function onUpdate(id, updatedExpense) {
    setExpense(
      expense.map((e) =>
        e.id === id
          ? { ...updatedExpense, id, type: updatedExpense.type || e.type || "expense" }
          : e,
      ),
    );
    setEditing(null);
  }
  function startEdit(expense) {
    console.log(expense);
    setEditing(expense);
  }

  return (
    <div className="app-shell">
      <div className="dashboard">
        <Dashboard expense={expense} />
      </div>
      <div className="expense-form">
        <ExpenseForm isEditing={editing} onAdd={editing ? onUpdate : onAdd} />
      </div>
      <div className="expense-list">
        <ExpenseList expenses={expense} onDelete={onDelete} edit={startEdit} />
      </div>
    </div>
  );
}

export default App;
