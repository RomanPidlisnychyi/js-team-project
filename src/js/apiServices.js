export default {
    baseURL: 'https://api.themoviedb.org/3/movie/popular?',
    apiKey: 'api_key=3ca4f0fa98e22b27d06819a16b26fd68',
    page: 1,
    perPage: '',
    queryString: '',
    get() {
        const asyncFetchFilms = async() => {
            const response = await fetch(`${this.baseURL}${this.apiKey}`);
            const data = await response.json();

            return data.results;
        };

        return asyncFetchFilms();
    },
};