import apiServices from './apiServices';
import { initHomePage} from './initialHomePage';
import { getFilmDetails } from './detailsPage';
import { renderUlTemplateFunc, insertLibraryItems, readLocalStorage } from './libraryPage';
import headerMarkup from '../templates/htmlHeader.hbs';
import footerMarkup from '../templates/htmlFooter.hbs';
import { initPlagination } from '../js/searchAndPlaginationHomePage';



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
// navRefs.logo.addEventListener('click', showHomePage);
navRefs.libraryBtn.addEventListener('click', showLibrary);

function showHomePage() {
    clearMainCardListHTML();
    apiServices.page = 1;
    // document.querySelector('.js-plaginationPageNumber').textContent =
    //     apiServices.page;
    initHomePage();
    // initPlagination();
}

function showLibrary() {
    clearMainHTML();
    renderUlTemplateFunc();
    insertLibraryItems(readLocalStorage('filmsWatched'));
    document.querySelector('.libraryPage__btnWatched').classList.add('libraryPage__btn--active');
    document.querySelector('.libraryPage__btnFavorite').classList.remove('libraryPage__btn--active');
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

function addMainHTMLtoBody() {
    const mainSection = `        
            <div class="main-input"></div>
            <div class="main-card-list"></div>
            <div class="main-pagination"></div>
        `;
    document.querySelector('.main').insertAdjacentHTML('beforeend', mainSection);
}

document.querySelector('body').addEventListener('click', showDetails);
//click on a card's image
function showDetails(e) {

    console.log('e.target: ', e.target);

    //if click not on the big image from deteilsPage
    if (e.target.nodeName === 'IMG' && e.target.className !== 'detailsPage__img' && 
    e.target !== document.querySelector('img[alt="LOGO"]')) {
        apiServices.selectedMovieId = Number.parseInt(e.target.dataset.userId);
        clearMainHTML();
        getFilmDetails();
    }

    //if click on the HOME button
    if (e.target.id === 'nav-menu__item--home') {
        clearMainHTML();
        apiServices.page = 1;
        // document.querySelector('.js-plaginationPageNumber').textContent =
        //     apiServices.page;
        addMainHTMLtoBody();
        initHomePage();
        initPlagination();
    }
}