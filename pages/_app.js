import RootLayout from "../components/RootLayout";
import { StateProvider } from "../context/stateContext";
import { DefaultSeo } from "next-seo";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <RootLayout>
        <DefaultSeo
          title="Belle Class"
          description="Beauty Clinic"
          openGraph={{
            type: "website",
            locale: "fa_IR",
            url: "https://belleclass.com/",
            siteName: "Belle Class",
          }}
        />
        <Component {...pageProps} />
      </RootLayout>
    </StateProvider>
  );
}
