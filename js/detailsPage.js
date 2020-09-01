import apiServices from '../js/apiServices';
import detailsPage from '../templates/detailsPage.hbs';
import { id_img } from '../js/initialHomePage';
import { clearMainHTML } from '../js/navigation';


export const arrayFavorite = [];
const arrayFilms = [];
const setAtrrayMuviesId = new Set();

export const getFilmDetails = async () => {
  if (apiServices.selectedMovieId === 0) {
    return;
  }
  const films = await apiServices.get();

  const genres = await apiServices.getGenres();


  const selectedMovieFiltred = films.filter(
    film => film.id === apiServices.selectedMovieId
    // film => film.id == id_img.id
  );

  const selectedMovie = selectedMovieFiltred[0];
  // console.log('selectedMovie: ', selectedMovie);
  // console.log('films: ', films);

  console.log('onClickImage: ', id_img);

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

  // console.log('selectedMovie: ', selectedMovie);

  // document.querySelector('.main').innerHTML = '';
  // clearMainHTML();
  // document.querySelector('.detailsPage').innerHTML = '';
  const markup = detailsPage(selectedMovie);
  document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
  // console.log('markup: ', markup);

  // console.log('getFilmDetails.selectedMovie: ', selectedMovie);
  const exportObj = {}
  return selectedMovie;
};

// function renderDeteilsPage(){
//   // const markup = detailsPage(selectedMovie);
//   const markup = getFilmDetails().then(res => res.markup);
//   document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
// }

async function getFilms(filmsId) {
  const films = await apiServices.get();
  const findingFilm = films.find(film => film.id == filmsId);
  console.log('findingFilm: ', findingFilm);
  return findingFilm;
}

function toggleToWatched(id, action) {
  const tmp = localStorage.getItem('filmsWatched');

  if (tmp.length !== 0) {   //length filmsWatched;
      setAtrrayMuviesId.add(apiServices.selectedMovieId);
      
      arrayFavorite.length = 0;
      const filmFinded = getFilms(apiServices.selectedMovieId);

      filmFinded.then(res => {
        arrayFavorite.push(res);
        tmp.push(res);
        // localStorage.setItem('filmsWatched', JSON.stringify(res));
        localStorage.setItem('filmsWatched', tmp);
      });

      
      console.log('arrayFavorite: ', arrayFavorite);
  }
}

document.querySelector('body').onclick = onBodyClick;

function onBodyClick(event) { //add to fave button
  if (event.target === document.querySelector('.detailsPage__btnAddFavorite')) {
    console.log('addBtn');
    // event.target.textContent = 'qweqwe';    
    toggleToWatched(1, 0);
  }
}
