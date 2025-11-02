import Link from "next/link";

function TicketList({ tickets }) {
  if (!tickets) {
    return <h1>Failed to load tickets 😢</h1>;
  }

  const ticketList = tickets.map((ticket) => (
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>
        <Link href={`/tickets/${ticket.id}`}>View</Link>
      </td>
    </tr>
  ));

  return (
    <div className="container mt-4">
      <h1>Tickets List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
}

export default TicketList;
