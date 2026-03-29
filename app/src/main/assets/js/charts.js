/**
 * Charts Module - Handles data visualization with Chart.js
 */
const Charts = (() => {
    let balanceChart = null;
    let categoryChart = null;

    const initDashboardCharts = () => {
        const data = Storage.getData();
        const transactions = data.transactions;

        // 1. Balance Evolution (Line Chart)
        const balanceCtx = document.getElementById('balanceChart').getContext('2d');
        const balanceData = transactions.slice(0, 10).reverse().map((t, i, arr) => {
            let currentBalance = data.balance;
            for (let j = 0; j < i; j++) {
                // This is a simplified logic for demo purposes
            }
            return currentBalance;
        });

        if (balanceChart) balanceChart.destroy();
        balanceChart = new Chart(balanceCtx, {
            type: 'line',
            data: {
                labels: transactions.slice(0, 7).reverse().map(t => t.date.split('-')[2]),
                datasets: [{
                    label: 'Balance',
                    data: transactions.slice(0, 7).reverse().map((t, i, arr) => {
                        // Simplified balance evolution
                        return Math.random() * 5000 + 1000; 
                    }),
                    borderColor: '#ff1f3d',
                    backgroundColor: 'rgba(255, 31, 61, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { display: false },
                    x: { grid: { display: false }, ticks: { color: '#666' } }
                }
            }
        });

        // 2. Expenses by Category (Doughnut Chart)
        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        const expenses = transactions.filter(t => t.type === 'expense');
        const categories = {};
        expenses.forEach(e => {
            categories[e.category] = (categories[e.category] || 0) + e.amount;
        });

        if (categoryChart) categoryChart.destroy();
        categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        '#ff1f3d', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#fff', padding: 20, font: { size: 12 } }
                    }
                }
            }
        });
        // 3. Income vs Expenses (Bar Chart)
        const summaryCtx = document.getElementById('summaryChart')?.getContext('2d');
        if (summaryCtx) {
            if (window.summaryChart) window.summaryChart.destroy();
            window.summaryChart = new Chart(summaryCtx, {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expenses'],
                    datasets: [{
                        data: [data.totalIncome, data.totalExpenses],
                        backgroundColor: ['#10b981', '#ff1f3d'],
                        borderRadius: 10,
                        barThickness: 40
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { display: false },
                        x: { grid: { display: false }, ticks: { color: '#666' } }
                    }
                }
            });
        }
    };

    return {
        initDashboardCharts
    };
})();
