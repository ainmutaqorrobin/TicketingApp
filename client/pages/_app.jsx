import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { UserProvider } from "../context/user-context";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider initialUser={pageProps.user}>
      <Component {...pageProps} />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </UserProvider>
  );
}

export default MyApp;
