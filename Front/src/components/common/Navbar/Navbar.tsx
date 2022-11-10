import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Neon, ProfileImage } from "@/components/common";
import { SearchInput } from "@/components/search";
import styles from "./Navbar.module.scss";
import logoImage from "@/assets/images/logo.png";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { useLoginMutation } from "@/api/server/loginAPI";
import { loginSelly } from "@/api/blockchain";

const Navbar = () => {
  //* account 정보
  const { account } = useAppSelector(selectAccount);
  //* 로그인 API
  const [login] = useLoginMutation();

  const loginHandler = () => {
    loginSelly(login);
  };

  const [menuToggle, setMenuToggle] = useState(false);

  //* 아래로 스크롤 시 navbar 사라짐
  const [ScrollY, setHeaderColor] = useState(0);
  const [HeaderStatus, setHeaderStatus] = useState(false);

  const handleColor = () => {
    setHeaderColor(window.pageYOffset);
    ScrollY > 64 ? setHeaderStatus(true) : setHeaderStatus(false);
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
        <div className={menuToggle ? styles.nav_down : styles.nav_row}>
          <SearchInput />
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
              <NavLink to="/explore">
                <Neon
                  color="ocean"
                  positionH="top"
                  positionW="right"
                  width={location == "/explore" ? 100 : explore}>
                  Explore
                </Neon>
              </NavLink>
              <div className={styles.dropdown_content}>
                <NavLink to="/explore/all" className={styles.dropdown_item}>
                  ALL NFTS
                </NavLink>
                <NavLink to="/explore/digital" className={styles.dropdown_item}>
                  Digital
                </NavLink>
                <NavLink to="/explore/analog" className={styles.dropdown_item}>
                  Analog
                </NavLink>
                <NavLink to="/explore/photography" className={styles.dropdown_item}>
                  Photography
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
              <NavLink to="/create">
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
              <NavLink to="/sell">
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
          {account.address ? (
            <div className={`${styles.nav_user} ${styles.dropdown_user}`}>
              <ProfileImage size="xxs" profileStyle="round" />
              <h5 className={styles.nav_username}>김김작가작가작가</h5>
              <div className={styles.dropdown_content_user}>
                <h5>Balance</h5>
                <NavLink to={`/profile/${account.userId}`} className={styles.dropdown_item}>
                  Profile
                </NavLink>
                <NavLink to="/settings" className={styles.dropdown_item}>
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
              <button onClick={loginHandler}>
                <Neon color="lilac" positionH="top" positionW="right" width={wallet}>
                  <span className={`material-icons-outlined ${styles.wallet}`}>
                    account_balance_wallet
                  </span>
                </Neon>
              </button>
            </li>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
