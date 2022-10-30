export const NeonColor = [
  "sherbet",
  "sherbet100",
  "sherbet150",
  "muscat",
  "muscat100",
  "muscat150",
  "muscat200",
  "muscat250",
  "marmalade",
  "marmalade100",
  "marmalade150",
  "lilac",
  "lilac100",
  "lilac150",
  "lilac200",
  "lilac250",
  "ocean",
  "ocean100",
  "ocean150",
  "ocean200",
  "ocean250",
] as const;
export type NeonColorType = typeof NeonColor[number];

export const PositionH = ["top", "bottom"] as const;
export type PositionHType = typeof PositionH[number];

export const PositionW = ["right", "left"] as const;
export type PositionWType = typeof PositionW[number];

export type NeonNumberType = number;

export interface NeonProps {
  /**
   * 텍스트
   */
  children: React.ReactNode;

  /**
   * 네온 색상
   */
  color: NeonColorType;

  /**
   * 네온 top/bottom
   */
  positionH: PositionHType;

  /**
   * 네온 right/left
   */
  positionW: PositionWType;

  /**
   * 네온 가로길이 1%~100%
   */
  width?: NeonNumberType;

  /**
   * 네온 세로길이 1%~100%
   */
  height?: NeonNumberType;

  /**
   * 네온 수직위치 1%~100%
   */
  vertical?: NeonNumberType;

  /**
   * 네온 수평위치 1%~100%
   */
  horizontal?: NeonNumberType;
}
