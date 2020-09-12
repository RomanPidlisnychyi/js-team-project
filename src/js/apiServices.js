export default {
    baseURL: 'https://api.themoviedb.org/3/movie/popular?',
    genresURL: 'https://api.themoviedb.org/3/genre/movie/list?',
    searchURL: 'https://api.themoviedb.org/3/search/movie?',
    searchByIdURL: 'https://api.themoviedb.org/3/movie/',
    apiKey: 'api_key=3ca4f0fa98e22b27d06819a16b26fd68',
    page: 1,
    perPage: '',
    query: '',
    selectedMovieId: 539885,
    get() {
        const asyncFetchFilms = async() => {
            const response = await fetch(
                `${this.baseURL}${this.apiKey}&page=${this.page}&query=${this.query}`,
            );
            const data = await response.json();

            return data.results;
        };

        return asyncFetchFilms();
    },
    getGenres() {
        const asyncFetchGenres = async() => {
            const response = await fetch(`${this.genresURL}${this.apiKey}`);
            const data = await response.json();

            return data.genres;
        };

        return asyncFetchGenres();
    },
    getSearch() {
        const asyncFetchSearch = async() => {
            const response = await fetch(
                `${this.searchURL}${this.apiKey}&page=${this.page}&query=${this.query}`,
            );
            const data = await response.json();

            console.log(data.results);
            return data.results;
        };

        return asyncFetchSearch();
    },
    getSearchV2(queryString) {
        const asyncFetchSearch = async() => {
            const response = await fetch(
                `${this.searchURL}${this.apiKey}&page=${this.page}&query=${queryString}`,
            );
            const data = await response.json();

            console.log(data.results);
            return data.results;
        };

        return asyncFetchSearch();
    },
    getFilmById(id = this.selectedMovieId) {
        const asyncFetchSearch = async() => {
            const response = await fetch(
                `${this.searchByIdURL}${id}?${this.apiKey}`,
            );
            const data = await response.json();
            return data;
        };

        return asyncFetchSearch();
    },
};