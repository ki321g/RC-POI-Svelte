import type { Club, DataSet } from '$lib/types/rugby-club-poi-types';

export function getCategoryData(clubs: Club[]): DataSet {
    const categoriesTotal: DataSet = {
        labels: [],
        datasets: [{ values: [] }],
    };

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