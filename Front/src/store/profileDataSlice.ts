import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface ProfleDataState {
  nickname: string;
  introduction: string;
  image: string;
  banner: string;
  imageFile: File | null;
  bannerFile: File | null;
}

const initialState: ProfleDataState = {
  nickname: "",
  introduction: "",
  image: "",
  banner: "",
  imageFile: null,
  bannerFile: null,
};

const slice = createSlice({
  name: "profileData",
  initialState,

  reducers: {
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setIntroduction: (state, action: PayloadAction<string>) => {
      state.introduction = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setBanner: (state, action: PayloadAction<string>) => {
      state.banner = action.payload;
    },
    setImageFile: (state, action: PayloadAction<File | null>) => {
      state.imageFile = action.payload;
    },
    setBannerFile: (state, action: PayloadAction<File | null>) => {
      state.bannerFile = action.payload;
    },
    setProfileData: (
      state,
      action: PayloadAction<{
        nickname: string;
        introduction: string;
        image: string;
        banner: string;
      }>
    ) => {
      state.nickname = action.payload.nickname;
      state.introduction = action.payload.introduction;
      state.image = action.payload.image;
      state.banner = action.payload.banner;
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
  setNickname,
  setIntroduction,
  setImage,
  setBanner,
  setImageFile,
  setBannerFile,
  setProfileData,
} = slice.actions;
export default slice.reducer;
