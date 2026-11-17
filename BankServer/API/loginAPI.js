async function loginAPI(request, response, database) {
  try {
    const accountNumber = request.body.accountNumber;
    const password = request.body.password;

    const user = await database
      .collection("accounts")
      .findOne({
        accountNumber: accountNumber,
        password: password
      });

    if (user) {
      response.status(200).json({
        message: "Login successful",

        user: {
          name: user.name,
          accountNumber: user.accountNumber,
          balance: user.balance
        }
      });
    } else {
      response.status(401).json({
        message: "Wrong account number or password"
      });
    }
  } catch (error) {
    response.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = loginAPI;