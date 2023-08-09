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
  const [expertiseAreas, setExpertiseAreas] = useState([
    {
      title: "درمان با فرکانس رادویی",
      link: "/expertises/درمان با فرکانس رادویی",
      active: false,
    },
    {
      title: "فیلر",
      link: "/expertises/فیلر",
      active: false,
    },
    {
      title: "ذخیره فیبروبلاست",
      link: "/expertises/ذخیره فیبروبلاست",
      active: false,
    },
    {
      title: "نوتریژنومیکس",
      link: "/expertises/نوتریژنومیکس",
      active: false,
    },
    {
      title: "لیزر",
      link: "/expertises/لیزر",
      active: false,
    },
    {
      title: "کاشت مو و ابرو",
      link: "/expertises/کاشت مو و ابرو",
      active: false,
    },
    {
      title: "بوتاکس",
      link: "/expertises/بوتاکس",
      active: false,
    },
    {
      title: "پلاسمای غنی از پلاکت",
      link: "/expertises/پلاسمای غنی از پلاکت",
      active: false,
    },
    {
      title: "هایفوتراپی",
      link: "/expertises/هایفوتراپی",
      active: false,
    },
    {
      title: "کرایوتراپی",
      link: "/expertises/کرایوتراپی",
      active: false,
    },
    {
      title: "لیفت با نخ",
      link: "/expertises/لیفت با نخ",
      active: false,
    },
  ]);
  // application user context
  const [appUsers, setAppUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLogIn, setUserLogin] = useState(true);

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
    expertiseAreas,
    setExpertiseAreas,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
