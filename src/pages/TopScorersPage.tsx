import { useLeagueHistory } from "@/api/useLeagueHistory";
import { useLeague } from "@/contexts/LeagueContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";
import type { Match } from "@/types";

interface TopScorer {
  playerId: number;
  firstName: string;
  lastName: string;
  goals: number;
}

export function TopScorersPage() {
  const { leagueId } = useLeague();
  const { data: history, isLoading: historyLoading } =
    useLeagueHistory(leagueId);

  const calculateTopScorers = (): TopScorer[] => {
    if (!history) return [];

    const scorerStats: { [key: number]: TopScorer } = {};

    (history as readonly Match[]).forEach((match) => {
      match.goals.forEach((goal) => {
        const playerId = goal.scorer.id;
        if (!scorerStats[playerId]) {
          scorerStats[playerId] = {
            playerId,
            firstName: goal.scorer.firstName,
            lastName: goal.scorer.lastName,
            goals: 0,
          };
        }
        scorerStats[playerId].goals++;
      });
    });

    return Object.values(scorerStats)
      .sort((a, b) => b.goals - a.goals)
      .slice(0, 3);
  };

  const topScorers = calculateTopScorers();

  if (historyLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 w-[900px]">
      <h1 className="text-3xl font-bold">Top Scorers</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            Top Three Scorers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topScorers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No scorers found
            </div>
          ) : (
            <div className="space-y-4">
              {topScorers.map((scorer, index) => (
                <div
                  key={scorer.playerId}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    index === 0
                      ? "border-yellow-400 bg-yellow-50"
                      : index === 1
                      ? "border-gray-400 bg-gray-50"
                      : "border-orange-400 bg-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                          ? "bg-gray-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {scorer.firstName} {scorer.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">Player</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{scorer.goals}</div>
                    <div className="text-sm text-gray-600">Goals</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Scorers Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] overflow-y-auto relative">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow>
                  <TableHead className="text-left">Rank</TableHead>
                  <TableHead className="text-left">Player Name</TableHead>
                  <TableHead className="text-left">Goals</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topScorers.map((scorer, index) => (
                  <TableRow key={scorer.playerId}>
                    <TableCell className="text-left">
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        )}
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell className="text-left font-medium">
                      {scorer.firstName} {scorer.lastName}
                    </TableCell>
                    <TableCell className="text-left font-bold text-lg">
                      {scorer.goals}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
