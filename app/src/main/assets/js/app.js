/**
 * Main App Module - Orchestrates the application logic
 */
const App = (() => {
    const init = () => {
        console.log('Fintech Pro Initialized');
        
        // Check if user is authenticated
        if (!Auth.isAuthenticated() && !window.location.href.includes('index.html')) {
            window.location.href = 'index.html';
        }
        
        // Initialize data if empty
        const data = Storage.getData();
        if (data.transactions.length === 0) {
            // Add some sample data for first time users
            const samples = [
                { type: 'income', amount: 5000, category: 'Salary', description: 'Monthly Salary', date: '2026-03-01', id: 1 },
                { type: 'expense', amount: 1200, category: 'Bills', description: 'Rent', date: '2026-03-02', id: 2 },
                { type: 'expense', amount: 150, category: 'Food', description: 'Grocery Store', date: '2026-03-05', id: 3 },
                { type: 'expense', amount: 80, category: 'Transport', description: 'Uber Ride', date: '2026-03-10', id: 4 },
                { type: 'income', amount: 450, category: 'Freelance', description: 'Logo Design', date: '2026-03-15', id: 5 }
            ];
            samples.forEach(s => Storage.addTransaction(s));
        }
    };

    return {
        init
    };
})();

// Initialize on load
document.addEventListener('DOMContentLoaded', App.init);
