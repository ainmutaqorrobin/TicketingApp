import axios from "axios";
import { API, INGRESS_URL } from "../const/api";

export async function getTicketList(headers) {
  console.log(`${INGRESS_URL}${API.TICKET}`);
  try {
    const { data } = await axios.get(`${INGRESS_URL}${API.TICKET}`, {
      headers,
    });

    return { tickets: data };
  } catch (error) {
    console.error("getTicketList error:", error.message);
    console.error(error);
    return { tickets: null };
  }
}
