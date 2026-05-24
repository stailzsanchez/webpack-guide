import { Link, Outlet } from "react-router-dom";
import classes from "./App.module.scss";
import About from "@/pages/about/About";

export const App = () => {
  return (
    <div>
      <div>
        <Link to="/about">about</Link>
        <br />
        <Link to="/shop">shop</Link>
      </div>
      Hello
      <button className={classes.button}>Click</button>
      <About />
      <Outlet />
    </div>
  );
};
