import { useQuery } from "@tanstack/react-query";
import { data } from "./data.ts";

export const useRound = ({
  round,
  leagueId,
}: {
  round: number;
  leagueId: number;
}) => {
  return useQuery({
    queryKey: ["round", { round, leagueId }],
    queryFn: () => getRound({ round, leagueId }),
  });
};

const getRound = async ({
  round,
  leagueId,
}: {
  round: number;
  leagueId: number;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data[`/round/${leagueId}/${round}` as keyof typeof data];
};
