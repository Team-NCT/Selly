import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface ProfleDataState {
  profileData: {
    nickname: string;
    introduction: string;
    image: string;
    banner: string;
    imageFile: File | null;
    bannerFile: File | null;
  };
}

const initialState: ProfleDataState = {
  profileData: {
    nickname: "둘기",
    introduction: "자기 소개",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    banner: "https://cdn.mos.cms.futurecdn.net/jbCNvTM4gwr2qV8X8fW3ZB-970-80.png.webp",
    imageFile: null,
    bannerFile: null,
  },
};

const slice = createSlice({
  name: "profileData",
  initialState,

  reducers: {
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
    setProfileData: (
      state,
      action: PayloadAction<{
        nickname: string;
        introduction: string;
        image: string;
        banner: string;
      }>
    ) => {
      state.profileData.nickname = action.payload.nickname;
      state.profileData.introduction = action.payload.introduction;
      state.profileData.image = action.payload.image;
      state.profileData.banner = action.payload.banner;
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
