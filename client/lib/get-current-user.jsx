import axios from "axios";
import { API, INGRESS_URL } from "../const/api";

export async function getCurrentUser(headers) {
  try {
    const { data } = await axios.get(`${INGRESS_URL}${API.CURRENT_USER}`, {
      headers,
    });

    return { isLoggedIn: !!data.currentUser, user: data.currentUser };
  } catch (error) {
    console.error("getCurrentUser error:", error.message);
    return { isLoggedIn: false, user: null };
  }
}
