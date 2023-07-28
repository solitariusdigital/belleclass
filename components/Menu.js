import classes from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";

export default function Menu() {
  return (
    <div className={classes.container}>
      <div className={classes.largeMenu}>
        <p>LOGO</p>
        <p className={classes.link}>Menu</p>
        <p className={classes.link}>Menu</p>
        <p className={classes.link}>Menu</p>
        <button>Click</button>
      </div>
      <div className={classes.smallMenu}>
        <p>LOGO</p>
        <MenuIcon className={classes.menuIcon} />
      </div>
    </div>
  );
}
