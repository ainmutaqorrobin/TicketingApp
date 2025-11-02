import { useRouter } from "next/router";
import { API } from "../../const/api";
import { buildClient } from "../../lib/build-client";
import OrderTicketForm from "../../components/ticket/order-ticket-form";

function TicketDetailPage({ ticket }) {
  return <OrderTicketForm ticket={ticket} />;
}

export default TicketDetailPage;

export const getServerSideProps = async (context) => {
  const client = buildClient(context);
  const { ticketId } = context.query;

  try {
    const { data } = await client.get(`${API.TICKET}/${ticketId}`);
    return { props: { ticket: data } };
  } catch (err) {
    console.error("❌ Fetch ticket failed:", err.message);
    return { props: { ticket: null } };
  }
};
