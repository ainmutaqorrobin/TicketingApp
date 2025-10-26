import("bootstrap/dist/css/bootstrap.min.css");
import("bootstrap/dist/js/bootstrap.bundle.min.js");
import { UserProvider } from "../context/user-context";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider initialUser={pageProps.user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
