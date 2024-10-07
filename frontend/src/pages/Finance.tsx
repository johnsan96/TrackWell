import { useState, useEffect } from 'react';
import './Finance.css';

interface Transaction {
    name: string;
    amount: number;
}

function Finance() {
    // State to hold account balance
    const [balance, setBalance] = useState<number>(0);

    // State to hold expenses (an array of expense objects)
    const [expenses, setExpenses] = useState<Transaction[]>([]);

    // State to hold incomes (an array of income objects)
    const [incomes, setIncomes] = useState<Transaction[]>([]);

    // State to hold new expense details
    const [expenseName, setExpenseName] = useState<string>('');
    const [expenseAmount, setExpenseAmount] = useState<string>('');

    // State to hold new income details
    const [incomeName, setIncomeName] = useState<string>('');
    const [incomeAmount, setIncomeAmount] = useState<string>('');

    // Get current date
    const [date, setDate] = useState<string>(new Date().toLocaleDateString());

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedBalance = localStorage.getItem('balance');
        const storedExpenses = localStorage.getItem('expenses');
        const storedIncomes = localStorage.getItem('incomes');

        if (storedBalance) {
            setBalance(parseFloat(storedBalance));
        }
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
        }
        if (storedIncomes) {
            setIncomes(JSON.parse(storedIncomes));
        }
    }, []);

    // Function to handle adding a new expense
    const addExpense = () => {
        if (expenseName && expenseAmount) {
            const newExpense = { name: expenseName, amount: parseFloat(expenseAmount) };
            const updatedExpenses = [...expenses, newExpense]; // Add new expense to the list
            setExpenses(updatedExpenses); // Update the state
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses)); // Update Local Storage
            setExpenseName(''); // Reset input fields
            setExpenseAmount('');
        }
    };

    // Function to handle adding a new income
    const addIncome = () => {
        if (incomeName && incomeAmount) {
            const newIncome = { name: incomeName, amount: parseFloat(incomeAmount) };
            const updatedIncomes = [...incomes, newIncome]; // Add new income to the list
            setIncomes(updatedIncomes); // Update the state
            localStorage.setItem('incomes', JSON.stringify(updatedIncomes)); // Update Local Storage
            setIncomeName(''); // Reset input fields
            setIncomeAmount('');
        }
    };

    // Clear all data
    const clearAllData = () => {
        setBalance(0);
        setExpenses([]);
        setIncomes([]);
        localStorage.removeItem('balance');
        localStorage.removeItem('expenses');
        localStorage.removeItem('incomes');
    };

    // Funktion zum Löschen einer Einnahme
    const deleteIncome = (indexToDelete: number) => {
        const updatedIncomes = incomes.filter((_, index) => index !== indexToDelete);
        setIncomes(updatedIncomes); // Update state
        localStorage.setItem('incomes', JSON.stringify(updatedIncomes)); // Update Local Storage
    };

    // Funktion zum Löschen einer Ausgabe
    const deleteExpense = (indexToDelete: number) => {
        const updatedExpenses = expenses.filter((_, index) => index !== indexToDelete);
        setExpenses(updatedExpenses); // Update state
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses)); // Update Local Storage
    };


    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    // Calculate total incomes
    const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);

    // Calculate the remaining balance
    const remainingBalance = Math.round((balance + totalIncomes - totalExpenses) * 100) / 100;

    return (
        <div className="Finance">
            <h2>Kontostand Management</h2>
            <p>Zuletzt aktualisiert: {date}</p>
            <div>
                <label>Kontostand: </label>
                <input
                    type="number"
                    value={balance}
                    onChange={(e) => {
                        const newBalance = parseFloat(e.target.value);
                        setBalance(newBalance);
                        localStorage.setItem('balance', newBalance.toString());
                    }}
                />
            </div>

            <div className='forms'>

                <div className='form'>
                    <input
                        type="text"
                        placeholder="Einnahmen Name"
                        value={incomeName}
                        onChange={(e) => setIncomeName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Betrag"
                        value={incomeAmount}
                        onChange={(e) => setIncomeAmount(e.target.value)}
                    />
                    <button onClick={addIncome}>Einnahme hinzufügen</button>
                </div>


                <div className='form'>
                    <input
                        type="text"
                        placeholder="Ausgaben Name"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Betrag"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                    <button onClick={addExpense}>Ausgabe hinzufügen</button>
                </div>

            </div>


            <h3>Einnahmen</h3>
            <ul>
                {incomes.map((income, index) => (
                    <li key={index}>
                        <button onClick={() => deleteIncome(index)} className='delete-button'>x</button>
                        {income.name}: {income.amount}€
                    </li>
                ))}
            </ul>
            {/*<h3>Gesamtsumme der Einnahmen: {totalIncomes}€</h3> */}

            <h3>Vorraussichtliche Ausgaben</h3>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        <button onClick={() => deleteExpense(index)} className='delete-button'>x</button>
                        {expense.name}: {expense.amount}€
                    </li>
                ))}
            </ul>
            {/* <h3>Gesamtsumme der Ausgaben: {totalExpenses}€</h3> */}
            <h3>Neuer Kontostand: {remainingBalance}€</h3>
            <button onClick={clearAllData} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
                Alle Daten löschen
            </button>
        </div>
    );
}

export default Finance;
