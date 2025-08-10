import { API, INGRESS_URL } from "../const/api";
import Banana from "./banana";
import axios from "axios";

function index({ isLoggedIn }) {
  console.log(isLoggedIn);
  return <Banana />;
}

export const getServerSideProps = async ({ req }) => {
  console.log(req.headers);
  try {
    const { data } = await axios.get(`${INGRESS_URL}${API.CURRENT_USER}`, {
      headers: req.headers,
    });

    console.log(data);
    return { props: { isLoggedIn: !!data.currentUser } };
  } catch (error) {
    console.log(error.message);
    return { props: { isLoggedIn: false } };
  }
};

export default index;
