import apiServices from './apiServices';
import { initHomePage } from './initialHomePage';
import { getFilmDetails } from './detailsPage';
import headerMarkup from '../templates/htmlHeader.hbs';
import footerMarkup from '../templates/htmlFooter.hbs';
import {
    renderUlTemplateFunc,
    drawWatchedFilmList,
    drawQueueFilmList,
} from './libraryPage';

const refs = {
    header: document.querySelector('.header'),
    main: document.querySelector('.main'),
    mainCardList: document.querySelector('.main-card-list'),
    footer: document.querySelector('.footer'),
};

refs.header.insertAdjacentHTML('beforeend', headerMarkup());
refs.footer.insertAdjacentHTML('beforeend', footerMarkup());

const navRefs = {
    homeBtn: document.querySelector('.nav-menu__item--home'),
    libraryBtn: document.querySelector('.nav-menu__item--library'),
    footerBtn: document.querySelector('.footer-btn'),
    logo: document.querySelector('img[alt="LOGO"]'),
};

function showHomePage() {
    apiServices.page = 1;
    initHomePage();
}

function clearMainHTML() {
    document.querySelector('.main').innerHTML = '';
}

export function returnToStart() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
}

document.querySelector('body').addEventListener('click', onBodyClick);

function onBodyClick(event) {
    if (event.target === navRefs.footerBtn) {
        returnToStart();
    }

    if (
        event.target ===
        document.querySelector(
            `.sectionFilms__img[data-id="${event.target.dataset.id}"]`,
        ) ||
        event.target ===
        document.querySelector(
            `.libraryPage__filmImg[data-id="${event.target.dataset.id}"]`,
        )
    ) {
        apiServices.selectedMovieId = Number(event.target.dataset.id);
        clearMainHTML();

        showDetails();
    }

    if (event.target === navRefs.logo || event.target === navRefs.homeBtn) {
        apiServices.query = '';
        apiServices.selectedMovieId = '';
        clearMainHTML();
        removeClassDetaislPage();
        showHomePage();
    }
    if (event.target === navRefs.libraryBtn) {
        const filmsId = JSON.parse(localStorage.getItem('queueFilms'));
        clearMainHTML();
        removeClassDetaislPage();
        renderUlTemplateFunc();
        libraryPageBtnFavoriteOnClick();
    }

    if (event.target === document.querySelector('.libraryPage__btnWatched')) {
        libraryPageBtnWatchedOnClick();
    }

    if (event.target === document.querySelector('.libraryPage__btnFavorite')) {
        libraryPageBtnFavoriteOnClick();
    }
}

function checkLengthColection(collection, collectionListName) {
    if (collection !== null) {
        const getFilms = getFilmsColection(collection);
        getFilms.then(films => {
            collectionListName(films);
        });
    } else {
        collection = null;
        collectionListName(collection);
    }
}

async function getFilmsColection(filmsId) {
    const films = [];

    for (let i = 0; i < filmsId.length; i += 1) {
        const film = await apiServices.getFilmById(filmsId[i]);
        films.push(film);
    }

    return films;
}

function libraryPageBtnWatchedOnClick() {
    document.querySelector('.libraryPage__filmsList').innerHTML = '';
    document.querySelector('.libraryPage__btnWatched').disabled = true;
    document.querySelector('.libraryPage__btnFavorite').disabled = false;
    document
        .querySelector('.libraryPage__btnWatched')
        .classList.add('libraryPage__btn--active');
    document
        .querySelector('.libraryPage__btnFavorite')
        .classList.remove('libraryPage__btn--active');

    const filmsId = JSON.parse(localStorage.getItem('watchedFilms'));

    checkLengthColection(filmsId, drawWatchedFilmList);
}

function libraryPageBtnFavoriteOnClick() {
    document.querySelector('.libraryPage__filmsList').innerHTML = '';
    document.querySelector('.libraryPage__btnFavorite').disabled = true;
    document.querySelector('.libraryPage__btnWatched').disabled = false;
    document
        .querySelector('.libraryPage__btnWatched')
        .classList.remove('libraryPage__btn--active');
    document
        .querySelector('.libraryPage__btnFavorite')
        .classList.add('libraryPage__btn--active');

    const filmsId = JSON.parse(localStorage.getItem('queueFilms'));

    checkLengthColection(filmsId, drawQueueFilmList);
}

function showDetails() {
    getFilmDetails();
    addClassDetaislPage();
}

function addClassDetaislPage() {
    document.querySelector('.main').classList.add('main-detailsPage');
}

function removeClassDetaislPage() {
    document.querySelector('.main').classList.remove('main-detailsPage');
}