import apiServices from '../js/apiServices';
import detailsPage from '../templates/detailsPage.hbs';

let queueFilms = JSON.parse(localStorage.getItem('queueFilms'));

let watchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));

let selectedMovie;

export const getFilmDetails = async() => {
    selectedMovie = await apiServices.getFilmById();

    const markup = detailsPage(selectedMovie);

    document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
    onRenderDetailsPage();
};

document.querySelector('body').onclick = onBodyClick;

function onBodyClick(event) {
    if (event.target === document.querySelector('.detailsPage__btnAddFavorite')) {
        btnControlQueue();
    }
    if (event.target === document.querySelector('.detailsPage__btnAddWatched')) {
        btnControlWatched();
    }
}

function btnQueueTextContent() {
    if (queueFilms === null) {
        return;
    }

    const selectedFilmInColection = queueFilms.filter(
        element => element === apiServices.selectedMovieId,
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
        element => element === apiServices.selectedMovieId,
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

function btnControlQueue() {
    if (JSON.parse(localStorage.getItem('queueFilms')) === null) {
        localStorage.setItem('queueFilms', JSON.stringify([]));
        queueFilms = JSON.parse(localStorage.getItem('queueFilms'));
    }

    const selectedFilmInColection = queueFilms.filter(
        element => element === apiServices.selectedMovieId,
    );

    if (selectedFilmInColection.length > 0) {
        queueFilms.forEach((element, index) => {
            if (apiServices.selectedMovieId === element) {
                queueFilms.splice(index, 1);
                localStorage.setItem('queueFilms', JSON.stringify(queueFilms));
                document.querySelector('.detailsPage__btnAddFavorite').textContent =
                    'Add to queue';
                if (queueFilms.length < 1) {
                    localStorage.removeItem('queueFilms');
                }
            }
        });
    } else {
        queueFilms.push(selectedMovie.id);
        localStorage.setItem('queueFilms', JSON.stringify(queueFilms));
        document.querySelector('.detailsPage__btnAddFavorite').textContent =
            'Delete from queue';
    }
}

function btnControlWatched() {
    if (JSON.parse(localStorage.getItem('watchedFilms')) === null) {
        localStorage.setItem('watchedFilms', JSON.stringify([]));
        watchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));
    }

    const selectedFilmInColection = watchedFilms.filter(
        element => element === apiServices.selectedMovieId,
    );

    if (selectedFilmInColection.length > 0) {
        watchedFilms.forEach((element, index) => {
            if (apiServices.selectedMovieId === element) {
                watchedFilms.splice(index, 1);
                localStorage.setItem('watchedFilms', JSON.stringify(watchedFilms));
                document.querySelector('.detailsPage__btnAddWatched').textContent =
                    'Add to watched';
                if (watchedFilms.length < 1) {
                    localStorage.removeItem('watchedFilms');
                }
            }
        });
    } else {
        watchedFilms.push(selectedMovie.id);
        localStorage.setItem('watchedFilms', JSON.stringify(watchedFilms));
        document.querySelector('.detailsPage__btnAddWatched').textContent =
            'Delete from watched';
    }
}