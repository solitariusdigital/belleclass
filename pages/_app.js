import { useState, useEffect } from "react";
import Layout from "../components/RootLayout";
import { StateProvider } from "../context/stateContext";
import Router from "next/router";
import { DefaultSeo } from "next-seo";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <Layout>
        <DefaultSeo
          title="CUCCETY"
          description="Digital Agency"
          openGraph={{
            type: "website",
            locale: "fa_IR",
            url: "https://cuccety.com/",
            siteName: "CUCCETY",
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}
