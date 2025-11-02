import Link from "next/link";
import { API } from "../const/api";
import { buildClient } from "../lib/build-client";

function HomePage({ tickets }) {
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

export default HomePage;

export const getServerSideProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get(API.TICKET);

  return { props: { tickets: data } };
};
