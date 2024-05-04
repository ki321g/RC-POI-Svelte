import type { User, Club, Game, DataSet, DataSetGames } from '$lib/types/rugby-club-poi-types';

export function getCategoryData(clubs: Club[]): DataSet {
    const categoriesTotal: DataSet = { labels: [], datasets: [{ values: [] }], };

    // Calculate category counts
    const categoryCounts = clubs.reduce((counts, club) => {
        const category = club.category;
        counts[category] = (counts[category] || 0) + 1;
        return counts;
    }, {} as Record<string, number>);

    // Update chart data
    categoriesTotal.labels = Object.keys(categoryCounts);
    categoriesTotal.datasets[0].values = Object.values(categoryCounts);
    console.log(categoriesTotal);
    return categoriesTotal;
}

export function getGamesData(games: Game[]): DataSetGames {
    const gamesData: DataSetGames = { labels: [], datasets: [{ name: '', chartType: '', values: [] },
	{ name: '', chartType: '', values: [] }]};

    // Set chart data
    gamesData.labels = games.map(game => game.home.concat(' vs ', game.away));
    gamesData.datasets[0].name = 'Home Scores';
    gamesData.datasets[0].chartType = 'line';
    gamesData.datasets[0].values = games.map(game => game.homescore);
    gamesData.datasets[1].name = 'Away Scores';
    gamesData.datasets[1].chartType = 'line';
    gamesData.datasets[1].values = games.map(game => game.awayscore);    

    console.log(gamesData);
    return gamesData;
}