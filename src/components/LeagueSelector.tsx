import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeagues } from "@/api/useLeagues";
import { Skeleton } from "./ui/skeleton";

interface LeagueSelectorProps {
  selectedLeagueId: number;
  onLeagueChange: (leagueId: number) => void;
  className?: string;
}

export function LeagueSelector({
  selectedLeagueId,
  onLeagueChange,
  className,
}: LeagueSelectorProps) {
  const { data: leagues, isLoading: leaguesLoading } = useLeagues();

  if (leaguesLoading) {
    return <Skeleton className="h-10 w-full max-w-xs" />;
  }

  return (
    <div className={className}>
      <Select
        value={selectedLeagueId.toString()}
        onValueChange={(value) => onLeagueChange(parseInt(value, 10))}
      >
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="Select a league" />
        </SelectTrigger>
        <SelectContent>
          {leagues?.map((league) => (
            <SelectItem key={league.id} value={league.id.toString()}>
              {league.name} League
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
