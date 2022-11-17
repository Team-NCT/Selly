import { Neon } from "@/components/common";
import { useScrollCount } from "@/hooks";
import style from "./SocialProof.module.scss";

const SocialProof = () => {
  //TODO socialProof API 연결 예정
  const socialProofData = {
    totalNFT: 100,
    totalSell: 213,
    maxSell: 20,
    totalUser: 60,
  };

  const totalNFT = useScrollCount(socialProofData.totalNFT);
  const totalSell = useScrollCount(socialProofData.totalSell);
  const maxSell = useScrollCount(socialProofData.maxSell);
  const totalUser = useScrollCount(socialProofData.totalUser);

  return (
    <section className={style.section}>
      <header className={style.title}>
        <Neon color="ocean" positionH="top" positionW="right">
          Selly
        </Neon>
        &nbsp;
        <Neon color="muscat" positionH="bottom" positionW="right">
          Statistics
        </Neon>
      </header>
      <div className={style.proof_section}>
        <div className={style.proof_content}>
          <span className={style.proof_number} {...totalNFT}>
            0
          </span>
          <Neon positionH="top" positionW="right" color="muscat150" width={40}>
            <h1 className={style.proof_title}>총 NFT 수</h1>
          </Neon>
        </div>
        <div className={style.proof_content}>
          <Neon positionH="top" positionW="left" color="lilac" width={50}>
            <h1 className={style.proof_title}>총 거래금액</h1>
          </Neon>
          <span>
            <span className={style.proof_number} {...totalSell}>
              0
            </span>
            <span className={style.proof_number_type}> ETH</span>
          </span>
        </div>
        <div className={style.proof_content}>
          <span>
            <span className={style.proof_number} {...maxSell}>
              0
            </span>
            <span className={style.proof_number_type}> ETH</span>
          </span>
          <Neon positionH="top" positionW="left" color="marmalade" width={50}>
            <h1 className={style.proof_title}>최대 낙찰금액</h1>
          </Neon>
        </div>
        <div className={style.proof_content}>
          <Neon positionH="bottom" positionW="left" color="ocean150" width={50}>
            <h1 className={style.proof_title}>총 회원 수</h1>
          </Neon>
          <span>
            <span className={style.proof_number} {...totalUser}>
              0
            </span>
            <span className={style.proof_number_type}> 명</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
