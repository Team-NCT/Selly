import { Neon, SelectBox } from "@/components/common";
import { MOBILE } from "@/constants/size";
import { getViewportSize } from "@/helpers/utils/getViewportSize";
import { useState, useCallback, useEffect } from "react";

import style from "./ProfileTab.module.scss";

const ProfileTab = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Fractions");
  const [windowWidth, setWindowWidth] = useState(getViewportSize().width);
  const tabItems = ["Fractions", "Collected", "ForSale", "Created", "Bookmark"];
  useEffect(() => {
    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  });

  const windowResize = useCallback(() => {
    setWindowWidth(getViewportSize().width);
  }, [setWindowWidth]);
  return (
    <section className={style.section}>
      {windowWidth < 550 ? (
        <div className={style.mobileTab}>
          <span>NFT Category</span>
          <div className={style.selectBox}>
            <SelectBox list={tabItems} category="profileTab" />
          </div>
        </div>
      ) : (
        tabItems.map((item) => (
          <div
            key={item}
            onClick={() => {
              setSelectedTab(item);
            }}
            className={selectedTab === item ? "" : style.defualt}
            aria-hidden>
            <Neon
              color="muscat"
              positionH="bottom"
              positionW="right"
              width={selectedTab === item ? 50 : 0}>
              {item}
            </Neon>
          </div>
        ))
      )}
    </section>
  );
};

export default ProfileTab;
