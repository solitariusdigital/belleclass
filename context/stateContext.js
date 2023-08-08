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
      title: "درگاه زیبایی",
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
