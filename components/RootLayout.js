import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import secureLocalStorage from "react-secure-storage";
import { getUserApi } from "@/services/api";
import Image from "next/legacy/image";
import appload from "../assets/appload.png";

export default function RootLayout({ children }) {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);

  const router = useRouter();
  let pathname = router.pathname;

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (nav.link === "/") {
        navigationTopBar[0].active = true;
      } else if (pathname.includes(nav.link)) {
        navigationTopBar[0].active = false;
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // checks user login and set user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = JSON.parse(
          secureLocalStorage.getItem("currentUser")
        );
        if (currentUser) {
          const userData = await getUserApi(currentUser["_id"]);
          setCurrentUser(userData);
          secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setTimeout(() => {
      setAppLoader(true);
    }, 500);
  }, [setCurrentUser]);

  return (
    <Fragment>
      {appLoader ? (
        <Fragment>
          <div className="menu">
            <Menu />
          </div>
          <div className="main">
            <main>{children}</main>
          </div>
          <Footer />
        </Fragment>
      ) : (
        <div className="appload">
          <Image width={120} height={120} src={appload} alt="lemon" />
        </div>
      )}
    </Fragment>
  );
}
