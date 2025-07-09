import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TablesPage } from "@/pages/TablesPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { TopScorersPage } from "@/pages/TopScorersPage";
import { StatisticsPage } from "@/pages/StatisticsPage";
import "./App.css";

function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex flex-col items-center w-full">
          <Routes>
            <Route path="/" element={<TablesPage />} />
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/top-scorers" element={<TopScorersPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
