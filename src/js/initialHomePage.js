import apiServices from './apiServices';
import homePageList from '../templates/homePageList.hbs';
import homePageListItems from '../templates/homePageListItems.hbs';

import {
    renderMainInput,
    renderMainPaginationBlock,
} from './searchAndPlaginationHomePage';

const mainCardList = document.querySelector('.main-card-list');

export const initHomePage = async() => {
    const films = await apiServices.get();
    createCardFunc(films);
};

export function createCardFunc(items) {
    const markupList = homePageList(items);
    const markupItem = homePageListItems(items);

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