import Header from "../components/pages/header";

function Layout({ children, currentUser }) {
  return (
    <>
      <Header currentUser={currentUser} />
      <main>{children}</main>
    </>
  );
}

export default Layout;
