import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Script from "next/script";
import { UserProvider } from "../context/user-context";
import Header from "../components/pages/header";
import { useRouter } from "next/router";
import { getCurrentUser } from "../lib/get-current-user";
import App from "next/app";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const noHeaderRoutes = ["/auth/signin", "/auth/signup"];
  const shouldShowHeader = !noHeaderRoutes.includes(router.pathname);

  return (
    <UserProvider initialUser={pageProps.user}>
      <>
        {shouldShowHeader && <Header />}
        <div className="container mt-3">
          <Component {...pageProps} />
        </div>
      </>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </UserProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req } = appContext.ctx;

  if (req) {
    const { user } = await getCurrentUser(req.headers);
    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        user,
      },
    };
  }

  return appProps;
};

export default MyApp;
