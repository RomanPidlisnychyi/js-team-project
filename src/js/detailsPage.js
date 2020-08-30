import apiServices from '../js/apiServices';
import detailsPage from '../templates/detailsPage.hbs';

export const getFilmDetails = async () => {
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
    console.log('addBtn');
    event.target.textContent = 'qweqwe';
  }
}
