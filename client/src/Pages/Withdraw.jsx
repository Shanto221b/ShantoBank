import { useState } from "react";

function Withdraw({
  currentUser,
  setCurrentUser,
  setPage
}) {
  const [amount, setAmount] = useState("");

  async function withdrawMoney(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/withdraw",
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
      <h1>Withdraw Money</h1>

      <p>
        Current Balance: ৳{currentUser.balance}
      </p>

      <form onSubmit={withdrawMoney}>
        <label>Withdraw Amount</label>

        <br />

        <input
          type="number"
          placeholder="Enter withdraw amount"
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Withdraw
        </button>
      </form>

      <br />

      <button onClick={() => setPage("dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Withdraw;