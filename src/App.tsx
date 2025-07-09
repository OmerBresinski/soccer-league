import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useLeague } from "./contexts/LeagueContext";
import { LeagueSelector } from "./components/LeagueSelector";
import "./App.css";

function App() {
  const { leagueId, setLeagueId } = useLeague();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex flex-col items-center w-full p-4">
          <div className="w-[900px] max-w-xs mb-4">
            <div className="w-full flex items-center gap-2">
              <LeagueSelector
                className="w-full my-6"
                selectedLeagueId={leagueId}
                onLeagueChange={setLeagueId}
              />
            </div>
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
