import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface ProfleDataState {
  profileData: {
    userId: number;
    wallet: string;
    nickname: string;
    introduction: string;
    image: string;
    banner: string;
    imageFile: File | null;
    bannerFile: File | null;
    followerCnt: number;
    followingCnt: number;
    myFollowing: boolean;
  };
}

const initialState: ProfleDataState = {
  profileData: {
    userId: 0,
    wallet: "",
    nickname: "",
    introduction: "",
    image: "",
    banner: "",
    imageFile: null,
    bannerFile: null,
    followerCnt: 0,
    followingCnt: 0,
    myFollowing: false,
  },
};

const slice = createSlice({
  name: "profileData",
  initialState,

  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.profileData.userId = action.payload;
    },
    setWallet: (state, action: PayloadAction<string>) => {
      state.profileData.wallet = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.profileData.nickname = action.payload;
    },
    setIntroduction: (state, action: PayloadAction<string>) => {
      state.profileData.introduction = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.profileData.image = action.payload;
    },
    setBanner: (state, action: PayloadAction<string>) => {
      state.profileData.banner = action.payload;
    },
    setImageFile: (state, action: PayloadAction<File | null>) => {
      state.profileData.imageFile = action.payload;
    },
    setBannerFile: (state, action: PayloadAction<File | null>) => {
      state.profileData.bannerFile = action.payload;
    },
    setFollowerCnt: (state, action: PayloadAction<number>) => {
      state.profileData.followerCnt = action.payload;
    },
    setFollowingCnt: (state, action: PayloadAction<number>) => {
      state.profileData.followingCnt = action.payload;
    },
    setMyFollowing: (state, action: PayloadAction<boolean>) => {
      state.profileData.myFollowing = action.payload;
    },
    setProfileData: (
      state,
      action: PayloadAction<{
        userId: number;
        wallet: string;
        nickname: string;
        introduction: string;
        image: string;
        banner: string;
        followerCnt: number;
        followingCnt: number;
        myFollowing: boolean;
      }>
    ) => {
      state.profileData.userId = action.payload.userId;
      state.profileData.wallet = action.payload.wallet;
      state.profileData.nickname = action.payload.nickname;
      state.profileData.introduction = action.payload.introduction;
      state.profileData.image = action.payload.image;
      state.profileData.banner = action.payload.banner;
      state.profileData.followerCnt = action.payload.followerCnt;
      state.profileData.followingCnt = action.payload.followingCnt;
      state.profileData.myFollowing = action.payload.myFollowing;
    },
  },
});

export const selectProfileData = createSelector(
  // 입력 셀렉터
  (state: RootState) => state.profileData,

  // 출력 셀렉터
  (profileData) => profileData
);

export const {
  setUserId,
  setWallet,
  setNickname,
  setIntroduction,
  setImage,
  setBanner,
  setImageFile,
  setBannerFile,
  setFollowerCnt,
  setFollowingCnt,
  setMyFollowing,
  setProfileData,
} = slice.actions;
export default slice.reducer;
