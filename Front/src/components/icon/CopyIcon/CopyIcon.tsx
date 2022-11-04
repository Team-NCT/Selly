import style from "./CopyIcon.module.scss";

export type Props = {
  disabled?: boolean;
};

const CopyIcon = ({ disabled }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
      <path
        d="M3.896 19.167q-.834 0-1.438-.605-.604-.604-.604-1.437V4.583h2.042v12.542h10.5v2.042Zm4.083-4.084q-.833 0-1.437-.604-.604-.604-.604-1.437V2.875q0-.833.604-1.437.604-.605 1.437-.605h8.125q.834 0 1.438.605.604.604.604 1.437v10.167q0 .833-.604 1.437-.604.604-1.438.604Zm0-2.041h8.125V2.875H7.979v10.167Zm0 0V2.875v10.167Z"
        className={disabled ? style.disabled : ""}
      />
    </svg>
  );
};

export default CopyIcon;
