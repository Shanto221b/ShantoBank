async function depositAPI(request, response, database) {
  try {
    const accountNumber = request.body.accountNumber;
    const amount = Number(request.body.amount);

    console.log("Deposit account:", accountNumber);
    console.log("Deposit amount:", amount);
    console.log("Database:", database.databaseName);

    if (!accountNumber) {
      return response.status(400).json({
        message: "Account number is required"
      });
    }

    if (!amount || amount <= 0) {
      return response.status(400).json({
        message: "Please enter a valid amount"
      });
    }

    const result = await database
      .collection("accounts")
      .updateOne(
        {
          accountNumber: accountNumber
        },
        {
          $inc: {
            balance: amount
          }
        }
      );

    console.log("Matched account:", result.matchedCount);
    console.log("Updated account:", result.modifiedCount);

    if (result.matchedCount === 0) {
      return response.status(404).json({
        message: "Account not found"
      });
    }

    const updatedUser = await database
      .collection("accounts")
      .findOne({
        accountNumber: accountNumber
      });

    return response.status(200).json({
      message: "Money deposited successfully",

      user: {
        name: updatedUser.name,
        accountNumber: updatedUser.accountNumber,
        balance: updatedUser.balance
      }
    });
  } catch (error) {
    console.log("Deposit error:", error);

    return response.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = depositAPI;