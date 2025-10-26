import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { UserProvider } from "../context/user-context";
import Header from "../components/pages/header";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const noHeaderRoutes = ["/auth/signin", "/auth/signup"];

  const shouldShowHeader = !noHeaderRoutes.includes(router.pathname);
  return (
    <UserProvider initialUser={pageProps.user}>
      <div>
        {shouldShowHeader && <Header />}
        <div className="container mt-3">
          <Component {...pageProps} />
        </div>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </UserProvider>
  );
}

export default MyApp;
