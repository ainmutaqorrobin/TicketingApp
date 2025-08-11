import { getCurrentUser } from "../lib/get-current-user";

function index({ isLoggedIn, user }) {
  return user ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
}

export const getServerSideProps = async ({ req }) => {
  const { isLoggedIn, user } = await getCurrentUser(req.headers);

  return {
    props: { isLoggedIn, user },
  };
};

export default index;
