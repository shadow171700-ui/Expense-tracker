import { useMemo, useState } from "react";

function ExpenseList({ expenses, edit, onDelete }) {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const categories = ["All", ...new Set(expenses.map((e) => e.category || "Other"))];

  const filteredExpenses = useMemo(() => {
    const result = expenses.filter((e) => {
      const matchesSearch = e.description
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory = category === "All" || (e.category || "Other") === category;

      return matchesSearch && matchesCategory;
    });

    return result.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      return Number(b.amount) - Number(a.amount);
    });
  }, [expenses, searchText, category, sortBy]);

  return (
    <div className="expense-list-wrapper">
      <div className="expense-toolbar">
        <div className="search-box">
          <span className="toolbar-icon">⌕</span>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search expenses..."
            className="toolbar-input"
          />
        </div>

        <div className="filter-box">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="toolbar-select"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-box">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="toolbar-select"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      <h2 className="list-title">Recent Expenses ({filteredExpenses.length})</h2>

      {filteredExpenses.length > 0 ? (
        <ul className="expense-list-ul">
          {filteredExpenses.map((e) => {
            const categoryClass = (e.category || "Other").toLowerCase();
            const isIncome = e.type === "income";
            const amountText = `${isIncome ? "+" : "-"}₹${Number(e.amount || 0).toFixed(2)}`;
            return (
              <li key={e.id} className="expense-row">
                <div className="expense-main">
                  <div className="expense-name">{e.description}</div>
                  <div className="expense-date">{e.date}</div>
                </div>

                <span className={`expense-tag ${categoryClass}`}>{e.category || "Other"}</span>
                <div className={`expense-amount ${isIncome ? "income-amount" : "expense-amount"}`}>
                  {amountText}
                </div>

                <div className="expense-item-actions">
                  <button className="edit-btn" onClick={() => edit(e)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(e.id)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="empty-message">No Expense Founded!</p>
      )}
    </div>
  );
}

export default ExpenseList