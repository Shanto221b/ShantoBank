import { useState } from "react";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Deposit from "./Pages/Deposit";
import Withdraw from "./Pages/Withdraw";
import Transfer from "./Pages/Transfer";
import CreateAccount from "./Pages/CreateAccount";

function App() {
  const [page, setPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  if (page === "login") {
    return (
      <Login
        setPage={setPage}
        setCurrentUser={setCurrentUser}
      />
    );
  }

  if (page === "createAccount") {
    return (
      <CreateAccount
        setPage={setPage}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setPage={setPage}
      />
    );
  }

  if (page === "deposit") {
    return (
      <Deposit
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setPage={setPage}
      />
    );
  }

  if (page === "withdraw") {
    return (
      <Withdraw
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setPage={setPage}
      />
    );
  }

  if (page === "transfer") {
    return (
      <Transfer
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setPage={setPage}
      />
    );
  }

  return null;
}

export default App;