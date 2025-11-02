import axios from "axios";
import { INGRESS_URL } from "../const/api";

export const buildClient = ({ req } = {}) => {
  if (typeof window === "undefined") {
    // SSR or server-side
    return axios.create({
      baseURL: INGRESS_URL,
      headers: req.headers,
    });
  } else {
    // Client-side
    return axios.create({
      baseURL: "/",
    });
  }
};
