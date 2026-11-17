async function transferAPI(request, response, database) {
  try {
    const senderAccountNumber =
      request.body.senderAccountNumber;

    const receiverAccountNumber =
      request.body.receiverAccountNumber;

    const amount = Number(request.body.amount);

    if (amount <= 0) {
      return response.status(400).json({
        message: "Please enter a valid amount"
      });
    }

    if (
      senderAccountNumber === receiverAccountNumber
    ) {
      return response.status(400).json({
        message:
          "You cannot transfer money to your own account"
      });
    }

    const receiver = await database
      .collection("accounts")
      .findOne({
        accountNumber: receiverAccountNumber
      });

    if (!receiver) {
      return response.status(404).json({
        message: "Receiver account not found"
      });
    }

    const senderResult = await database
      .collection("accounts")
      .updateOne(
        {
          accountNumber: senderAccountNumber,
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

    if (senderResult.matchedCount === 0) {
      const sender = await database
        .collection("accounts")
        .findOne({
          accountNumber: senderAccountNumber
        });

      if (!sender) {
        return response.status(404).json({
          message: "Sender account not found"
        });
      }

      return response.status(400).json({
        message: "Insufficient balance"
      });
    }

    await database
      .collection("accounts")
      .updateOne(
        {
          accountNumber: receiverAccountNumber
        },
        {
          $inc: {
            balance: amount
          }
        }
      );

    const updatedSender = await database
      .collection("accounts")
      .findOne({
        accountNumber: senderAccountNumber
      });

    response.status(200).json({
      message: "Money transferred successfully",

      user: {
        name: updatedSender.name,
        accountNumber: updatedSender.accountNumber,
        balance: updatedSender.balance
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = transferAPI;