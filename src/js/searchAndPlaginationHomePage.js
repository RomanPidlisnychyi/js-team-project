import mainInput from '../templates/mainInput.hbs';
import mainButton from '../templates/mainButton.hbs';
import apiServices from './apiServices';

// const refs = {
//   jsForm: document.querySelector('.js-form'),
//   jsInput: document.querySelector('.js-input'),
//   jsBackButton: document.querySelector('#js-backButton'),
//   jsPlaginationPageNumber: document.querySelector('.js-plaginationPageNumber'),
//   jsNextButton: document.querySelector('#js-nextButton'),
// };
// - создаем глобальные переменную inputVaue (будут использоваться в запросах,
//     как и pageNumber созданный первым участником - НЕ ДУБЛИРУЕМ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ);
let pageNumber = 1;
let inputValue = '';

const formMarkup = mainInput();
const btnMarkup = mainButton();
const getFilms = async () => {
  const films = await apiServices.get();
  console.log(films);
};

document.querySelector('body').addEventListener('click', plaginationNavigation);
document.querySelector('.main').insertAdjacentHTML('beforeend', formMarkup);
document.querySelector('.main').insertAdjacentHTML('beforeend', btnMarkup);
document.querySelector('.js-plaginationPageNumber').textContent =
  apiServices.page;
document.querySelector('#js-backButton').classList.add('homePage__hide');
document.querySelector('body').addEventListener('input', searchFilms);
document.querySelector('body').addEventListener('keydown', searchFilmsEnter);

function searchFilms(event) {
  apiServices.query = event.target.value;
}

function searchFilmsEnter(event) {
  if (event.key !== 'Enter') {
    return;
  }
  event.preventDefault();
  fetchFilms();
  if (apiServices.query !== '') {
    getFilms();
  }
  apiServices.query = '';
  clearInput();
}

function fetchFilms() {
  if (apiServices.query.length === 0) {
    console.log(document.querySelector('.homePage__error'));
    if (document.querySelector('.homePage__error') === null) {
      const p = `<p class="homePage__error">Search result not successful. Enter the correct movie name and try again.</p>`;
      document
        .querySelector('.homePage__formblock')
        .insertAdjacentHTML('beforeend', p);
    }
  }
  if (
    apiServices.query.length !== 0 &&
    document.querySelector('.homePage__error') !== null
  ) {
    document
      .querySelector('.homePage__formblock')
      .removeChild(document.querySelector('.homePage__error'));
  }
}

function clearInput() {
  document.querySelector('.js-input').value = '';
}

function plaginationNavigation(event) {
  if (event.target === document.querySelector('#js-nextButton')) {
    apiServices.page += 1;
    document.querySelector('.js-plaginationPageNumber').textContent =
      apiServices.page;
    getFilms();
  }
  if (event.target === document.querySelector('#js-backButton')) {
    apiServices.page -= 1;
    document.querySelector('.js-plaginationPageNumber').textContent =
      apiServices.page;
    getFilms();
  }
  if (apiServices.page === 1) {
    document.querySelector('#js-backButton').classList.add('homePage__hide');
  } else {
    document.querySelector('#js-backButton').classList.remove('homePage__hide');
  }
}
