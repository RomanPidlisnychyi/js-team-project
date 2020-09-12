import renderUlTemplate from '../templates/renderUlTemplate.hbs';
import itemsLibraryTemplate from '../templates/libraryCard.hbs';

import arrayQueue from './films-queue-test.js'; // !local storage
import arrayWatched from './films-watched.js'; // !local storage
// import apiServices from '../js/apiServices';

import '../font-awesome-4.7.0/css/font-awesome.min.css';

document.querySelector('body').addEventListener('click', drawWatchedFilmList);
document.querySelector('body').addEventListener('click', drawQueueFilmList);

export function readLocalStorage(key){
    const stringFilmsWatched = localStorage.getItem(key);
    const parsedFilmsWatched = JSON.parse(stringFilmsWatched);
    return parsedFilmsWatched;
}
function drawWatchedFilmList(event) {
    const el = event.target;
    const btnW = document.querySelector('.libraryPage__btnWatched');    
    if (el === btnW) {
        document.querySelector('.libraryPage__filmsList').innerHTML = '';
        const readedStorage = readLocalStorage('filmsWatched');

        if (readedStorage.length != 0) {   
            insertLibraryItems(readedStorage);
            document.querySelector('.libraryPage__btnWatched').classList.add('libraryPage__btn--active');
            document.querySelector('.libraryPage__btnFavorite').classList.remove('libraryPage__btn--active');
            document.querySelector('.libraryPage__emptyQueue').classList.remove('libraryPage__show');
            document.querySelector('.libraryPage__emptyWatched').classList.remove('libraryPage__show');
        } else {
            document.querySelector('.libraryPage__emptyQueue').classList.remove('libraryPage__show');
            document.querySelector('.libraryPage__emptyWatched').classList.add('libraryPage__show');
        }
    }
}

function drawQueueFilmList(event) {
    if (event.target == document.querySelector('.libraryPage__btnFavorite')) {
        document.querySelector('.libraryPage__filmsList').innerHTML = '';
        const readedStorage = readLocalStorage('filmsQueue');

        if (readedStorage.length != 0) {
            document.querySelector('.libraryPage__btnFavorite').classList.add('libraryPage__btn--active');
            document.querySelector('.libraryPage__btnWatched').classList.remove('libraryPage__btn--active');
            document.querySelector('.libraryPage__emptyQueue').classList.remove('libraryPage__show');
            document.querySelector('.libraryPage__emptyWatched').classList.remove('libraryPage__show');
            insertLibraryItems(readedStorage);
        } else {
            document.querySelector('.libraryPage__emptyWatched').classList.remove('libraryPage__show');
            document.querySelector('.libraryPage__emptyQueue').classList.add('libraryPage__show');
        }
    }
}

export function insertLibraryItems(items) {
    const template0 = itemsLibraryTemplate(items);
    document.querySelector('.libraryPage__filmsList').insertAdjacentHTML('beforeend', template0);
}

export function renderUlTemplateFunc() {
    const template = renderUlTemplate();
    document.querySelector('.main').insertAdjacentHTML('beforeend', template);
}

// renderUlTemplateFunc();
