import { Neon, SelectBox } from "@/components/common";
import { getViewportSize } from "@/helpers/utils/getViewportSize";
import { useState, useCallback, useEffect } from "react";
import { Created, ForSale } from "@/components/profile";
import style from "./ProfileTab.module.scss";

const ProfileTab = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Fractions");
  const [windowWidth, setWindowWidth] = useState(getViewportSize().width);
  const tabItems = ["Fractions", "Collected", "ForSale", "Created", "Bookmark"];

  const onChangeTab = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    setSelectedTab(form.value);
  };

  useEffect(() => {
    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  });

  const windowResize = useCallback(() => {
    setTimeout(() => {
      setWindowWidth(getViewportSize().width);
    }, 200);
  }, [setWindowWidth]);

  return (
    <section className={style.section}>
      <div className={style.profileTab}>
        {windowWidth < 550 ? (
          <div className={style.mobileTab}>
            <span>NFT Category</span>
            <div className={style.selectBox}>
              <SelectBox
                list={tabItems}
                category="profileTab"
                onChange={onChangeTab}
                defualtValue={selectedTab}
              />
            </div>
          </div>
        ) : (
          tabItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelectedTab(item);
              }}
              className={selectedTab === item ? style.selected : style.defualt}>
              <Neon
                color="muscat"
                positionH="bottom"
                positionW="right"
                width={selectedTab === item ? 50 : 0}>
                {item}
              </Neon>
            </button>
          ))
        )}
      </div>
      {selectedTab === "Created" && <Created />}
      {selectedTab === "ForSale" && <ForSale />}
    </section>
  );
};

export default ProfileTab;
