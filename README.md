# Soccer Leagues Dashboard

This is a React-based web application that displays statistics and data for various soccer leagues. It's built with Vite, React, TypeScript, and uses `shadcn/ui` for components and Tailwind CSS for styling.

## Features

-   Dynamic league selection that updates data across all pages.
-   Responsive design that works on different screen sizes.
-   Client-side data fetching and caching using `@tanstack/react-query`.
-   Clean, modern UI built with `shadcn/ui`.

## Pages

The application consists of four main pages:

### 1. Tables Page

This is the main landing page of the application. It displays the current league standings in a table format.

-   **League Table**: Shows each team's rank, played matches, wins, draws, losses, goal difference, and total points.
-   **Team Details**: Clicking on a team in the table reveals more detailed information, including:
    -   **Player List**: A list of all players in the selected team's squad.
    -   **Match History**: A list of the recent matches played by the selected team.

### 2. Match History Page

This page provides a comprehensive history of all matches played in the selected league, grouped by round.

-   **Filter by Round**: Users can filter the match history to display only the matches from a specific range of rounds.
-   **Match Results**: Each match shows the final score, including the home and away teams.

### 3. Top Scorers Page

This page is dedicated to highlighting the top goal scorers in the league.

-   **Top Three Scorers**: A special section at the top showcases the top three players with the most goals, styled with gold, silver, and bronze themes.
-   **Detailed Scorers Table**: A table lists all scorers, their total number of goals, and their rank.

### 4. General Statistics Page

This page offers a bird's-eye view of interesting statistics for the entire league.

-   **Goals by Half**: A comparison of goals scored in the first half versus the second half.
-   **Goal Times**: Shows the minutes of the earliest and latest goals scored in the league.
-   **Round Statistics**: Highlights the round with the most goals and the round with the fewest goals.
-   **Statistics Summary**: Provides a summary of key metrics like total goals and average goals per match.

## Tech Stack

-   **Vite**: Frontend build tool.
-   **React**: UI library.
-   **TypeScript**: For static typing.
-   **React Router DOM**: For client-side routing.
-   **@tanstack/react-query**: For data fetching and state management.
-   **shadcn/ui**: For UI components.
-   **Tailwind CSS**: For styling.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/your_username/soccer-leagues.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd soccer-leagues
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the App

To start the development server, run:

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).
