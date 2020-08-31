import apiServices from './apiServices';
import { initHomePage } from './initialHomePage';
import { getFilmDetails } from './detailsPage';
import headerMarkup from '../templates/htmlHeader.hbs';
import footerMarkup from '../templates/htmlFooter.hbs';

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

function returnToStart() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
}

document.querySelector('body').addEventListener('click', onBodyClick);

function onBodyClick(event) {
    if (event.target.dataset.id !== undefined) {
        if (document.querySelector('.detailsPage') !== null) {
            return;
        }

        clearMainHTML();

        showDetails(event);
    }

    if (
        event.target === document.querySelector('img[alt="LOGO"]') ||
        event.target === document.querySelector('li.nav-menu__item--home')
    ) {
        apiServices.selectedMovieId = 0;
        apiServices.firstLoadPage = false;
        clearMainHTML();
        removeClassDetaislPage();
        showHomePage();
    }

    // if (event.target === document.querySelector('li.nav-menu__item--library')) {
    //     console.log('click on library');
    // }
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