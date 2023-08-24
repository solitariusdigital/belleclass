import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const router = useRouter();
  let pathname = router.pathname;

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (nav.link === pathname) {
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="menu">
        <Menu />
      </div>
      <div className="main">
        <main>{children}</main>
      </div>
      <Footer />
    </Fragment>
  );
}
