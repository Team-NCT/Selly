//* NFT 판매 페이지에서 판매 정보를 저장하는 store

import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

// State의 타입을 지정한다.
export interface SellInfoState {
  category: string;
  code: string;
  num: string;
  price: string;
}

// State 초기값
const initialState: SellInfoState = {
  category: "Digital",
  code: "",
  num: "",
  price: "",
};

//* slice를 생성합니다.
//* slice는 초기값, 리듀서, 액션 크리에이터, 액션 타입을 한 번에 관리할 수 있도록 도와주는 함수이다.
const slice = createSlice({
  name: "sellInfo",
  initialState,

  //! 동기적인 작업을 수행하는 action 객체를 생성한다.
  // * 원래 redux는 state를 직접 수정할 수 없다.
  // * 그러나 redux가 사용하는 immer라이브러리가 아래와 같은 코드를 감지하고 자동으로 원래 상태를 복제하여 새로운 상태 객체를 생성하여 오버라이드한다.
  reducers: {
    setSellInfo: (state, action: PayloadAction<SellInfoState>) => {
      state.category = action.payload.category;
      state.code = action.payload.code;
      state.num = action.payload.num;
      state.price = action.payload.price;
    },
  },
});

//* createSelector는 성능 관리를 위해 생성하고 export한다.
//* 상태가 변하지 않으면 캐시된 데이터를 반환한다.
export const selectSellInfo = createSelector(
  // 입력 셀렉터
  (state: RootState) => state.sellInfo,

  // 출력 셀렉터
  (sellInfo) => sellInfo
);

// * 생성한 액션 객체를 export 한다.
export const { setSellInfo } = slice.actions;
export default slice.reducer;
