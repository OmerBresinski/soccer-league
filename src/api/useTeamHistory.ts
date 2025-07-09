import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { data } from "./data.ts";
import type { Match } from "@/types.ts";

export const useTeamHistory = (
  {
    teamId,
    leagueId,
  }: {
    teamId: number | null;
    leagueId: number;
  },
  options?: Omit<UseQueryOptions<readonly Match[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["teamHistory", { teamId, leagueId }],
    queryFn: () => getTeamHistory({ teamId, leagueId }),
    ...options,
  });
};

const getTeamHistory = async ({
  teamId,
  leagueId,
}: {
  teamId: number | null;
  leagueId: number;
}): Promise<readonly Match[]> => {
  if (teamId === null) {
    return [];
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data[
    `/history/${leagueId}/${teamId}` as keyof typeof data
  ] as readonly Match[];
};
