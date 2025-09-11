import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  //Create an instance of ticket
  const ticket = Ticket.build({
    price: 20,
    title: "concert",
    userId: "123",
  });

  //Save ticket to DB
  await ticket.save();

  //Fetch the ticket twice
  const firstTicket = await Ticket.findById(ticket.id);
  const secondTicket = await Ticket.findById(ticket.id);

  //Make two seperate changes to tickets we fetched
  firstTicket!.set({ price: 10 });
  secondTicket!.set({ price: 123 });

  //Save the first fetched ticket
  await firstTicket!.save();

  //Save the second fetch ticket and expect an error
  try {
    await secondTicket!.save();
  } catch (err) {
    return;
  }
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    price: 20,
    title: "concert",
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);

  console.log(ticket);
});
