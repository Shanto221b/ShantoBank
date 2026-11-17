import { useState } from "react";

function Deposit({
  currentUser,
  setCurrentUser,
  setPage
}) {
  const [amount, setAmount] = useState("");

  async function depositMoney(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/deposit",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            accountNumber: currentUser.accountNumber,
            amount: amount
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data.user);
        alert(data.message);
        setPage("dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Backend server is not running");
    }
  }

  return (
    <div>
      <h1>Deposit Money</h1>

      <p>
        Current Balance: ৳{currentUser.balance}
      </p>

      <form onSubmit={depositMoney}>
        <label>Deposit Amount</label>

        <br />

        <input
          type="number"
          placeholder="Enter deposit amount"
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Deposit
        </button>
      </form>

      <br />

      <button onClick={() => setPage("dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Deposit;