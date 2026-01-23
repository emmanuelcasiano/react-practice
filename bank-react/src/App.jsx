import { FaMoneyBill, FaFolderOpen } from "react-icons/fa";
import React from "react";

function App() {
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
                    <form>
                        <h3>Deposit</h3>
                        <input type="number" placeholder="Deposit Amount" />
                        <textarea placeholder="Description ..."></textarea>
                        <button className="deposit-btn">Deposit</button>
                    </form>
                    <form>
                        <h3>Withdraw</h3>
                        <input type="number" placeholder="Withdrawal Amount" />
                        <textarea placeholder="Description ..."></textarea>
                        <button className="deposit-btn">Withdraw</button>
                    </form>

                    <button className="clearBtn">Clear Transactions History</button>
                </aside>

                {/* MAIN SECTION */}
                <div className="main">
                    <div className="main-header">
                        <div className="balance">
                            <p>
                                <FaMoneyBill /> Your current account balance
                            </p>
                            <h1>$ 2, 5889</h1>
                        </div>
                        <div className="message">
                            <p>You deposited $100 into your account</p>
                        </div>
                    </div>

                    {/* TRANSACTIONS */}
                    <div className="transactions">
                        {/* BOX */}
                        <div className="transaction-box deposit">
                            <h2>Deposit</h2>
                            <p>+ $200</p>
                            <p>Payment Description: From my customer for the React Project</p>
                            <p className="date">25.10.2025</p>
                        </div>
                        {/* BOX */}
                        <div className="transaction-box withdrawal">
                            <h2>Withdrawal</h2>
                            <p>- $200</p>
                            <p>Withrawal Description: Shopping for the party</p>
                            <p className="date">26.10.2025</p>
                        </div>

                        <p className="no-transaction">
                            <span>
                                <FaFolderOpen />
                            </span>
                            You have no transaction in your history
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
