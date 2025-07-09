export interface League {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  league: League;
}

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  captain: boolean;
}

export interface Goal {
  home: boolean;
  id: number;
  scorer: Player;
  minute: number;
}

export interface Match {
  id: number;
  round: number;
  homeTeam: Team;
  awayTeam: Team;
  goals: readonly Goal[];
}

export interface SquadPlayer {
  id: number;
  firstName: string;
  lastName: string;
  captain: boolean;
}
