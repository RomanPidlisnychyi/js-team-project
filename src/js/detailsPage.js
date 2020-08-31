import apiServices from '../js/apiServices';
import detailsPage from '../templates/detailsPage.hbs';

export const getFilmDetails = async() => {
    if (apiServices.selectedMovieId === 0) {
        return;
    }
    const films = await apiServices.get();
    const genres = await apiServices.getGenres();

    const selectedMovieFiltred = films.filter(
        film => film.id === apiServices.selectedMovieId,
    );

    const selectedMovie = selectedMovieFiltred[0];

    // console.log(selectedMovie);

    const genresName = [];

    const ourGenres = genres.forEach(genre => {
        selectedMovie.genre_ids.forEach(e => {
            if (e === genre.id) {
                genresName.push(genre.name);
            }
        });
    });

    const myGenre = genresName.join(', ');

    selectedMovie.genre = myGenre;

    const markup = detailsPage(selectedMovie);

    document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
};

// getFilmDetails();

document.querySelector('body').onclick = onBodyClick;

function onBodyClick(event) {
    if (event.target === document.querySelector('.detailsPage__btnAddFavorite')) {
        if (JSON.parse(localStorage.getItem('favoriteFilms')) === null) {
            const option = [];
            option.push(apiServices.selectedMovieId);
            localStorage.setItem('favoriteFilms', JSON.stringify(option));
        }

        const favoriteFilms = JSON.parse(localStorage.getItem('favoriteFilms'));
        console.log(favoriteFilms);

        // favoriteFilms.forEach(element => {
        //     console.log(element);
        // });

        event.target.textContent = 'qweqwe';
        console.log(JSON.parse(localStorage.getItem('favoriteFilms')));
    }
    if (event.target === document.querySelector('.detailsPage__btnAddWatched')) {
        if (JSON.parse(localStorage.getItem('watchedFilms')) === null) {
            const option = [];
            option.push(apiServices.selectedMovieId);

            localStorage.setItem('watchedFilms', JSON.stringify(option));
        }
        event.target.textContent = 'hg';

        const watchedFilms = JSON.parse(localStorage.getItem('favoriteFilms'));
        console.log(favoriteFilms);

        console.log(JSON.parse(localStorage.getItem('watchedFilms')));
    }
}