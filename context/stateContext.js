import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [menuMobile, setMenuMobile] = useState(false);

  const stateContext = {
    menuMobile,
    setMenuMobile,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
