import renderUlTemplate from '../templates/renderUlTemplate.hbs';
import itemsLibraryTemplate from '../templates/libraryCard.hbs';

import arrayQueue from './films-queue-test.js'; // !local storage
import arrayWatched from './films-watched.js'; // !local storage
// import apiServices from '../js/apiServices';

import '../font-awesome-4.7.0/css/font-awesome.min.css';

// const refsDOM = {
//     ulLibrary: document.querySelector('.libraryPage__filmsList'),
//     buttonQueue: document.querySelector('.libraryPage__btnFavorite'),
//     buttonWatched: document.querySelector('.libraryPage__btnWatched'),
//     libraryImg: document.querySelector('.libraryPage__filmImg'),
//     emptyQueue: document.querySelector('.libraryPage__emptyQueue'),
//     emptyWatched: document.querySelector('.libraryPage__emptyWatched'),
// }


document.querySelector('body').addEventListener('click', drawWatchedFilmList);
document.querySelector('body').addEventListener('click', drawQueueFilmList);


function drawWatchedFilmList(event) {
    const el = event.target;
    // console.log('el: ', el);
    const btnW = document.querySelector('.libraryPage__btnWatched');    
    // console.log('refsDOM.buttonWatched: ', btnW);
    if (el === btnW) {
        document.querySelector('.libraryPage__filmsList').innerHTML = '';
        if (arrayWatched.length != 0) {
            // refsDOM.ulLibrary = document.querySelector('.libraryPage__filmsList');
            // console.log('refsDOM.ulLibrary: ', refsDOM.ulLibrary);
            // document.querySelector('.libraryPage__filmsList').innerHTML = '';
            
            insertLibraryItems(arrayWatched);
            document.querySelector('.libraryPage__btnWatched').classList.add('libraryPage__btn--active');
            document.querySelector('.libraryPage__btnFavorite').classList.remove('libraryPage__btn--active');
            document.querySelector('.libraryPage__emptyQueue').style.display = 'none';
            document.querySelector('.libraryPage__emptyWatched').style.display = 'none';
            // console.log('refsDOM.emptyWatched: ', refsDOM.emptyWatched);

        } else {
            
            document.querySelector('.libraryPage__emptyWatched').style.display = 'block';
        }
    }
}

function drawQueueFilmList(event) {
    // const el = event.target;
    // const btnQ = document.querySelector('.libraryPage__btnFavorite');
    // console.log('refsDOM.buttonWatched: ', refsDOM.buttonWatched);

    if (event.target == document.querySelector('.libraryPage__btnFavorite')) {
        document.querySelector('.libraryPage__filmsList').innerHTML = '';
        if (arrayQueue.length != 0) {
            document.querySelector('.libraryPage__btnFavorite').classList.add('libraryPage__btn--active');
            document.querySelector('.libraryPage__btnWatched').classList.remove('libraryPage__btn--active');
            document.querySelector('.libraryPage__emptyQueue').style.display = 'none';
            document.querySelector('.libraryPage__emptyWatched').style.display = 'none';
            document.querySelector('.libraryPage__filmsList')
            // refsDOM.ulLibrary.innerHTML = '';
            insertLibraryItems(arrayQueue);
        } else {

            // refsDOM.ulLibrary.innerHTML = '';
            document.querySelector('.libraryPage__emptyQueue').style.display = 'block';
        }
    }
}

function insertLibraryItems(items) {
    const template0 = itemsLibraryTemplate(items);
    document.querySelector('.libraryPage__filmsList').insertAdjacentHTML('beforeend', template0);
    // console.log('refs.ulLibrary: ', refsDOM.ulLibrary);
}

export function renderUlTemplateFunc() {
    const template = renderUlTemplate();
    document.querySelector('.main').insertAdjacentHTML('beforeend', template);
}

// renderUlTemplateFunc();


// const localWatched = localStorage.getItem('filmsWatched');
// console.log('localWatched: ', localWatched);
// console.log('arrayTest: ', arrayQueue);