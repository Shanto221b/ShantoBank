async function createAccountAPI(
  request,
  response,
  database
) {
  try {
    const name = request.body.name;
    const accountNumber = request.body.accountNumber;
    const password = request.body.password;
    const balance = Number(request.body.balance);

    if (
      name === "" ||
      accountNumber === "" ||
      password === "" ||
      request.body.balance === ""
    ) {
      return response.status(400).json({
        message: "Please fill in all fields"
      });
    }

    if (balance < 0) {
      return response.status(400).json({
        message: "Balance cannot be negative"
      });
    }

    const existingAccount = await database
      .collection("accounts")
      .findOne({
        accountNumber: accountNumber
      });

    if (existingAccount) {
      return response.status(400).json({
        message: "Account number already exists"
      });
    }

    const newAccount = {
      name: name,
      accountNumber: accountNumber,
      password: password,
      balance: balance
    };

    await database
      .collection("accounts")
      .insertOne(newAccount);

    return response.status(201).json({
      message: "Account created successfully"
    });
  } catch (error) {
    console.log("Create account error:", error);

    return response.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = createAccountAPI;