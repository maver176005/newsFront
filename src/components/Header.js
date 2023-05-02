import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles["container"]}>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/news">Создать статью</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
