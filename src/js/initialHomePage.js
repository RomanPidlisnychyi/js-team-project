import apiServices from './apiServices';
import homePageList from '../templates/homePageList.hbs';

const main = document.querySelector('.main');
const itemFilm = document.querySelector('sectionFilms__item');

const getFilms = async() => {
    const films = await apiServices.get();
    createCardFunc(films);
    console.log(films);
};

function createCardFunc(items) {
    const markup = homePageList(items);

    main.insertAdjacentHTML('beforeend', markup);
};

getFilms();

document.querySelector('body').addEventListener('click', activeDetailsPage);

function activeDetailsPage(event) {

};