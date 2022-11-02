import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Neon, TextInput, ProfileImage } from "@/components/common/index";
import styles from "./Navbar.module.scss";
import logoImage from "@/assets/images/logo.png";
import { useInputState } from "@/hooks";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
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

  const location = useLocation().pathname;

  //* hover시 Neon width 변화
  const [explore, setExplore] = useState(50);
  const [create, setCreate] = useState(50);
  const [sell, setSell] = useState(50);
  const [wallet, setWallet] = useState(50);
  return (
    <>
      {menuToggle ? (
        <div className={styles.overlay} onClick={() => setMenuToggle(false)} aria-hidden="true" />
      ) : (
        ""
      )}
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
            <li
              className={styles.dropdown}
              onMouseOver={() => {
                setExplore(100);
              }}
              onMouseOut={() => {
                setExplore(50);
              }}
              onFocus={() => {
                setExplore(100);
              }}
              onBlur={() => {
                setExplore(50);
              }}
              onClick={() => setMenuToggle(false)}
              aria-hidden="true">
              <NavLink to="/test">
                <Neon
                  color="ocean"
                  positionH="top"
                  positionW="right"
                  width={location == "/explore" ? 100 : explore}>
                  Explore
                </Neon>
              </NavLink>
              <div className={styles.dropdown_content}>
                <NavLink to="/test" className={styles.dropdown_item}>
                  ALL NFTS
                </NavLink>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Art
                </NavLink>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Photography
                </NavLink>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Sports
                </NavLink>
              </div>
            </li>
            <li
              onMouseOver={() => {
                setCreate(100);
              }}
              onMouseOut={() => {
                setCreate(50);
              }}
              onFocus={() => {
                setCreate(100);
              }}
              onBlur={() => {
                setCreate(50);
              }}
              onClick={() => setMenuToggle(false)}
              aria-hidden="true">
              <NavLink to="/test">
                <Neon
                  color="muscat"
                  positionH="bottom"
                  positionW="right"
                  width={location == "/create" ? 100 : create}>
                  Create
                </Neon>
              </NavLink>
            </li>
            <li
              onMouseOver={() => {
                setSell(100);
              }}
              onMouseOut={() => {
                setSell(50);
              }}
              onFocus={() => {
                setSell(100);
              }}
              onBlur={() => {
                setSell(50);
              }}
              onClick={() => setMenuToggle(false)}
              aria-hidden="true">
              <NavLink to="/test">
                <Neon
                  color="muscat150"
                  positionH="bottom"
                  positionW="left"
                  width={location == "/sell" ? 100 : sell}>
                  Sell
                </Neon>
              </NavLink>
            </li>
          </ul>
          {isLogin ? (
            <div className={`${styles.nav_user} ${styles.dropdown_user}`}>
              <ProfileImage size="xxs" profileStyle="round" />
              <h5 className={styles.nav_username}>김김작가작가작가</h5>
              <div className={styles.dropdown_content_user}>
                <h5>Balance</h5>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Profile
                </NavLink>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Collected
                </NavLink>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Created
                </NavLink>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Favorited
                </NavLink>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Settings
                </NavLink>
                <NavLink to="/test" className={styles.dropdown_item}>
                  Logout
                </NavLink>
              </div>
            </div>
          ) : (
            <li
              onMouseOver={() => {
                setWallet(100);
              }}
              onMouseOut={() => {
                setWallet(50);
              }}
              onFocus={() => {
                setWallet(100);
              }}
              onBlur={() => {
                setWallet(50);
              }}>
              <Neon color="lilac" positionH="top" positionW="right" width={wallet}>
                <span className={`material-icons-outlined ${styles.wallet}`}>
                  account_balance_wallet
                </span>
              </Neon>
            </li>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
