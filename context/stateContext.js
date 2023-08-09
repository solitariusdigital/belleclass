import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [menuMobile, setMenuMobile] = useState(false);
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: "صفحه اصلی",
      link: "/",
      active: false,
    },
    {
      title: "پرتال",
      link: "/portal",
      active: false,
    },
    {
      title: "پزشکان ما",
      link: "/doctors",
      active: false,
    },
    {
      title: "درباره ما",
      link: "/about",
      active: false,
    },
    {
      title: "سوالات",
      link: "/questions",
      active: false,
    },
    {
      title: "آدرس",
      link: "/address",
      active: false,
    },
  ]);

  // application user context
  const [appUsers, setAppUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLogIn, setUserLogin] = useState(false);

  const stateContext = {
    menuMobile,
    setMenuMobile,
    navigationTopBar,
    setNavigationTopBar,
    currentUser,
    setCurrentUser,
    userLogIn,
    setUserLogin,
    appUsers,
    setAppUsers,
  };

  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
