import { Username, Bio, WalletAddress, ProfileImg, BannerImg } from "./components";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";
import { selectProfleStatus } from "@/store/profileStatusSlice";
import style from "./Form.module.scss";
import { Button } from "@/components/common";
import { useFetchSettingsMutation, useFetchUserProfileQuery } from "@/api/server/userAPI";
import { uploadImage } from "@/api/IPFS";
import { selectProfileData } from "@/store/profileDataSlice";
import { useNavigate } from "react-router-dom";
import { OpenAlertArg, useAlert } from "@/hooks/useAlert";

const Form = () => {
  const { address, userId } = useAppSelector(selectAccount);
  const { profleStatus } = useAppSelector(selectProfleStatus);
  const profileData = useAppSelector(selectProfileData);
  const { openAlertModal } = useAlert();
  useFetchUserProfileQuery({
    profileId: Number(userId),
    userId: Number(userId),
  });
  const walletAddress = address ? address : "";
  const [settings] = useFetchSettingsMutation();
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as unknown as HTMLInputElement[];
    const nickname = target[0].value;
    const introduction = target[1].value;
    const imageFile = target[2].files ? target[2].files[0] : null;
    const bannerFile = target[3].files ? target[3].files[0] : null;

    try {
      const imageLink = imageFile ? await uploadImage(imageFile) : profileData.image;
      const bannerLink = bannerFile ? await uploadImage(bannerFile) : profileData.banner;

      const data = {
        nickname: nickname,
        introduction: introduction,
        image: imageLink,
        banner: bannerLink,
      };
      await settings({ data: data, userId: Number(userId) });
      navigate(`/profile/${userId}`);
    } catch {
      const data: OpenAlertArg = {
        content: "개인정보 수정에 실패 하셨습니다.",
        style: "error",
        icon: true,
      };
      openAlertModal(data);
    }
  };

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <section className={style.section}>
        <div className={style.leftSection}>
          <Username />
          <Bio />
          <WalletAddress address={walletAddress} />
        </div>
        <div className={style.rightSection}>
          <ProfileImg />
          <BannerImg />
        </div>
      </section>
      <div className={style.button}>
        <Button disabled={!(profleStatus.bioStatus && profleStatus.usernameStatus)}>Save</Button>
      </div>
    </form>
  );
};

export default Form;
