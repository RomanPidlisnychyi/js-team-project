// import 'films-queue-test.js';

// import  activeDetailsPage from './';
import itemsLibraryTemplate from '../templates/libraryCard.hbs';
import arrayQueue from './films-queue-test.js';
import arrayWatched from './films-watched.js';


import apiServices from '../js/apiServices';

const getFilms = async () => {
    const films = await apiServices.get();
    console.log(films);
};

getFilms();

const refsDOM = {
    ulLibrary: document.querySelector('.sectionFilms__list'),
    buttonQueue: document.querySelector('.libraryPage__btnFavorite'),
    buttonWatched: document.querySelector('.libraryPage__btnWatched'),
    libraryImg: document.querySelector('.libraryPage__filmImg'),
    emptyQueue: document.querySelector('.emptyQueue'),
    emptyWatched: document.querySelector('.emptyWatched')
}
// console.log('bq: ', refsDOM.buttonQueue);
refsDOM.buttonQueue.addEventListener('click', drawQueueFilmList);
refsDOM.buttonWatched.addEventListener('click', drawWatchedFilmList);


const createLibraryCardFunc = (imgPath, filmTitle, movieId, voteAverage) => {
    const liLibraryItems = document.createElement('li');
    // liLibraryItems.addEventListener('click', function(){ activeDetailsPage(movieId, true)});
    const vote = document.createElement('p');
    const title = document.createElement('h2');

}

function drawWatchedFilmList() {
    if (arrayWatched.length != 0) {
        refsDOM.emptyQueue.style.display = 'none';
        refsDOM.emptyWatched.style.display = 'none';
        insertLibraryItems(arrayWatched);
    } else {
        refsDOM.ulLibrary.innerHTML = '';
        refsDOM.emptyWatched.style.display = 'block';
    }
    // const fragment;

    // if (filmsQueue.length != 0){
    //     filmsQueue.map(movie => {
    //         createLibraryCardFunc(movie.backdrop_path, movie.original_title, movie.id, movie.vote_average)
    //         refsDOM.ulLibrary.innerHTML = '';
    //     })
    // }
}

function drawQueueFilmList() {
    if (arrayQueue.length != 0) {
        refsDOM.emptyQueue.style.display = 'none';
        refsDOM.emptyWatched.style.display = 'none';
        insertLibraryItems(arrayQueue);
    } else {
        refsDOM.ulLibrary.innerHTML = '';
        refsDOM.emptyQueue.style.display = 'block';
    }
}

// const  drawWatchedFilmList = (filmsWatched) => {
//     // const fragment;

//     if (filmsWatched.length != 0){
//         filmsWatched.map(movie => {
//             createLibraryCardFunc(movie.backdrop_path, movie.original_title, movie.id, movie.vote_average)
//             refsDOM.ulLibrary.innerHTML = '';
//         })
//     }  
// }


function insertLibraryItems(items) {
    refsDOM.ulLibrary.innerHTML = '';
    const template = itemsLibraryTemplate(items);
    
    refsDOM.ulLibrary.insertAdjacentHTML('beforeend', template);
    console.log('refs.ulLibrary: ', refsDOM.ulLibrary);
}

// insertLibraryItems(arrayQueue);
// const localWatched = localStorage.getItem('filmsWatched');
// console.log('localWatched: ', localWatched);
// console.log('arrayTest: ', arrayQueue);