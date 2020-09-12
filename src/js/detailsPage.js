import apiServices from '../js/apiServices';
import detailsPage from '../templates/detailsPage.hbs';
// import { clearMainHTML } from '../js/navigation';


export const arrayFavorite = [];
export const btnState = { watched: 'add', queue: 'add' };

export const getFilmDetails = async () => {
  if (apiServices.selectedMovieId === 0) {
    return;
  }

  const film = await apiServices.getFilmById();
  // console.log('onClickImage: ', id_img);

  // document.querySelector('.main').innerHTML = '';
  // clearMainHTML();
  // document.querySelector('.detailsPage').innerHTML = '';

  console.log('film: ', film);
  const markup = detailsPage(film);
  document.querySelector('.main').insertAdjacentHTML('beforeend', markup);

  //if localStorage[filmsWatched] does not contain film
  if (!isLocalContainFilm(apiServices.selectedMovieId, 'filmsWatched')) {
    document.querySelector('.detailsPage__btnAddWatched').textContent = 'add watch';
    btnState.watched = 'add';
  } else {
    document.querySelector('.detailsPage__btnAddWatched').textContent = 'delete watch';
    btnState.watched = 'delete';
  }

  // if localStorage[filmsQueue] does not contain film
  if (!isLocalContainFilm(apiServices.selectedMovieId, 'filmsQueue')) {
    document.querySelector('.detailsPage__btnAddFavorite').textContent = 'add queue';
    btnState.queue = 'add';
  } else {
    document.querySelector('.detailsPage__btnAddFavorite').textContent = 'delete queue';
    btnState.queue = 'delete';
  }

  return film;
};

// function renderDeteilsPage(){
//   // const markup = detailsPage(selectedMovie);
//   const markup = getFilmDetails().then(res => res.markup);
//   document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
// }

async function toggleToWatched(key, action, target) {
  const film = await apiServices.getFilmById();
  const tmp = localStorage.getItem(key);
  console.log('btnState: ', btnState);

  if (action === 'add') {
    if (tmp !== null) {    //if localStorage is not empty
      const parsedLocalStorage = JSON.parse(tmp);
      const notUniqueId = parsedLocalStorage.find(obj => obj.id === film.id);
      arrayFavorite.length = 0;
      arrayFavorite.push(...parsedLocalStorage);
      if (!notUniqueId) {
        arrayFavorite.push(film);   //;
      }

      localStorage.setItem(key, JSON.stringify(arrayFavorite));
    } else {
      arrayFavorite.push(film);
      localStorage.setItem(key, JSON.stringify(arrayFavorite));
    }

    key === 'filmsWatched' ? btnState.watched = 'delete' : btnState.queue = 'delete';
    key === 'filmsWatched' ? target.textContent = 'delete watch' : target.textContent = 'delete queue';
  }

  if (action === 'delete') {
    const parsedLocalStorage2 = JSON.parse(tmp);
    const find = parsedLocalStorage2.find(obj => obj.id === film.id);
    const indexFilm = parsedLocalStorage2.findIndex(el => el.id === film.id);
    parsedLocalStorage2.splice(indexFilm, 1);
    arrayFavorite.length = 0;
    arrayFavorite.push(...parsedLocalStorage2);
    localStorage.setItem(key, JSON.stringify(arrayFavorite));

    key === 'filmsWatched' ? btnState.watched = 'add' : btnState.queue = 'add';
    key === 'filmsWatched' ? target.textContent = 'add watch' : target.textContent = 'add queue';
  }
}

document.querySelector('body').onclick = onBodyClick;

function onBodyClick(event) { //click on a button add to fave 
  if (event.target === document.querySelector('.detailsPage__btnAddWatched')) {
    toggleToWatched('filmsWatched', btnState.watched, event.target);
  }
  if (event.target === document.querySelector('.detailsPage__btnAddFavorite')) {
    toggleToWatched('filmsQueue', btnState.queue, event.target);
  }
}


function isLocalContainFilm(idFilm, key) {
  if (key) {
    const tmp = localStorage.getItem(key);
    const parsedLocalStorage = JSON.parse(tmp);
    return parsedLocalStorage ? parsedLocalStorage.find(obj => obj.id === idFilm) : null;
  } else {
    console.log('Error value key: ', key);
    return null;
  }
}
