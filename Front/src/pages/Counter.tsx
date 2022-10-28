import { useAppDispatch, useAppSelector } from "@/hooks/useStore";

// * action creator, selector를 import한다.
import { selectCounter, increment, decrement } from "@/redux/slices/counterSlice";

// * 함수형 컴포넌트
const Counter = () => {
  //* hooks에 정의한 useAppSelector함수를 이용하여 State를 가져온다.
  //* useSelector()함수 대신에 사용한다.
  const { counter } = useAppSelector(selectCounter);

  // * hooks에 정의한 useAppDispatch()함수를 재 정의 한다.
  // * useDispatch()함수 대신에 사용한다.
  const dispatch = useAppDispatch();

  return (
    <main>
      <h1>Test</h1>
      <h2> {counter} </h2>
      {/* acion 크리에이터를 활용하여 action을 dispatch한다! */}
      <button onClick={() => dispatch(increment(5))}>+5</button>
      <button onClick={() => dispatch(decrement(5))}>-5</button>
    </main>
  );
};

export default Counter;
