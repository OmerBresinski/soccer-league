import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LeagueProvider } from "./contexts/LeagueContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { TablesPage } from "./pages/TablesPage.tsx";
import { HistoryPage } from "./pages/HistoryPage.tsx";
import { TopScorersPage } from "./pages/TopScorersPage.tsx";
import { StatisticsPage } from "./pages/StatisticsPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LeagueProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<TablesPage />} />
              <Route path="tables" element={<TablesPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="top-scorers" element={<TopScorersPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
            </Route>
          </Routes>
        </LeagueProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
