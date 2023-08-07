import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [menuMobile, setMenuMobile] = useState(false);
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: "درگاه زیبایی",
      collection: "portal",
      link: "/portal",
      active: false,
    },
    {
      title: "پزشکان ما",
      collection: "doctors",
      link: "/doctors",
      active: false,
    },
    {
      title: "درباره ما",
      collection: "about",
      link: "/about",
      active: false,
    },
    {
      title: "سوالات",
      collection: "questions",
      link: "/questions",
      active: false,
    },
    {
      title: "آدرس",
      collection: "address",
      link: "/address",
      active: false,
    },
  ]);

  const stateContext = {
    menuMobile,
    setMenuMobile,
    navigationTopBar,
    setNavigationTopBar,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
