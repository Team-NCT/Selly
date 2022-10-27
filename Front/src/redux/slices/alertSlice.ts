//* state의 타입
interface AlertState {
  //* 알럿 상태 (true: 알럿이 보이는 상태, false: 알럿이 보이지 않는 상태)
  status: boolean;

  //* 알럿 문구
  content: React.ReactNode;

  //* 알럿 스타일
  styles?
}
