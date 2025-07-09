import { useQuery } from "@tanstack/react-query";
import { data } from "./data.ts";

export const useTeams = (teamId: number) => {
  return useQuery({
    queryKey: ["teams", { teamId }],
    queryFn: () => getTeams({ teamId }),
  });
};

const getTeams = async ({ teamId }: { teamId: number }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data[`/teams/${teamId}` as keyof typeof data];
};
