import { getCurrentUser } from "../lib/get-current-user";
import Layout from "./layout";

function HomePage({ user }) {
  return (
    <Layout currentUser={user}>
      <h1>Home Page</h1>
    </Layout>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await getCurrentUser(req.headers);
  return {
    props: { user },
  };
};

export default HomePage;
