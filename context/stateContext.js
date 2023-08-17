import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [menuMobile, setMenuMobile] = useState(false);
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: "بل کلاس",
      link: "/",
      active: false,
    },
    {
      title: "پرتال",
      link: "/portal",
      active: false,
    },
    {
      title: "پزشکان",
      link: "/doctors",
      active: false,
    },
    {
      title: "خدمات کلینیک",
      link: "/expertises",
      active: false,
    },
  ]);
  const [expertiseAreas, setExpertiseAreas] = useState([
    {
      title: "فیلر",
      active: false,
    },
    {
      title: "نوتریژنومیکس",
      active: false,
    },
    {
      title: "لیزر",
      active: false,
    },
    {
      title: "کاشت مو و ابرو",
      active: false,
    },
    {
      title: "بوتاکس",
      active: false,
    },
    {
      title: "پلاسمای غنی از پلاکت",
      active: false,
    },
    {
      title: "RF درمان با فرکانس رادویی",
      active: false,
    },
    {
      title: "هایفوتراپی",
      active: false,
    },
    {
      title: "کرایوتراپی",
      active: false,
    },
    {
      title: "لیفت با نخ",
      active: false,
    },
  ]);
  // application user context
  const [appUsers, setAppUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLogIn, setUserLogin] = useState(true);

  const [displayExpertise, setDisplayExpertise] = useState("فیلر");

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
    displayExpertise,
    setDisplayExpertise,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
