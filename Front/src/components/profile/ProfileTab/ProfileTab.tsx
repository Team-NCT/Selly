import { Neon } from "@/components/common";
import { useState } from "react";
import style from "./ProfileTab.module.scss";

const ProfileTab = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Fractions");
  const tabItems = ["Fractions", "Collected", "ForSale", "Created", "Bookmark"];
  return (
    <section className={style.section}>
      {tabItems.map((item) => (
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
      ))}
    </section>
  );
};

export default ProfileTab;
