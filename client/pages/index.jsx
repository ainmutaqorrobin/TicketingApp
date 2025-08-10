import { API } from "../const/api";
import Banana from "./banana";
import axios from "axios";

function index({ isLoggedIn }) {
  console.log(isLoggedIn);
  return <Banana />;
}

export const getServerSideProps = async () => {
  try {
    const { data } = await axios.get(API.CURRENT_USER);
    return { props: { isLoggedIn: !!data.currentUser } };
  } catch (error) {
    console.log(error);
    return { props: { isLoggedIn: false } };
  }
};

export default index;
