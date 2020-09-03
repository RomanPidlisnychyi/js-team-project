import apiServices from '../js/apiServices';
import detailsPage from '../templates/detailsPage.hbs';

if (JSON.parse(localStorage.getItem('queueFilms')) === null) {
    localStorage.setItem('queueFilms', JSON.stringify([]));
}

if (JSON.parse(localStorage.getItem('watchedFilms')) === null) {
    localStorage.setItem('watchedFilms', JSON.stringify([]));
}

const queueFilms = JSON.parse(localStorage.getItem('queueFilms'));

const watchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));

let selectedMovie;

export const getFilmDetails = async() => {
    if (apiServices.selectedMovieId === 0) {
        return;
    }

    selectedMovie = await apiServices.getFilmById();

    const markup = detailsPage(selectedMovie);

    document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
    onRenderDetailsPage();
};

document.querySelector('body').onclick = onBodyClick;

function onBodyClick(event) {
    if (event.target === document.querySelector('.detailsPage__btnAddFavorite')) {
        btnControlQueue(event);
    }
    if (event.target === document.querySelector('.detailsPage__btnAddWatched')) {
        btnControlWatched(event);
    }
}

function btnQueueTextContent() {
    if (queueFilms === null) {
        return;
    }

    const selectedFilmInColection = queueFilms.filter(
        element => element.id === apiServices.selectedMovieId,
    );

    if (selectedFilmInColection.length > 0) {
        document.querySelector('.detailsPage__btnAddFavorite').textContent =
            'Delete from queue';
    } else {
        document.querySelector('.detailsPage__btnAddFavorite').textContent =
            'Add to queue';
    }
}

function btnWatchedTextContent() {
    if (watchedFilms === null) {
        return;
    }

    const selectedFilmInColection = watchedFilms.filter(
        element => element.id === apiServices.selectedMovieId,
    );

    if (selectedFilmInColection.length > 0) {
        document.querySelector('.detailsPage__btnAddWatched').textContent =
            'Delete from watched';
    } else {
        document.querySelector('.detailsPage__btnAddWatched').textContent =
            'Add to watched';
    }
}

function onRenderDetailsPage() {
    btnQueueTextContent();
    btnWatchedTextContent();
}

function btnControlQueue(event) {
    const selectedFilmInColection = queueFilms.filter(
        element => element.id === apiServices.selectedMovieId,
    );

    if (selectedFilmInColection.length > 0) {
        queueFilms.forEach((element, index) => {
            if (apiServices.selectedMovieId === element.id) {
                queueFilms.splice(index, 1);
                localStorage.setItem('queueFilms', JSON.stringify(queueFilms));
                document.querySelector('.detailsPage__btnAddFavorite').textContent =
                    'Add to queue';
            }
        });
    } else {
        queueFilms.push(selectedMovie);
        localStorage.setItem('queueFilms', JSON.stringify(queueFilms));
        document.querySelector('.detailsPage__btnAddFavorite').textContent =
            'Delete from queue';
    }
}

function btnControlWatched(event) {
    const selectedFilmInColection = watchedFilms.filter(
        element => element.id === apiServices.selectedMovieId,
    );

    if (selectedFilmInColection.length > 0) {
        watchedFilms.forEach((element, index) => {
            if (apiServices.selectedMovieId === element.id) {
                watchedFilms.splice(index, 1);
                localStorage.setItem('watchedFilms', JSON.stringify(watchedFilms));
                document.querySelector('.detailsPage__btnAddWatched').textContent =
                    'Add to watched';
            }
        });
    } else {
        watchedFilms.push(selectedMovie);
        localStorage.setItem('watchedFilms', JSON.stringify(watchedFilms));
        document.querySelector('.detailsPage__btnAddWatched').textContent =
            'Delete from watched';
    }
}