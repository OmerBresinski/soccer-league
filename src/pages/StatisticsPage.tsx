import { useLeagueHistory } from "@/api/useLeagueHistory";
import { useLeague } from "@/contexts/LeagueContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, TrendingUp, TrendingDown } from "lucide-react";
import type { Match } from "@/types";

export function StatisticsPage() {
  const { leagueId } = useLeague();
  const { data: history, isLoading: historyLoading } =
    useLeagueHistory(leagueId);

  const calculateStatistics = () => {
    if (!history) return null;

    const totalMatches = (history as readonly Match[]).length;

    let firstHalfGoals = 0;
    let secondHalfGoals = 0;
    let earliestGoal = Infinity;
    let latestGoal = -Infinity;
    const roundGoals: { [key: number]: number } = {};

    (history as readonly Match[]).forEach((match) => {
      if (!roundGoals[match.round]) {
        roundGoals[match.round] = 0;
      }

      match.goals.forEach((goal) => {
        roundGoals[match.round]++;

        if (goal.minute <= 45) {
          firstHalfGoals++;
        } else {
          secondHalfGoals++;
        }

        if (goal.minute < earliestGoal) {
          earliestGoal = goal.minute;
        }
        if (goal.minute > latestGoal) {
          latestGoal = goal.minute;
        }
      });
    });

    const roundEntries = Object.entries(roundGoals).map(([round, goals]) => ({
      round: parseInt(round),
      goals,
    }));

    const maxGoalsRound =
      roundEntries.length > 0
        ? roundEntries.reduce((max, current) =>
            current.goals > max.goals ? current : max
          )
        : { round: 0, goals: 0 };

    const minGoalsRound =
      roundEntries.length > 0
        ? roundEntries.reduce((min, current) =>
            current.goals < min.goals ? current : min
          )
        : { round: 0, goals: 0 };

    const totalGoals = firstHalfGoals + secondHalfGoals;
    const averageGoalsPerMatch =
      totalMatches > 0 ? totalGoals / totalMatches : 0;

    return {
      firstHalfGoals,
      secondHalfGoals,
      earliestGoal: earliestGoal === Infinity ? null : earliestGoal,
      latestGoal: latestGoal === -Infinity ? null : latestGoal,
      maxGoalsRound,
      minGoalsRound,
      totalGoals,
      averageGoalsPerMatch,
    };
  };

  const stats = calculateStatistics();

  if (historyLoading) {
    return <div className="text-center py-8 w-[900px]">Loading...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8  w-[900px]">No data found</div>;
  }

  return (
    <div className="space-y-6 w-[900px]">
      <h1 className="text-3xl font-bold">General Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Goals by Half
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="font-medium">First Half</span>
                <span className="text-2xl font-bold text-blue-600">
                  {stats.firstHalfGoals}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="font-medium">Second Half</span>
                <span className="text-2xl font-bold text-green-600">
                  {stats.secondHalfGoals}
                </span>
              </div>
              <div className="text-sm text-gray-600 text-center pt-2">
                Total: {stats.totalGoals} goals
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Goal Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                <span className="font-medium">Earliest Goal</span>
                <span className="text-2xl font-bold text-yellow-600">
                  {stats.earliestGoal !== null
                    ? `Min ${stats.earliestGoal}`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="font-medium">Latest Goal</span>
                <span className="text-2xl font-bold text-purple-600">
                  {stats.latestGoal !== null
                    ? `Min ${stats.latestGoal}`
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Round Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Round with Most Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                Round {stats.maxGoalsRound.round}
              </div>
              <div className="text-2xl font-semibold mb-2">
                {stats.maxGoalsRound.goals} Goals
              </div>
              <div className="text-sm text-gray-600">
                The most productive round in the league
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-6 w-6 text-red-600" />
              Round with Fewest Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">
                Round {stats.minGoalsRound.round}
              </div>
              <div className="text-2xl font-semibold mb-2">
                {stats.minGoalsRound.goals} Goals
              </div>
              <div className="text-sm text-gray-600">
                The least productive round in the league
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold">{stats.totalGoals}</div>
              <div className="text-sm text-gray-600">Total Goals</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold">
                {stats.totalGoals > 0
                  ? Math.round((stats.firstHalfGoals / stats.totalGoals) * 100)
                  : 0}
                %
              </div>
              <div className="text-sm text-gray-600">First Half</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold">
                {stats.totalGoals > 0
                  ? Math.round((stats.secondHalfGoals / stats.totalGoals) * 100)
                  : 0}
                %
              </div>
              <div className="text-sm text-gray-600">Second Half</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold">
                {stats.averageGoalsPerMatch.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Avg. Goals / Match</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
