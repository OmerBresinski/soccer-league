import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { data } from "./data.ts";
import type { SquadPlayer } from "@/types.ts";

export const useSquad = (
  {
    squadId,
    leagueId,
  }: {
    squadId: number | null;
    leagueId: number;
  },
  options?: Omit<
    UseQueryOptions<readonly SquadPlayer[]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["squad", { squadId, leagueId }],
    queryFn: () => getSquad({ squadId, leagueId }),
    ...options,
  });
};

const getSquad = async ({
  squadId,
  leagueId,
}: {
  squadId: number | null;
  leagueId: number;
}): Promise<readonly SquadPlayer[]> => {
  if (squadId === null) {
    return [];
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = data[`/squad/${leagueId}/${squadId}` as keyof typeof data];
  return result as readonly SquadPlayer[];
};
