import mainInput from '../templates/mainInput.hbs';
import mainButton from '../templates/mainButton.hbs';
import apiServices from './apiServices';
import { initHomePage, createCardFunc } from './initialHomePage';

const initSearchedFilms = async () => {
    const films = await apiServices.getSearch();
    if (films.length < 20) {
        document.querySelector('#js-nextButton').classList.add('homePage__hide');
    } else {
        document.querySelector('#js-nextButton').classList.remove('homePage__hide');
    }
    createCardFunc(films);
};

const initFilms = async () => {
    const films = await apiServices.get();
    if (films.length < 20) {
        document.querySelector('#js-nextButton').classList.add('homePage__hide');
    } else {
        document.querySelector('#js-nextButton').classList.remove('homePage__hide');
    }
    createCardFunc(films);
};

// document
//     .querySelector('.main-input')
//     .insertAdjacentHTML('beforeend', mainInput());
// document
//     .querySelector('.main-pagination')
//     .insertAdjacentHTML('beforeend', mainButton());
// document.querySelector('.js-plaginationPageNumber').textContent =
//     apiServices.page;
// document.querySelector('body').addEventListener('click', plaginationNavigation);
// document.querySelector('#js-backButton').classList.add('homePage__hide');
// document.querySelector('body').addEventListener('input', searchFilms);
// document.querySelector('body').addEventListener('keydown', searchFilmsEnter);

export function initPlagination() {
    document
        .querySelector('.main-input')
        .insertAdjacentHTML('beforeend', mainInput());
    document
        .querySelector('.main-pagination')
        .insertAdjacentHTML('beforeend', mainButton());
    document.querySelector('.js-plaginationPageNumber').textContent =
        apiServices.page;
    document.querySelector('body').addEventListener('click', plaginationNavigation);
    document.querySelector('#js-backButton').classList.add('homePage__hide');
    document.querySelector('body').addEventListener('input', searchFilms);
    document.querySelector('body').addEventListener('keydown', searchFilmsEnter);
}
initPlagination();

function searchFilms(event) {
    apiServices.query = event.target.value;
    // localStorage.setItem('input', event.target.value);
}

function errorNotis() {
    if (document.querySelector('.js-input').value === '') {
        if (document.querySelector('.homePage__error') === null) {
            const p = `<p class="homePage__error">Search result not successful. Enter the correct movie name and try again.</p>`;
            document
                .querySelector('.homePage__formblock')
                .insertAdjacentHTML('beforeend', p);
        }
    }
    if (
        document.querySelector('.js-input').value !== '' &&
        document.querySelector('.homePage__error') !== null
    ) {
        document
            .querySelector('.homePage__formblock')
            .removeChild(document.querySelector('.homePage__error'));
    }
    resetPage();
}

function searchFilmsEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (document.querySelector('.js-input').value === '') {
            errorNotis();
            return;
        }

        // event.preventDefault();
        errorNotis();
        initSearchedFilms();
        clearInput();
        clearCardList();
        // apiServices.query = '';
        // clearNotification();
        resetPage();
    }
}

function plaginationNavigation(event) {
    if (
        event.target === document.querySelector('img[alt="LOGO"]') ||
        event.target === document.querySelector('li.nav-menu__item--home') ||
        event.target === document.querySelector('li.nav-menu__item--library')
    ) {
        apiServices.query = '';
    }
    if (event.target === document.querySelector('#js-nextButton')) {
        apiServices.page += 1;
        document.querySelector('.js-plaginationPageNumber').textContent =
            apiServices.page;
        clearCardList();
        if (apiServices.query !== '') {
            initSearchedFilms();
        } else {
            initFilms();
        }
        // if (localStorage.getItem('input')) {
        //     apiServices.query = localStorage.getItem('input');
        //     initSearchedFilms();
        // } else {
        //     initHomePage();
        // }
    }
    if (event.target === document.querySelector('#js-backButton')) {
        apiServices.page -= 1;
        document.querySelector('.js-plaginationPageNumber').textContent =
            apiServices.page;
        clearCardList();
        if (apiServices.query !== '') {
            initSearchedFilms();
        } else {
            initFilms();
        }

        // initSearchedFilms();

        // if (localStorage.getItem('input')) {
        //     apiServices.query = localStorage.getItem('input');
        //     initSearchedFilms();
        // } else {
        //     initHomePage();
        // }
    }
    if (!document.querySelector('#js-backButton')) {
        return
    }
    if (apiServices.page === 1) {
        document.querySelector('#js-backButton').classList.add('homePage__hide');
        return;
    } else {
        document.querySelector('#js-backButton').classList.remove('homePage__hide');
    }

    // if (event.target === document.querySelector('#js-backButton'))
}

function resetPage() {
    apiServices.page = 1;
    // document.querySelector('#js-backButton').classList.add('homePage__hide');
    // document.querySelector('.js-plaginationPageNumber').textContent =
    //     apiServices.page;
}

function clearInput() {
    document.querySelector('.js-input').value = '';
}

function clearNotification() {
    document.querySelector('.error-note').innerHTML = '';
}

function clearCardList() {
    document.querySelector('.main-card-list').innerHTML = '';
}