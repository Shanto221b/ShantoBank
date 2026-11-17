import { useState } from "react";

function Login({ setPage, setCurrentUser }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            accountNumber: accountNumber,
            password: password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data.user);
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
      <h1>Shanto Bank PLC.</h1>
      <h2>Login Page</h2>

      <br />

      <form onSubmit={loginUser}>
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

        <button type="submit">
          Login
        </button>
      </form>

      <br />

      <button
        type="button"
        onClick={() => setPage("createAccount")}
      >
        Create New Account
      </button>
    </div>
  );
}

export default Login;