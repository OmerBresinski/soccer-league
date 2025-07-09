import { createContext, useState, type ReactNode, useContext } from "react";

type LeagueContextType = {
  leagueId: number;
  setLeagueId: (id: number) => void;
};

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider = ({ children }: { children: ReactNode }) => {
  const [leagueId, setLeagueId] = useState(1);

  return (
    <LeagueContext.Provider value={{ leagueId, setLeagueId }}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeague = () => {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error("useLeague must be used within a LeagueProvider");
  }
  return context;
};
