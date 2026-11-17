async function withdrawAPI(request, response, database) {
  try {
    const accountNumber = request.body.accountNumber;
    const amount = Number(request.body.amount);

    if (amount <= 0) {
      return response.status(400).json({
        message: "Please enter a valid amount"
      });
    }

    const result = await database
      .collection("accounts")
      .updateOne(
        {
          accountNumber: accountNumber,
          balance: {
            $gte: amount
          }
        },
        {
          $inc: {
            balance: -amount
          }
        }
      );

    if (result.matchedCount === 0) {
      const user = await database
        .collection("accounts")
        .findOne({
          accountNumber: accountNumber
        });

      if (!user) {
        return response.status(404).json({
          message: "Account not found"
        });
      }

      return response.status(400).json({
        message: "Insufficient balance"
      });
    }

    const updatedUser = await database
      .collection("accounts")
      .findOne({
        accountNumber: accountNumber
      });

    response.status(200).json({
      message: "Money withdrawn successfully",

      user: {
        name: updatedUser.name,
        accountNumber: updatedUser.accountNumber,
        balance: updatedUser.balance
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = withdrawAPI;
