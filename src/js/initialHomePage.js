import apiServices from './apiServices';
import homePageList from '../templates/homePageList.hbs';
import homePageListItems from '../templates/homePageListItems.hbs';

import {
    renderMainInput,
    renderMainPaginationBlock,
} from './searchAndPlaginationHomePage';

export const initHomePage = async() => {
    const films = await apiServices.get();
    createCardFunc(films);
};

function getReleaseYear(films) {
    const newFilms = films.map(film => {
        film.releaseYear = film.release_date.substring(0, 4);
        return film;
    });

    return newFilms;
}

export function createCardFunc(items) {
    const newFilms = getReleaseYear(items);
    const markupList = homePageList(newFilms);
    const markupItem = homePageListItems(newFilms);

    if (document.querySelector('.sectionFilms__list') === null) {
        renderMainInput();
        document.querySelector('.main').insertAdjacentHTML('beforeend', markupList);
        renderMainPaginationBlock();
    } else {
        document
            .querySelector('.sectionFilms__list')
            .insertAdjacentHTML('beforeend', markupItem);
    }
}

initHomePage();