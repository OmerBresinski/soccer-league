import { useState } from "react";
import { useTeams } from "@/api/useTeams";
import { useLeagueHistory } from "@/api/useLeagueHistory";
import { useSquad } from "@/api/useSquad";
import { useTeamHistory } from "@/api/useTeamHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Match, Team, SquadPlayer } from "@/types";

interface TeamStats {
  id: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export function TablesPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const leagueId = 1;

  const { data: teams, isLoading: teamsLoading } = useTeams(leagueId);
  const { data: history, isLoading: historyLoading } =
    useLeagueHistory(leagueId);
  const { data: squad, isLoading: squadLoading } = useSquad({
    squadId: selectedTeamId || 120,
    leagueId: leagueId,
  });
  const { data: teamHistory, isLoading: teamHistoryLoading } = useTeamHistory({
    teamId: selectedTeamId || 120,
    leagueId: leagueId,
  });

  const calculateTeamStats = (): TeamStats[] => {
    if (!teams || !history) return [];

    return (teams as readonly Team[])
      .map((team) => {
        const teamMatches = (history as readonly Match[]).filter(
          (match) =>
            match.homeTeam.id === team.id || match.awayTeam.id === team.id
        );

        let won = 0,
          drawn = 0,
          lost = 0,
          goalsFor = 0,
          goalsAgainst = 0;

        teamMatches.forEach((match) => {
          const homeGoals = match.goals.filter((goal) => goal.home).length;
          const awayGoals = match.goals.filter((goal) => !goal.home).length;

          if (match.homeTeam.id === team.id) {
            goalsFor += homeGoals;
            goalsAgainst += awayGoals;
            if (homeGoals > awayGoals) won++;
            else if (homeGoals === awayGoals) drawn++;
            else lost++;
          } else {
            goalsFor += awayGoals;
            goalsAgainst += homeGoals;
            if (awayGoals > homeGoals) won++;
            else if (awayGoals === homeGoals) drawn++;
            else lost++;
          }
        });

        return {
          id: team.id,
          name: team.name,
          played: teamMatches.length,
          won,
          drawn,
          lost,
          goalsFor,
          goalsAgainst,
          goalDifference: goalsFor - goalsAgainst,
          points: won * 3 + drawn,
        };
      })
      .sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points;
        if (a.goalDifference !== b.goalDifference)
          return b.goalDifference - a.goalDifference;
        return a.name.localeCompare(b.name);
      });
  };

  const teamStats = calculateTeamStats();

  if (teamsLoading || historyLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 w-full max-w-7xl">
      <h1 className="text-3xl font-bold">Rankings</h1>

      <Card>
        <CardHeader>
          <CardTitle>League Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] overflow-y-auto relative w-[900px]">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow>
                  <TableHead className="text-left">Pos</TableHead>
                  <TableHead className="text-left">Team</TableHead>
                  <TableHead className="text-left">P</TableHead>
                  <TableHead className="text-left">W</TableHead>
                  <TableHead className="text-left">D</TableHead>
                  <TableHead className="text-left">L</TableHead>
                  <TableHead className="text-left">G</TableHead>
                  <TableHead className="text-left">GD</TableHead>
                  <TableHead className="text-left">Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamStats.map((team, index) => (
                  <TableRow
                    key={team.id}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      index === 0
                        ? "text-blue-600 font-semibold"
                        : index >= teamStats.length - 3
                        ? "text-red-600"
                        : ""
                    }`}
                    onClick={() => setSelectedTeamId(team.id)}
                  >
                    <TableCell className="text-left">{index + 1}</TableCell>
                    <TableCell className="text-left font-medium">
                      {team.name}
                    </TableCell>
                    <TableCell className="text-left">{team.played}</TableCell>
                    <TableCell className="text-left">{team.won}</TableCell>
                    <TableCell className="text-left">{team.drawn}</TableCell>
                    <TableCell className="text-left">{team.lost}</TableCell>
                    <TableCell className="text-left">
                      {team.goalsFor}:{team.goalsAgainst}
                    </TableCell>
                    <TableCell className="text-left">
                      {team.goalDifference > 0 ? "+" : ""}
                      {team.goalDifference}
                    </TableCell>
                    <TableCell className="text-left font-bold">
                      {team.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedTeamId && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Squad */}
          <Card>
            <CardHeader>
              <CardTitle>
                Player List -{" "}
                {
                  (teams as readonly Team[])?.find(
                    (t) => t.id === selectedTeamId
                  )?.name
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {squadLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="space-y-2">
                  {(squad as readonly SquadPlayer[])?.map((player) => (
                    <div
                      key={player.id}
                      className="flex justify-between items-center p-2 border rounded"
                    >
                      <span>
                        {player.firstName} {player.lastName}
                      </span>
                      {player.captain && (
                        <span className="text-yellow-600 font-bold">
                          Captain
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Team History */}
          <Card>
            <CardHeader>
              <CardTitle>
                Match History -{" "}
                {
                  (teams as readonly Team[])?.find(
                    (t) => t.id === selectedTeamId
                  )?.name
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {teamHistoryLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {(teamHistory as readonly Match[])?.map((match) => {
                    const homeGoals = match.goals.filter(
                      (goal) => goal.home
                    ).length;
                    const awayGoals = match.goals.filter(
                      (goal) => !goal.home
                    ).length;
                    return (
                      <div key={match.id} className="p-2 border rounded">
                        <div className="font-medium">
                          {match.homeTeam.name} {homeGoals} - {awayGoals}{" "}
                          {match.awayTeam.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Round {match.round}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
