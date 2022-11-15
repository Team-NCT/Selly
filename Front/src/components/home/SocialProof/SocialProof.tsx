import { Neon } from "@/components/common";
import { useCountNum } from "@/hooks";
import style from "./SocialProof.module.scss";

const SocialProof = () => {
  //TODO socialProof API 연결 예정
  const socialProofData = {
    totalNFT: 3027,
    totalSell: 213.13,
    maxSell: 20.21,
    totalUser: 873,
  };

  const totalNFT = useCountNum(socialProofData.totalNFT);
  const totalSell = useCountNum(socialProofData.totalSell);
  const maxSell = useCountNum(socialProofData.maxSell);
  const totalUser = useCountNum(socialProofData.totalUser);
  return (
    <section className={style.section}>
      <span className={style.title}>
        <Neon positionH="bottom" positionW="right" color="blackberry" width={35} horizontal={4}>
          Selly Statistics
        </Neon>
      </span>
      <div className={style.proof_section}>
        <div className={style.proof_content}>
          <Neon positionH="top" positionW="right" color="muscat150">
            <span className={style.proof_number}>{totalNFT}</span>
          </Neon>
          <h1 className={style.proof_title}>총 NFT 수</h1>
        </div>
        <div className={style.proof_content}>
          <h1 className={style.proof_title}>총 거래금액</h1>
          <Neon positionH="bottom" positionW="left" color="lilac">
            <span className={style.proof_number}>{totalSell}</span>
            <span className={style.proof_number_type}> ETH</span>
          </Neon>
        </div>
        <div className={style.proof_content}>
          <Neon positionH="top" positionW="left" color="marmalade">
            <span className={style.proof_number}>{maxSell}</span>
            <span className={style.proof_number_type}> ETH</span>
          </Neon>
          <h1 className={style.proof_title}>최대 낙찰금액</h1>
        </div>
        <div className={style.proof_content}>
          <h1 className={style.proof_title}>총 회원 수</h1>
          <Neon positionH="bottom" positionW="left" color="ocean150">
            <span className={style.proof_number}>{totalUser}</span>
            <span className={style.proof_number_type}> 명</span>
          </Neon>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
