import style from "./TransactionAuction.module.scss";
import { NFTDetailTransactionProps } from "../";
import { AuctionBidForm, AuctionRegisterForm, AuctionBidFormNotStart } from "./component";

//TODO_JK API 연결
let auctionEndTime: "";
let auctionStatus: true;
let bidPrice: 3.2323;
let lowPrice: 2.1212;

const TransactionAuction = ({ articleId, userId }: NFTDetailTransactionProps) => {
  let status: "NOT_REGISTER" | "NOT_START" | "PROGRESS";

  //* 경매 등록이 되지 않은 상태
  if (!lowPrice) {
    status = "NOT_REGISTER";
    //* 경매가 시작 되지 않은 상태
  } else if (!bidPrice) {
    status = "NOT_START";
    //* 경매가 진행 중인 상태
  } else {
    status = "PROGRESS";
  }

  return (
    <section className={style.NFT_detail_transction_auction}>
      <ul className={style.NFT_detail_transaction_description}>
        <li>
          지분을 <strong>50%</strong>이상 소유하면, 경매를 <strong>등록</strong>할 수 있습니다.
          &nbsp;
        </li>
        <li>
          경매를 등록 시, <strong>최소 경매 시작 가격</strong>을 입력 해야 합니다.
        </li>
        <li>
          낙찰되면, 조각 소유자들에게 소유 지분 만큼 경매 금액이 <strong>배분</strong>됩니다.
        </li>
      </ul>

      {/* 상황에 따라 보여주는 form이 다르다. */}
      {status === "NOT_REGISTER" && <AuctionRegisterForm auctionStatus={auctionStatus} />}
      {status === "NOT_START" && (
        <AuctionBidFormNotStart lowPrice={lowPrice} auctionStatus={auctionStatus} />
      )}
      {status === "PROGRESS" && (
        <AuctionBidForm
          bidPrice={bidPrice}
          auctionStatus={auctionStatus}
          auctionEndTime={auctionEndTime}
        />
      )}
    </section>
  );
};

export default TransactionAuction;
