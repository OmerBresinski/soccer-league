import { useQuery } from "@tanstack/react-query";
import { data } from "./data";

export const useLeagues = () => {
  return useQuery({
    queryKey: ["leagues"],
    queryFn: (): (typeof data)["/leagues"] => {
      return data["/leagues"];
    },
  });
};
