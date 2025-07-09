import { useQuery } from "@tanstack/react-query";
import { data } from "./data.ts";

export const useTeamHistory = ({
  teamId,
  leagueId,
}: {
  teamId: number;
  leagueId: number;
}) => {
  return useQuery({
    queryKey: ["teamHistory", { teamId, leagueId }],
    queryFn: () => getTeamHistory({ teamId, leagueId }),
  });
};

const getTeamHistory = async ({
  teamId,
  leagueId,
}: {
  teamId: number;
  leagueId: number;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data[`/history/${leagueId}/${teamId}` as keyof typeof data];
};
