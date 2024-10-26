import { useState, useEffect } from 'react';
import './Finance.css';
import FormFinance from '../components/FormFinance';
import { useAuth } from '../context/AuthContext';
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

interface Transaction {
    name: string;
    amount: number;
}

function Finance() {
    const [balance, setBalance] = useState<number>(0);

    const [expenses, setExpenses] = useState<Transaction[]>([]);

    const [incomes, setIncomes] = useState<Transaction[]>([]);

    const [expenseName, setExpenseName] = useState<string>('');
    const [expenseAmount, setExpenseAmount] = useState<string>('');

    const [incomeName, setIncomeName] = useState<string>('');
    const [incomeAmount, setIncomeAmount] = useState<string>('');

    const [date, setDate] = useState<string>(new Date().toLocaleDateString());

    const { currentUser } = useAuth()

    const navigate = useNavigate(); 

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

    const addExpense = () => {
        if (expenseName && expenseAmount) {
            const newExpense = { name: expenseName, amount: parseFloat(expenseAmount) };
            const updatedExpenses = [...expenses, newExpense]; 
            setExpenses(updatedExpenses); 
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses)); 
            setExpenseName(''); 
            setExpenseAmount('');
        }
    };

    const addIncome = () => {
        if (incomeName && incomeAmount) {
            const newIncome = { name: incomeName, amount: parseFloat(incomeAmount) };
            const updatedIncomes = [...incomes, newIncome]; 
            setIncomes(updatedIncomes); 
            localStorage.setItem('incomes', JSON.stringify(updatedIncomes)); 
            setIncomeName(''); 
            setIncomeAmount('');
        }
    };

    const clearAllData = () => {
        setBalance(0);
        setExpenses([]);
        setIncomes([]);
        localStorage.removeItem('balance');
        localStorage.removeItem('expenses');
        localStorage.removeItem('incomes');
    };

    const deleteIncome = (indexToDelete: number) => {
        const updatedIncomes = incomes.filter((_, index) => index !== indexToDelete);
        setIncomes(updatedIncomes); 
        localStorage.setItem('incomes', JSON.stringify(updatedIncomes)); 
    };

    const deleteExpense = (indexToDelete: number) => {
        const updatedExpenses = expenses.filter((_, index) => index !== indexToDelete);
        setExpenses(updatedExpenses); 
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses)); 
    };

    const handleSignOut = async () => {
        try {
            await doSignOut();
            navigate('/login'); // Weiterleitung zur Login-Seite
        } catch (error) {
            console.error('Fehler beim Abmelden:', error);
        }
    };

    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);
    const remainingBalance = Math.round((balance + totalIncomes - totalExpenses) * 100) / 100;

    return (
        <div className="Finance">
            <p style={{ color: 'black' }}>{currentUser.uid}</p>
          
            <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
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

            <FormFinance
                incomeName={incomeName}
                expenseName={expenseName}
                incomeAmount={incomeAmount}
                expenseAmount={expenseAmount}
                setIncomeName={setIncomeName}
                setIncomeAmount={setIncomeAmount}
                addIncome={addIncome}
                setExpenseName={setExpenseName}
                setExpenseAmount={setExpenseAmount}
                addExpense={addExpense}
            />
            
            <h3>Einnahmen</h3>
            <ul>
                {incomes.map((income, index) => (
                    <li key={index}>
                        <button onClick={() => deleteIncome(index)} className='delete-button'>x</button>
                        {income.name}: {income.amount}€
                    </li>
                ))}
            </ul>

            <h3>Vorraussichtliche Ausgaben</h3>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        <button onClick={() => deleteExpense(index)} className='delete-button'>x</button>
                        {expense.name}: {expense.amount}€
                    </li>
                ))}
            </ul>
            <h3>Neuer Kontostand: {remainingBalance}€</h3>
            <button onClick={clearAllData} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
                Alle Daten löschen
            </button>

            <button onClick={handleSignOut} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white', marginLeft: '20px' }}>
                Abmelden
            </button>
        </div>
    );
}

export default Finance;
