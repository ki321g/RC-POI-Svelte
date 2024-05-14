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

export function getClubsPerCountyData(clubs: Club[]): DataSet {
    let countyAnalytics = [];
    const countyData: DataSet = { labels: [], datasets: [{ values: [] }], };

    clubs.forEach((club) => {
        try {
          const index = countyAnalytics.findIndex((c) => c.address === club.address);
          if (index !== -1) {
            countyAnalytics[index].clubCount += 1;
          } else {
            countyAnalytics.push({ address: club.address, clubCount: 1 });
          }
        } catch (error) {
          console.error("Error processing club:", club._id, error);
        }
      });

    countyData.labels = countyAnalytics.map(item => item.address);    
    countyData.datasets[0].values = countyAnalytics.map(item => item.clubCount); 
    console.log(countyData);   

    // Update chart data
    return countyData;
}

export function getGamesPlayedData(clubs: Club[], games: Game[]): DataSet {
    let gamesAnalytics = [];
    const gamesPlayedData: DataSet = { labels: [], datasets: [{ values: [] }], };


     // Calculate the Club with the most games
    //  clubs.forEach((club) => {
    //     try {
    //       const maxGamesPerClub = { clubid: club._id, club: club.club, address: club.address, gameCount: games.length };
    //       gamesAnalytics.push(maxGamesPerClub);
    //     } catch (error) {
    //       console.error("Error processing club:", club._id, error);
    //     }
    //   });
    clubs.forEach((club) => {
        try {
          const gameCount = games.filter(game => game.clubid === club._id).length;
          if (gameCount > 0) {
            const maxGamesPerClub = { clubid: club._id, club: club.club, address: club.address, gameCount: gameCount };
            gamesAnalytics.push(maxGamesPerClub);
          }
        } catch (error) {
          console.error("Error processing club:", club._id, error);
        }
      });

    gamesPlayedData.labels = gamesAnalytics.map(item => item.address);    
    gamesPlayedData.datasets[0].values = gamesAnalytics.map(item => item.gameCount); 
    console.log(gamesPlayedData);   

    // Update chart data
    return gamesPlayedData;
}