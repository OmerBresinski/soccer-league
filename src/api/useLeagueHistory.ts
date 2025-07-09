import { useQuery } from "@tanstack/react-query";
import { data } from "./data.ts";

export const useLeagueHistory = (leagueId: number) => {
  return useQuery({
    queryKey: ["leagueHistory", { leagueId }],
    queryFn: () => getLeagueHistory({ leagueId }),
  });
};

const getLeagueHistory = async ({ leagueId }: { leagueId: number }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data[`/history/${leagueId}` as keyof typeof data];
};
