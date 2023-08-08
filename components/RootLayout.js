import { Fragment } from "react";
import Menu from "@/components/Menu";

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <div className="menu">
        <Menu />
      </div>
      <main>{children}</main>
    </Fragment>
  );
}
