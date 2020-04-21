export interface CovidData {
    total: {
        confirmed: number;
        deaths: number;
        recovered: number;
    };
    today: {
        confirmed: number;
        deaths: number;
    };
}
