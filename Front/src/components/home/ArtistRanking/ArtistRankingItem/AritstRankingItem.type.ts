import { ArtistRankingType } from "@/api/server/userAPI/userAPI.types";

export type ArtistRankingProps = ArtistRankingType & {
  rank: number;
};
