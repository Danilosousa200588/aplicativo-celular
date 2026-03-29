/**
 * UI Module - Handles DOM manipulation and UI updates
 */
const UI = (() => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const updateDashboard = () => {
        const data = Storage.getData();
        document.getElementById('total-balance').textContent = formatCurrency(data.balance);
        document.getElementById('total-income').textContent = `+${formatCurrency(data.totalIncome)}`;
        document.getElementById('total-expenses').textContent = `-${formatCurrency(data.totalExpenses)}`;

        const recentTransactions = data.transactions.slice(0, 5);
        const container = document.getElementById('recent-transactions');
        container.innerHTML = '';

        recentTransactions.forEach(t => {
            const item = document.createElement('div');
            item.className = 'bg-[#1a1a1a] p-4 rounded-2xl flex items-center justify-between border border-white/5 transaction-item';
            
            const isIncome = t.type === 'income';
            const color = isIncome ? 'text-green-500' : 'text-red-500';
            const iconBg = isIncome ? 'bg-green-500/10' : 'bg-red-500/10';
            const symbol = isIncome ? '+' : '-';

            item.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 ${iconBg} ${color} rounded-xl flex items-center justify-center">
                        ${isIncome ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-down"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>'}
                    </div>
                    <div>
                        <p class="font-bold text-sm">${t.description}</p>
                        <p class="text-gray-500 text-[10px] uppercase tracking-wider">${t.category} • ${t.date}</p>
                    </div>
                </div>
                <p class="font-bold ${color}">${symbol}${formatCurrency(t.amount)}</p>
            `;
            container.appendChild(item);
        });
    };

    const renderHistory = (filter = 'all') => {
        const data = Storage.getData();
        const container = document.getElementById('transaction-list');
        container.innerHTML = '';

        const filtered = data.transactions.filter(t => {
            if (filter === 'all') return true;
            return t.type === filter;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<div class="text-center py-20 text-gray-500">No transactions found.</div>';
            return;
        }

        filtered.forEach(t => {
            const item = document.createElement('div');
            item.className = 'bg-[#1a1a1a] p-5 rounded-2xl flex items-center justify-between border border-white/5 animate-fade-in';
            
            const isIncome = t.type === 'income';
            const color = isIncome ? 'text-green-500' : 'text-red-500';
            const iconBg = isIncome ? 'bg-green-500/10' : 'bg-red-500/10';
            const symbol = isIncome ? '+' : '-';

            item.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 ${iconBg} ${color} rounded-xl flex items-center justify-center">
                        ${isIncome ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-down"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>'}
                    </div>
                    <div>
                        <p class="font-bold text-sm">${t.description}</p>
                        <p class="text-gray-500 text-[10px] uppercase tracking-wider">${t.category} • ${t.date}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold ${color}">${symbol}${formatCurrency(t.amount)}</p>
                    <button class="text-xs text-gray-600 mt-1 delete-btn" data-id="${t.id}">Delete</button>
                </div>
            `;
            container.appendChild(item);
        });

        // Add delete listeners
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                Storage.deleteTransaction(id);
                renderHistory(filter);
            });
        });
    };

    return {
        updateDashboard,
        renderHistory,
        formatCurrency
    };
})();
