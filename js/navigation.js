import apiServices from './apiServices';
import { initHomePage } from './initialHomePage';
import { getFilmDetails } from './detailsPage';
import {renderUlTemplateFunc } from './libraryPage';
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

navRefs.homeBtn.addEventListener('click', showHomePage);
navRefs.footerBtn.addEventListener('click', returnToStart);
navRefs.logo.addEventListener('click', showHomePage);
navRefs.libraryBtn.addEventListener('click', showLibrary);

function showHomePage() {
    clearMainCardListHTML();
    apiServices.page = 1;
    document.querySelector('.js-plaginationPageNumber').textContent =
        apiServices.page;
    initHomePage();
}

function showLibrary() {
    clearMainHTML(); 
    renderUlTemplateFunc();
}

function clearMainCardListHTML() {
    refs.mainCardList.innerHTML = '';
    localStorage.removeItem('input');
}

export function clearMainHTML() {
    refs.main.innerHTML = '';
    localStorage.removeItem('input');
}

function returnToStart() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
}

document.querySelector('body').addEventListener('click', showDetails);

function showDetails(e) {
    console.log('eeeee img');
    if (e.target.nodeName !== 'IMG') {       
        return;
    }
    clearMainHTML();

    getFilmDetails();
}