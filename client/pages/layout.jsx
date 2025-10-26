import Header from "../components/pages/header";

function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>{children}</main>
    </>
  );
}

export default Layout;
