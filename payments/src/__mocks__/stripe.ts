export const stripe = {
  paymentIntents: {
    create: jest.fn().mockImplementation(async (data) => ({
      id: "pi_mock_" + Math.random().toString(36).substring(7),
      status: "succeeded",
      amount: data.amount,
      currency: data.currency || "usd",
    })),
    list: jest.fn().mockImplementation(async ({ limit }) => ({
      data: [
        {
          id: "pi_mock_123",
          amount: 2000, // default dummy
          currency: "usd",
          status: "succeeded",
        },
      ],
    })),
  },
};
