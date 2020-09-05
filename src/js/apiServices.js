export default {
    baseURL: 'https://api.themoviedb.org/3/',
    apiKey: 'api_key=3ca4f0fa98e22b27d06819a16b26fd68',
    page: 1,
    selectedMovieId: '',
    query: '',
    get() {
        const asyncFetchFilms = async() => {
            const response = await fetch(
                `${this.baseURL}movie/popular?${this.apiKey}&page=${this.page}`,
            );
            const data = await response.json();

            return data.results;
        };

        return asyncFetchFilms();
    },
    getSearch() {
        const asyncFetchSearch = async() => {
            const response = await fetch(
                `${this.baseURL}search/movie?${this.apiKey}&page=${this.page}&query=${this.query}`,
            );
            const data = await response.json();

            return data.results;
        };

        return asyncFetchSearch();
    },
    getFilmById(id = this.selectedMovieId) {
        const asyncFetchSearch = async() => {
            const response = await fetch(`${this.baseURL}movie/${id}?${this.apiKey}`);
            const data = await response.json();
            return data;
        };

        return asyncFetchSearch();
    },
};