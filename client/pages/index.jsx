import { API } from "../const/api";
import { buildClient } from "../lib/build-client";
import TicketList from "../components/ticket/ticket-list";

function HomePage({ tickets }) {
  return <TicketList tickets={tickets} />;
}

export default HomePage;

export const getServerSideProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get(API.TICKET);

  return { props: { tickets: data } };
};
