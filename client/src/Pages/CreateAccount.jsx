import { useState } from "react";

function CreateAccount({ setPage }) {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");

  async function createAccount(event) {
    event.preventDefault();

    if (
      name === "" ||
      accountNumber === "" ||
      password === "" ||
      balance === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (Number(balance) < 0) {
      alert("Balance cannot be negative");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-account",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: name,
            accountNumber: accountNumber,
            password: password,
            balance: balance
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setPage("login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Backend server is not running");
    }
  }

  return (
    <div>
      <h1>Shanto Bank PLC.</h1>
      <h2>Create Account</h2>

      <form onSubmit={createAccount}>
        <label>Account Holder Name</label>

        <br />

        <input
          type="text"
          placeholder="Enter account holder name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <br />
        <br />

        <label>Account Number</label>

        <br />

        <input
          type="text"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(event) =>
            setAccountNumber(event.target.value)
          }
        />

        <br />
        <br />

        <label>Password</label>

        <br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <br />
        <br />

        <label>Opening Balance</label>

        <br />

        <input
          type="number"
          placeholder="Enter opening balance"
          value={balance}
          onChange={(event) =>
            setBalance(event.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Create Account
        </button>
      </form>

      <br />

      <button
        type="button"
        onClick={() => setPage("login")}
      >
        Back to Login
      </button>
    </div>
  );
}

export default CreateAccount;