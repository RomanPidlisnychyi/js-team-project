import mainInput from '../templates/mainInput.hbs';
import mainButton from '../templates/mainButton.hbs';
import apiServices from './apiServices';
import { initHomePage, createCardFunc } from './initialHomePage';

const initSearchedFilms = async () => {
  const films = await apiServices.getSearch();
  //   console.log(films);
  createCardFunc(films);
};

document
  .querySelector('.main-input')
  .insertAdjacentHTML('beforeend', mainInput());
document
  .querySelector('.main-pagination')
  .insertAdjacentHTML('beforeend', mainButton());
document.querySelector('.js-plaginationPageNumber').textContent =
  apiServices.page;
document.querySelector('body').addEventListener('click', plaginationNavigation);
document.querySelector('#js-backButton').classList.add('homePage__hide');
document.querySelector('body').addEventListener('input', searchFilms);
document.querySelector('body').addEventListener('keydown', searchFilmsEnter);

function searchFilms(event) {
  apiServices.query = event.target.value;
  localStorage.setItem('input', event.target.value);
}

function searchFilmsEnter(event) {
  if (event.key === 'Enter') {
    clearInput();
    clearCardList();
    // clearNotification();
    initSearchedFilms();
    resetPage();
  }
}

function plaginationNavigation(event) {
  if (event.target === document.querySelector('#js-nextButton')) {
    apiServices.page += 1;
    document.querySelector('.js-plaginationPageNumber').textContent =
      apiServices.page;
    clearCardList();
    if (localStorage.getItem('input')) {
      apiServices.query = localStorage.getItem('input');
      initSearchedFilms();
    } else {
      initHomePage();
    }
  }
  if (event.target === document.querySelector('#js-backButton')) {
    apiServices.page -= 1;
    document.querySelector('.js-plaginationPageNumber').textContent =
      apiServices.page;
    clearCardList();
    if (localStorage.getItem('input')) {
      apiServices.query = localStorage.getItem('input');
      initSearchedFilms();
    } else {
      initHomePage();
    }
  }
  if (apiServices.page === 1) {
    document.querySelector('#js-backButton').classList.add('homePage__hide');
    return;
  } else {
    document.querySelector('#js-backButton').classList.remove('homePage__hide');
  }
}

function resetPage() {
  apiServices.page = 1;
  document.querySelector('#js-backButton').classList.add('homePage__hide');
  document.querySelector('.js-plaginationPageNumber').textContent =
    apiServices.page;
}

function clearInput() {
  document.querySelector('.js-input').value = '';
}

function clearNotification() {
  document.querySelector('.error-note').innerHTML = '';
}

function clearCardList() {
  document.querySelector('.main-card-list').innerHTML = '';
}
