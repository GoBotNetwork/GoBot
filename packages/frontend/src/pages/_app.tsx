import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutComponent from "../components/LayoutComponent";
import Head from "next/head";
import { createClient, Provider } from "urql";
import { __prod__ } from "../utils/constants";

const client = createClient({
  url: __prod__ ? "https://www.go-bot.xyz:2053/graphql" : "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="GoBot.png" />
      </Head>
      <Provider value={client}>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </Provider>
    </>
  );
};

export default App;
