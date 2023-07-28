import classes from "./page.module.scss";
import Menu from "@/components/Menu";

export default function Home() {
  return (
    <main className={classes.main}>
      <Menu />
    </main>
  );
}
