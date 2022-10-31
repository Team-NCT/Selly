import styles from "./Navbar.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import { Neon, TextInput, ProfileImage } from "@/components/common/index";
import { useState } from "react";
import logoImage from "@/assets/images/logo.png";
import { useInputState } from "@/hooks/useInputState";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [value, handleInputChange] = useInputState();
  return (
    <>
      <nav>
        <h2 className={styles.nav_title}>사이트 네비게이션</h2>
        <div className={styles.nav_container}>
          <div className={styles.nav_head}>
            <NavLink to="/">
              <img src={logoImage} alt="selly" />
            </NavLink>
            {/* 임시 검색 */}
            <div className={styles.nav_search}>
              <TextInput
                id="input-text"
                status={true}
                maxLength={10}
                value={value}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
          <ul className={styles.nav_list}>
            <li className={styles.dropdown}>
              <NavLink to="/test">
                <Neon color="ocean" positionH="top" positionW="right">
                  Explore
                </Neon>
              </NavLink>
              <div className={styles.dropdown_content}>
                <NavLink to="/test">ALL NFTS</NavLink>
                <NavLink to="/test">Art</NavLink>
                <NavLink to="/test">Photography</NavLink>
                <NavLink to="/test">Sports</NavLink>
              </div>
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
            <ProfileImage size="xs" profileStyle="round" />
          ) : (
            <div className={styles.nav_user}>
              <Neon color="lilac" positionH="top" positionW="right">
                <span className={`material-icons-outlined ${styles.wallet}`}>
                  account_balance_wallet
                </span>
              </Neon>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
