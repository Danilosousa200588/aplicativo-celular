/**
 * Storage Module - Handles all data persistence using LocalStorage
 */
const Storage = (() => {
    const STORAGE_KEY = 'fintech_pro_data';

    const getInitialData = () => ({
        transactions: [],
        balance: 0,
        totalIncome: 0,
        totalExpenses: 0
    });

    const getData = () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : getInitialData();
    };

    const saveData = (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const addTransaction = (transaction) => {
        const data = getData();
        data.transactions.unshift(transaction); // Add to beginning
        
        if (transaction.type === 'income') {
            data.totalIncome += transaction.amount;
            data.balance += transaction.amount;
        } else {
            data.totalExpenses += transaction.amount;
            data.balance -= transaction.amount;
        }
        
        saveData(data);
    };

    const deleteTransaction = (id) => {
        const data = getData();
        const index = data.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            const t = data.transactions[index];
            if (t.type === 'income') {
                data.totalIncome -= t.amount;
                data.balance -= t.amount;
            } else {
                data.totalExpenses -= t.amount;
                data.balance += t.amount;
            }
            data.transactions.splice(index, 1);
            saveData(data);
        }
    };

    const clearAll = () => {
        saveData(getInitialData());
    };

    return {
        getData,
        addTransaction,
        deleteTransaction,
        clearAll
    };
})();
