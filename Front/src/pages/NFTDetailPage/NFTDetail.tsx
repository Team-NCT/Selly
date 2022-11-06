import style from "./NFTDetail.module.scss";
import {
  NFTDetailHeader,
  NFTDetailDescription,
  NFTDetailHistory,
  NFTDetailTransaction,
} from "@/components";

import { args1, args2, args3, args4 } from "./dummy";

const NFTDetail = () => {
  return (
    <>
      <NFTDetailHeader {...args1} />
      <main className={style.NFT_detail}>
        <NFTDetailDescription {...args2} />
        <div>
          <NFTDetailTransaction {...args3} />
          <NFTDetailHistory {...args4} />
        </div>
      </main>
    </>
  );
};

export default NFTDetail;
