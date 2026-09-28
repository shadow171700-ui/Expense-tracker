import React, { useEffect, useState } from "react";
const initialExpense = {
  description: "",
  amount: "",
  category: "",
  date: "",
  type: "expense",
};

const incomeCategories = [
  "Salary",
  "Freelance",
  "Profit",
  "Trading",
  "Bonus",
  "Other Income",
];

const expenseCategories = [
  "Food",
  "Bills",
  "Shopping",
  "Health",
  "Entertainment",
  "Travel",
  "Education",
  "Trading",
  "Other",
];

function ExpenseForm({isEditing,onAdd}) {
  const [expense, setExpense] = useState(() => {
    return initialExpense;
  });

  useEffect(() => {
    if (isEditing) {
      setExpense({
        description: isEditing.description || "",
        amount: isEditing.amount || "",
        category: isEditing.category || "",
        date: isEditing.date || "",
        type: isEditing.type || "expense",
      });
    } else {
      setExpense(initialExpense);
    }
  }, [isEditing]);

  function handleExpense(e) {
    e.preventDefault();
    const normalizedType =
      expense.type === "income" || incomeCategories.includes(expense.category)
        ? "income"
        : "expense";

    const entry = { ...expense, type: normalizedType };

    if(isEditing){
      onAdd(isEditing.id, entry);
    }else{
      onAdd(entry)
    }
    setExpense(initialExpense)
  }

  return (
    <form onSubmit={handleExpense} className="expense-form-box">
      <div className="type-toggle">
        <button
          type="button"
          className={expense.type === "expense" ? "type-btn active" : "type-btn"}
          onClick={() =>
            setExpense({
              ...expense,
              type: "expense",
              category: incomeCategories.includes(expense.category) ? "" : expense.category,
            })
          }
        >
          Expense
        </button>
        <button
          type="button"
          className={expense.type === "income" ? "type-btn active" : "type-btn"}
          onClick={() =>
            setExpense({
              ...expense,
              type: "income",
              category: expenseCategories.includes(expense.category) ? "" : expense.category,
            })
          }
        >
          Income
        </button>
      </div>

      <div className="field-row">
        <div className="field-box">
          <input
            type="text"
            value={expense.description}
            name=""
            placeholder={expense.type === "income" ? "Enter income description" : "Enter expense description (eg. Dinner)"}
            id=""
            required
            onChange={(e) =>
              setExpense({ ...expense, description: e.target.value })
            }
          />
        </div>

        <div className="field-box">
          <input
            required
            type="text"
            value={expense.amount}
            name=""
            placeholder={expense.type === "income" ? "Enter income amount" : "Enter amount of expense"}
            id=""
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field-box select-box">
          <select
            required
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          >
            <option value="">Enter your category</option>
            {(expense.type === "income" ? incomeCategories : expenseCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="field-box date-box">
          <input
            required
            type="date"
            name=""
            value={expense.date}
            placeholder="Enter date of expense"
            id=""
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {isEditing ? "Update expense" : expense.type === "income" ? "Add income" : "Add expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
