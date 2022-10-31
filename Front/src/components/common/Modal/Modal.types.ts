export interface ModalProps {
  /**
   * Modal 안에 들어갈 jsx 요소  ex) <div>hihi</div>
   */
  children: React.ReactNode;
  /**
   * Modal 배경을 클릭했을 시 modal이 닫히는 함수
   */
  close?: () => void;
}
