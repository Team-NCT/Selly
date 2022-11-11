import useInterval from "@/hooks/useInterval";
import { useState } from "react";
import style from "./LoadingModal.module.scss";

const LoadingModal = () => {
  const [index, setIndex] = useState<number>(0);

  const desc = [
    "해양 쓰레기는 염분이 많아서 처리할 때 비용이 일반 쓰레기보다 두배나 더 든대요 😢",
    "쓰레기가 모여서 만들어진 태평양의 쓰레기섬 크기가 한반도의 16배가 넘는대요 😨",
    "바다 위 쓰레기 섬에 생명체들이 산다는데.. 어떤 모습으로 우리 앞에 나타날까요?",
    "해양쓰레기는 해양생태를 넘어서 우리의 식품 안전/인체 건강까지 위협하고 있어요 🤢",
    "푸르게와 함께 푸르른 바다를 만들어봐요 🌊",
    "해양쓰레기는 다른 쓰레기와 다르게 위치 파악이 어려워서 더 수거하기가 어렵대요 😞",
    "우리가 환경을 파괴한다면, 우리는 사회를 가질 수 없어요. - 마가렛 미드",
    "환경은 파괴할 누군가의 소유물이 아닙니다. 보호하는 것은 우리 모두의 책임입니다. - 모히스 아가디",
    "지을 수 있는 행성이 없다면 집이 무슨 소용이 있을까요? - 헨리 데이비드 소로",
    "우리가 지구와 세계에게 하는 일은 그대로 우리 스스로에게 돌아옵니다. -크리스 메이저",
    "약 1백만 마리의 바닷새와 10만 마리의 해양 포유류가 매년 오염으로 죽어가고 있어요 🐳🩹",
    "해마다 100억 kg 이상의 해양 쓰레기가 바다로 던져집니다.",
    "푸르게와 함께 지속 가능한 바다를 만들어가요 🌎",
  ];

  useInterval(() => {
    setIndex((prev) => {
      if (prev < 12) {
        return (prev += 1);
      } else {
        return 0;
      }
    });
  }, 4000);
  return (
    <div className={style.container}>
      <div className={style.loader}>
        <div className={style.loader_dot} />
        <div className={style.loader_dot} />
        <div className={style.loader_dot} />
        <div className={style.loader_dot} />
        <div className={style.loader_dot} />
        <div className={style.loader_dot} />
      </div>
      <div>{desc[index]}</div>
    </div>
  );
};

export default LoadingModal;
