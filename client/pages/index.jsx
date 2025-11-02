import { API } from "../const/api";
import { buildClient } from "../lib/build-client";

function HomePage({ tickets }) {
  if (!tickets) {
    return <h1>Failed to load tickets 😢</h1>;
  }

  return (
    <div className="container mt-4">
      <h1>Tickets List</h1>
      <ul className="list-group mt-3">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="list-group-item">
            <strong>{ticket.title}</strong> — ${ticket.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

export const getServerSideProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get(API.TICKET);

  return { props: { tickets: data } };
};
