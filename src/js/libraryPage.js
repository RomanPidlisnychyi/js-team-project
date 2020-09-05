import renderUlTemplate from '../templates/renderUlTemplate.hbs';
import itemsLibraryTemplate from '../templates/libraryCard.hbs';

export function drawWatchedFilmList(films) {
    document
        .querySelector('.libraryPage__emptyQueue')
        .classList.add('libraryPage__hide');
    if (films !== null) {
        insertLibraryItems(films);
    } else {
        document
            .querySelector('.libraryPage__emptyQueue')
            .classList.add('libraryPage__hide');
        document
            .querySelector('.libraryPage__emptyWatched')
            .classList.remove('libraryPage__hide');
    }
}

export function drawQueueFilmList(films) {
    document
        .querySelector('.libraryPage__emptyWatched')
        .classList.add('libraryPage__hide');
    if (films !== null) {
        insertLibraryItems(films);
    } else {
        document
            .querySelector('.libraryPage__emptyWatched')
            .classList.add('libraryPage__hide');
        document
            .querySelector('.libraryPage__emptyQueue')
            .classList.remove('libraryPage__hide');
    }
}

function insertLibraryItems(items) {
    const template = itemsLibraryTemplate(items);
    document
        .querySelector('.libraryPage__filmsList')
        .insertAdjacentHTML('beforeend', template);
}

export function renderUlTemplateFunc() {
    const template = renderUlTemplate();
    document.querySelector('.main').insertAdjacentHTML('beforeend', template);
}