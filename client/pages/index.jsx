import { getCurrentUser } from "../lib/get-current-user";
import Banana from "./banana";

function index({ isLoggedIn, user }) {
  console.log(isLoggedIn);
  console.log(user);
  return <Banana />;
}

export const getServerSideProps = async ({ req }) => {
  const { isLoggedIn, user } = await getCurrentUser(req.headers);

  return {
    props: { isLoggedIn, user },
  };
};

export default index;
