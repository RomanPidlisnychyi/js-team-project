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
    logo: document.querySelector('.logo'),
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
    //!TODO: При клікі на разне різні фільми в showDetails;
    // console.log(document.querySelector(`.sectionFilms`));
    // console.log(event.target.dataset.id);

    if (event.target === navRefs.footerBtn) {
        returnToStart();
    }

    if (event.target.dataset.id !== undefined) {
        if (document.querySelector('.detailsPage') !== null) {
            return;
        }

        clearMainHTML();

        showDetails(event);
    }

    if (event.target === navRefs.logo || event.target === navRefs.homeBtn) {
        apiServices.selectedMovieId = 0;
        apiServices.query = '';
        clearMainHTML();
        removeClassDetaislPage();
        showHomePage();
    }

    if (event.target === navRefs.libraryBtn) {
        console.log('click on library');
        clearMainHTML();
        removeClassDetaislPage();
        renderUlTemplateFunc();
    }

    if (event.target === document.querySelector('.libraryPage__btnWatched')) {
        document.querySelector('.libraryPage__filmsList').innerHTML = '';
        document.querySelector('.libraryPage__btnWatched').disabled = true;
        document.querySelector('.libraryPage__btnFavorite').disabled = false;
        const films = JSON.parse(localStorage.getItem('watchedFilms'));
        drawWatchedFilmList(films);
    }

    if (event.target === document.querySelector('.libraryPage__btnFavorite')) {
        document.querySelector('.libraryPage__filmsList').innerHTML = '';
        document.querySelector('.libraryPage__btnFavorite').disabled = true;
        document.querySelector('.libraryPage__btnWatched').disabled = false;
        const films = JSON.parse(localStorage.getItem('queueFilms'));
        drawWatchedFilmList(films);
    }
}

function showDetails(event) {
    apiServices.selectedMovieId = Number(event.target.dataset.id);
    getFilmDetails();
    addClassDetaislPage();
}

function addClassDetaislPage() {
    document.querySelector('.main').classList.add('main-detailsPage');
}

function removeClassDetaislPage() {
    document.querySelector('.main').classList.remove('main-detailsPage');
}