export default function Dashboard({ expense = [] }) {
  const totalIncome = expense.reduce(
    (sum, item) => (item.type === "income" ? sum + Number(item.amount || 0) : sum),
    0,
  );

  const totalExpense = expense.reduce(
    (sum, item) => (item.type !== "income" ? sum + Number(item.amount || 0) : sum),
    0,
  );

  const balance = totalIncome - totalExpense;

  const latestExpense = [...expense].reverse().find((item) => item.type !== "income") || null;
  const latestIncome = [...expense].reverse().find((item) => item.type === "income") || null;

  const categoryColors = {
    Food: "#4f46e5",
    Bills: "#22c55e",
    Travel: "#f59e0b",
    Shopping: "#ec4899",
    Other: "#06b6d4",
  };

  const categoryTotals = expense.reduce((acc, item) => {
    if (item.type === "income") return acc;

    const category = item.category || "Other";
    acc[category] = (acc[category] || 0) + Number(item.amount || 0);
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals);
  const chartTotal = chartData.reduce((sum, [, value]) => sum + value, 0) || 1;

  let currentPosition = 0;
  const pieChartGradient = chartData
    .map(([category, value]) => {
      const start = currentPosition;
      const end = currentPosition + (value / chartTotal) * 100;
      currentPosition = end;
      const color = categoryColors[category] || "#94a3b8";
      return `${color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <p>Total Income</p>
          <h3>${totalIncome.toFixed(2)}</h3>
        </div>

        <div className="dashboard-card">
          <p>Total Expense</p>
          <h3>${totalExpense.toFixed(2)}</h3>
        </div>

        <div className="dashboard-card">
          <p>Balance</p>
          <h3>${balance.toFixed(2)}</h3>
        </div>

        <div className="dashboard-card">
          <p>Latest</p>
          <h3>
            {latestExpense
              ? `${latestExpense.description} - $${Number(latestExpense.amount || 0).toFixed(2)}`
              : latestIncome
                ? `${latestIncome.description} - $${Number(latestIncome.amount || 0).toFixed(2)}`
                : "No data"}
          </h3>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="dashboard-chart">
          <div
            className="chart-circle"
            style={{
              background: `conic-gradient(${pieChartGradient || "#e2e8f0 0 100%"})`,
            }}
          />

          <div>
            {chartData.map(([category, value]) => (
              <div key={category} className="chart-legend-item">
                <span
                  className="chart-legend-dot"
                  style={{ background: categoryColors[category] || "#94a3b8" }}
                />
                <span>{category}</span>
                <strong style={{ marginLeft: "auto" }}>${value.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}