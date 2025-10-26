import { getCurrentUser } from "../lib/get-current-user";

function HomePage() {
  return <h1>Home Page</h1>;
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await getCurrentUser(req.headers);
  return {
    props: { user },
  };
};

export default HomePage;
