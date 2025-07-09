import { useState } from "react";
import { useLeagueHistory } from "@/api/useLeagueHistory";
import { useLeague } from "@/contexts/LeagueContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Match } from "@/types";

export function HistoryPage() {
  const [minRound, setMinRound] = useState<string>("");
  const [maxRound, setMaxRound] = useState<string>("");
  const [filteredRounds, setFilteredRounds] = useState<number[]>([]);
  const { leagueId } = useLeague();

  const { data: allHistory, isLoading: historyLoading } =
    useLeagueHistory(leagueId);

  const availableRounds = allHistory
    ? Array.from(
        new Set((allHistory as readonly Match[]).map((match) => match.round))
      ).sort((a, b) => a - b)
    : [];

  const handleFilter = () => {
    const min = parseInt(minRound) || 1;
    const max = parseInt(maxRound) || Math.max(...availableRounds);
    const rounds = availableRounds.filter(
      (round) => round >= min && round <= max
    );
    setFilteredRounds(rounds);
  };

  const handleReset = () => {
    setMinRound("");
    setMaxRound("");
    setFilteredRounds([]);
  };

  const displayMatches =
    filteredRounds.length > 0
      ? (allHistory as readonly Match[])?.filter((match) =>
          filteredRounds.includes(match.round)
        )
      : allHistory;

  if (historyLoading) {
    return <div className="text-center py-8 w-[900px]">Loading...</div>;
  }

  return (
    <div className="space-y-6 w-[900px]">
      <h1 className="text-3xl font-bold">Match History</h1>

      {/* Round Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Rounds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Min Round
              </label>
              <Input
                type="number"
                placeholder="1"
                value={minRound}
                onChange={(e) => setMinRound(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Max Round
              </label>
              <Input
                type="number"
                placeholder={availableRounds.length.toString()}
                value={maxRound}
                onChange={(e) => setMaxRound(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleFilter}>Filter</Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
          {availableRounds.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Available rounds: {availableRounds[0]} -{" "}
              {availableRounds[availableRounds.length - 1]}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Matches */}
      <Card>
        <CardHeader>
          <CardTitle>
            Match Results
            {filteredRounds.length > 0 && (
              <span className="text-sm font-normal text-gray-600">
                {" "}
                (Rounds {Math.min(...filteredRounds)} -{" "}
                {Math.max(...filteredRounds)})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableRounds.map((round) => {
              if (
                filteredRounds.length > 0 &&
                !filteredRounds.includes(round)
              ) {
                return null;
              }

              const roundMatches =
                (displayMatches as readonly Match[])?.filter(
                  (match) => match.round === round
                ) || [];

              return (
                <div key={round} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">Round {round}</h3>
                  <div className="grid gap-2">
                    {roundMatches.map((match) => {
                      const homeGoals = match.goals.filter(
                        (goal) => goal.home
                      ).length;
                      const awayGoals = match.goals.filter(
                        (goal) => !goal.home
                      ).length;

                      return (
                        <div
                          key={match.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded"
                        >
                          <div className="text-lg font-medium">
                            {match.homeTeam.name} {homeGoals} - {awayGoals}{" "}
                            {match.awayTeam.name}
                          </div>
                          {match.goals.length > 0 && (
                            <div className="text-sm text-gray-600">
                              {match.goals.length} goals
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
