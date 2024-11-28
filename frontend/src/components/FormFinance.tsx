import React from "react";

interface finance {
    incomeName: string;
    expenseName: string;
    incomeAmount: string;
    expenseAmount: string;
    setIncomeName: (e: React.SetStateAction<string>) => void;
    setIncomeAmount: (e: React.SetStateAction<string>) => void;
    addIncome: () => void;
    setExpenseName: (e: React.SetStateAction<string>) => void;
    addExpense: () => void;
    setExpenseAmount: (e: React.SetStateAction<string>) => void;
}

export default function FormFinance({
    incomeName,
    expenseName,
    incomeAmount,
    expenseAmount,
    setIncomeAmount,
    setIncomeName,
    addIncome,
    setExpenseName,
    setExpenseAmount,
    addExpense }: finance) {

    return (
        <React.Fragment>
            <div className="container">
                <div className='forms row'>

                    <div className="col-12 col-md-6 mb-3">
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
                    </div>

                    <div className='col-12 col-md-6 mb-3 mt-3'>
                        <div className='form' >
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

                </div>
            </div>

        </React.Fragment>
    )
}