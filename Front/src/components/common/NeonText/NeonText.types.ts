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

export interface NeonTextProps {
  /**
   * 텍스트
   */
  children: React.ReactNode;

  /**
   * 네온 색상
   */
  color: NeonColorType;
}
