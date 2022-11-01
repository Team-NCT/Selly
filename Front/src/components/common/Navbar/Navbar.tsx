import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Neon, TextInput, ProfileImage } from "@/components/common/index";
import styles from "./Navbar.module.scss";
import logoImage from "@/assets/images/logo.png";
import { useInputState } from "@/hooks/useInputState";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [value, handleInputChange] = useInputState();
  const [menuToggle, setMenuToggle] = useState(false);

  //* 아래로 스크롤 시 navbar 사라짐
  const [ScrollY, setHeaderColor] = useState(0);
  const [HeaderStatus, setHeaderStatus] = useState(false);

  const handleColor = () => {
    setHeaderColor(window.pageYOffset);
    ScrollY > 72 ? setHeaderStatus(true) : setHeaderStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleColor);
    };
    handleColor();
    watch();
    return () => {
      window.removeEventListener("scroll", handleColor);
    };
  });

  //* 외부 클릭시 메뉴 닫힘
  return (
    <>
      <nav className={HeaderStatus ? styles.nav_opacity : ""}>
        <h2 className={styles.nav_title}>사이트 네비게이션</h2>
        <div className={styles.nav_head}>
          <NavLink to="/">
            <img src={logoImage} alt="selly" />
          </NavLink>
          <button
            className={styles.navBtn}
            onClick={() => (menuToggle ? setMenuToggle(false) : setMenuToggle(true))}
          />
        </div>
        {/* 임시 검색 */}
        <div className={menuToggle ? styles.nav_down : styles.nav_row}>
          <div className={styles.nav_search}>
            <TextInput
              id="input-text"
              status={true}
              maxLength={10}
              value={value}
              handleInputChange={handleInputChange}
            />
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
