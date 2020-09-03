import renderUlTemplate from '../templates/renderUlTemplate.hbs';
import itemsLibraryTemplate from '../templates/libraryCard.hbs';

import '../font-awesome-4.7.0/css/font-awesome.min.css';

export function drawWatchedFilmList(films) {
    if (films.length !== 0) {
        insertLibraryItems(films);
        document
            .querySelector('.libraryPage__btnWatched')
            .classList.add('libraryPage__btn--active');
        document
            .querySelector('.libraryPage__btnFavorite')
            .classList.remove('libraryPage__btn--active');
        document.querySelector('.libraryPage__emptyQueue').style.display = 'none';
        document.querySelector('.libraryPage__emptyWatched').style.display = 'none';
    } else {
        document.querySelector('.libraryPage__emptyWatched').style.display =
            'block';
    }
}

export function drawQueueFilmList(films) {
    document.querySelector('.libraryPage__filmsList').innerHTML = '';
    if (films.length !== 0) {
        document
            .querySelector('.libraryPage__btnFavorite')
            .classList.add('libraryPage__btn--active');
        document
            .querySelector('.libraryPage__btnWatched')
            .classList.remove('libraryPage__btn--active');
        document.querySelector('.libraryPage__emptyQueue').style.display = 'none';
        document.querySelector('.libraryPage__emptyWatched').style.display = 'none';
        document.querySelector('.libraryPage__filmsList');
        insertLibraryItems(films);
    } else {
        // document.querySelector('.libraryPage__filmsList').innerHTML = '';
        document.querySelector('.libraryPage__emptyQueue').style.display = 'block';
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