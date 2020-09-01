import apiServices from './apiServices';
import homePageList from '../templates/homePageList.hbs';

const mainCardList = document.querySelector('.main-card-list');

export const initHomePage = async () => {
  const films = await apiServices.get();
  createCardFunc(films);
};

export function createCardFunc(items) {
  const markup = homePageList(items);

  mainCardList.insertAdjacentHTML('beforeend', markup);
}


initHomePage();
const refsImg = document.querySelector('body');
refsImg.addEventListener('click', onClickImage);


const id_tmp = {};

function onClickImage(event) {
  console.log('event.target:', event);

  if (event.target.className === 'sectionFilms__img') {
    // console.log('user_id: ', event.target.dataset.userId);
     id_tmp.id = event.target.dataset.userId;
     apiServices.selectedMovieId = Number(id_tmp.id);
    // return event.target.dataset.userId;
  }
}


export const id_img = id_tmp;
