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
