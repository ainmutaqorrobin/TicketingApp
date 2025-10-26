import { getCurrentUser } from "../lib/get-current-user";
import Layout from "./layout";

function HomePage() {
  return (
    <Layout>
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
