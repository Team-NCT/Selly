import style from "./ShareDropdown.module.scss";
import { ShareDropDownProps } from "./ShareDropDown.types";

const ShareDropdown = ({ url = "" }: ShareDropDownProps) => {
  //TODO_JK: 공유하기 로직 추가
  const clickShareButton = () => {
    alert("공유");
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
