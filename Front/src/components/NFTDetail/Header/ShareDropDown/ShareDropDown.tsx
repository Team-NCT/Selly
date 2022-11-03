import style from "./ShareDropdown.module.scss";
import { ShareDropDownProps } from "./ShareDropDown.types";
import { useKakaoShare } from "@/hooks";

const ShareDropdown = ({ title, id, imageUrl, url = "" }: ShareDropDownProps) => {
  const { kakaoShare } = useKakaoShare();
  const clickShareButton = () => {
    console.log(title, id, imageUrl);
    kakaoShare({ title, id, imageUrl });
  };
  return (
    <ul className={style.dialog_icon_share}>
      {url && (
        <li>
          <a href={url} target="_blank" rel="noopener noreferrer">
            연결 링크로 이동
          </a>
        </li>
      )}
      <li>
        <button onClick={clickShareButton}>카카오 공유하기</button>
      </li>
    </ul>
  );
};

export default ShareDropdown;
