import { useState } from "react";

function Transfer({
  currentUser,
  setCurrentUser,
  setPage
}) {
  const [
    receiverAccountNumber,
    setReceiverAccountNumber
  ] = useState("");

  const [amount, setAmount] = useState("");

  async function transferMoney(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/transfer",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            senderAccountNumber:
              currentUser.accountNumber,

            receiverAccountNumber:
              receiverAccountNumber,

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
      <h1>Transfer Money</h1>

      <p>
        Current Balance: ৳{currentUser.balance}
      </p>

      <form onSubmit={transferMoney}>
        <label>Receiver Account Number</label>

        <br />

        <input
          type="text"
          placeholder="Enter receiver account number"
          value={receiverAccountNumber}
          onChange={(event) =>
            setReceiverAccountNumber(
              event.target.value
            )
          }
        />

        <br />
        <br />

        <label>Transfer Amount</label>

        <br />

        <input
          type="number"
          placeholder="Enter transfer amount"
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Transfer
        </button>
      </form>

      <br />

      <button onClick={() => setPage("dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Transfer;