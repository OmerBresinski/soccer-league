import { useQuery } from "@tanstack/react-query";
import { data } from "./data.ts";

export const useSquad = ({
  squadId,
  leagueId,
}: {
  squadId: number;
  leagueId: number;
}) => {
  return useQuery({
    queryKey: ["squad", { squadId, leagueId }],
    queryFn: () => getSquad({ squadId, leagueId }),
  });
};

const getSquad = async ({
  squadId,
  leagueId,
}: {
  squadId: number;
  leagueId: number;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data[`/squad/${leagueId}/${squadId}` as keyof typeof data];
};
