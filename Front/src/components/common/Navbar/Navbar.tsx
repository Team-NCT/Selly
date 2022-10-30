import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
import { Neon } from "@/components/common/index";
import { useState } from "react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <nav>
      <h2 className={styles.nav_title}>사이트 네비게이션</h2>
      <NavLink to="/">Selly</NavLink>
      {/* 임시 검색 */}
      <div className={styles.search}>검색</div>
      <ul className={styles.nav_list}>
        <li>
          <NavLink to="/test">
            <Neon color="ocean" positionH="top" positionW="right">
              Explore
            </Neon>
          </NavLink>
        </li>
        <li>
          <NavLink to="/test">
            <Neon color="muscat" positionH="bottom" positionW="right">
              Create
            </Neon>
          </NavLink>
        </li>
        <li>
          <NavLink to="/test">
            <Neon color="muscat150" positionH="bottom" positionW="left">
              Sell
            </Neon>
          </NavLink>
        </li>
      </ul>
      {isLogin ? (
        <></>
      ) : (
        <>
          <span className="material-icons-outlined">account_balance_wallet</span>
        </>
      )}
    </nav>
  );
};

export default Navbar;
