import { useState, useEffect } from "react";
import { FaMoneyBill, FaFolderOpen } from "react-icons/fa";

function App() {
    // ** States
    const [balance, setBalance] = useState(() => {
        // Load the balance from localStorage or get the default value 0
        return parseFloat(localStorage.getItem("balance")) || 0;
    });
    const [transactions, setTransactions] = useState(() => {
        // Load transactions from localStorage or get the empty array
        return JSON.parse(localStorage.getItem("transactions")) || [];
    });
    const [message, setMessage] = useState();

    // useEffect: Save balance & transactions to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("balance", balance);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [balance, transactions]);

    // ** Handlers

    // Handle Deposit
    const handleDeposit = (e) => {
        e.preventDefault();

        const amount = parseFloat(e.target.amount.value);
        const description = e.target.description.value;

        if (!amount || amount <= 0) return;

        setBalance(balance + amount);
        setTransactions([...transactions, { type: "deposit", amount, description, date: new Date().toISOString() }]);

        // Show the message
        setMessage(`You deposited $${amount} into your account`);
        setTimeout(() => setMessage(""), 5000);

        e.target.reset();
    };

    // Handle Withdrawal
    const handleWithdrawal = (e) => {
        e.preventDefault();

        const amount = parseFloat(e.target.amount.value);
        const description = e.target.description.value;

        if (!amount || amount <= 0) return;

        setBalance(balance - amount);
        setTransactions([...transactions, { type: "withdrawal", amount, description, date: new Date().toISOString() }]);

        // Show the message
        setMessage(`You withdrew $${amount} from your account`);
        setTimeout(() => setMessage(""), 5000);

        e.target.reset();
    };

    // Clear all transactions
    const handleClearTransactions = () => {
        if (window.confirm("Are you sure?")) {
            setTransactions([]);
            setMessage("All transactions have been cleared!");
            setTimeout(() => setMessage(""), 5000);
        }
    };

    return (
        <div className="app">
            <div className="top">
                <div className="glow"></div>
                <div className="glow-secondary"></div>
            </div>

            <div className="container">
                {/* SIDEBAR */}
                <aside className="sidebar">
                    <h2>Manage Your Account</h2>
                    <form onSubmit={handleDeposit}>
                        <h3>Deposit</h3>
                        <input type="number" name="amount" placeholder="Deposit Amount" />
                        <textarea name="description" placeholder="Description ..."></textarea>
                        <button className="deposit-btn">Deposit</button>
                    </form>
                    <form onSubmit={handleWithdrawal}>
                        <h3>Withdraw</h3>
                        <input type="number" name="amount" placeholder="Withdrawal Amount" />
                        <textarea name="description" placeholder="Description ..."></textarea>
                        <button className="deposit-btn">Withdraw</button>
                    </form>

                    <button className="clearBtn" onClick={handleClearTransactions}>
                        Clear Transactions History
                    </button>
                </aside>

                {/* MAIN SECTION */}
                <div className="main">
                    <div className="main-header">
                        <div className="balance">
                            <p>
                                <FaMoneyBill /> Your current account balance
                            </p>
                            <h1>$ {balance.toLocaleString()}</h1>
                        </div>
                        <div className="message">{message && <p>{message}</p>}</div>
                    </div>

                    {/* TRANSACTIONS */}
                    <div className="transactions">
                        {/* BOX */}
                        {transactions.length > 0 ? (
                            transactions.map((t, i) => (
                                <div key={i} className={`transaction-box ${t.type}`}>
                                    <h2>{t.type === "deposit" ? "Deposit" : "Withdrawal"}</h2>
                                    <p>
                                        {t.type === "deposit" ? "+" : "-"} ${t.amount}
                                    </p>
                                    {t.description && <p>Payment Description: {t.description}</p>}
                                    <p className="date">
                                        {t.date
                                            ? new Date(t.date).toLocaleString("en-US", {
                                                  year: "numeric",
                                                  month: "short",
                                                  day: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })
                                            : "Date not available"}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="no-transaction">
                                <span>
                                    <FaFolderOpen />
                                </span>
                                You have no transaction in your history
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
