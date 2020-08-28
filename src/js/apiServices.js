export default {
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/movie/550?api_key=',
    apiKey: '3ca4f0fa98e22b27d06819a16b26fd68',
    get() {
        const asyncFetchFilms = async() => {
            const films = await fetch(`${this.baseURL}${this.apiKey}`)
                .then(response => response)
                .then(data => console.log(data))
                .catch(error => console.log(error));

            console.log(films);
            return films;
        };

        return asyncFetchFilms();
    },
};