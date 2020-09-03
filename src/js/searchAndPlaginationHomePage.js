import mainInput from '../templates/mainInput.hbs';
import mainButton from '../templates/mainButton.hbs';
import apiServices from './apiServices';
import { createCardFunc } from './initialHomePage';
import { returnToStart } from './navigation';

const initSearchedFilms = async() => {
    const films = await apiServices.getSearch();
    nextButtonHide(films);
    createCardFunc(films);

    if (films.length < 1) {
        document
            .querySelector('.js-plaginationPageNumber')
            .classList.add('homePage__hide');
        errorNotis();
        return;
    } else {
        document
            .querySelector('.js-plaginationPageNumber')
            .classList.remove('homePage__hide');
    }
    document.querySelector('.js-plaginationPageNumber').textContent =
        apiServices.page;
};

const initFilms = async() => {
    const films = await apiServices.get();
    nextButtonHide(films);
    createCardFunc(films);
};

function nextButtonHide(element) {
    if (element.length < 20) {
        document.querySelector('#js-nextButton').classList.add('homePage__hide');
    } else {
        document.querySelector('#js-nextButton').classList.remove('homePage__hide');
    }
}

export function renderMainInput() {
    const markup = mainInput();

    document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
}

export function renderMainPaginationBlock() {
    const markup = mainButton();
    document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
    document.querySelector('.js-plaginationPageNumber').textContent =
        apiServices.page;

    document
        .querySelector('body')
        .addEventListener('click', plaginationNavigation);
    document.querySelector('body').addEventListener('keydown', searchFilmsEnter);
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
    if (document.querySelector('.sectionFilms') === null) {
        return;
    }
    if (event.key === 'Enter') {
        event.preventDefault();
        apiServices.query = document.querySelector('.js-input').value;
        if (document.querySelector('.js-input').value === '') {
            errorNotis();
            return;
        }

        errorNotis();
        initSearchedFilms();
        clearInput();
        clearCardList();
        resetPage();
        prevBtnVisible();
    }
}

function onButtonClick() {
    document.querySelector('.js-plaginationPageNumber').textContent =
        apiServices.page;
    clearCardList();
    if (apiServices.query !== '') {
        initSearchedFilms();
    } else {
        initFilms();
    }
    returnToStart();
}

function plaginationNavigation(event) {
    if (document.querySelector('.sectionFilms') === null) {
        return;
    }

    if (
        event.target === document.querySelector('img[alt="LOGO"]') ||
        event.target === document.querySelector('li.nav-menu__item--home') ||
        event.target === document.querySelector('li.nav-menu__item--library')
    ) {
        apiServices.query = '';
        if (document.querySelector('.homePage__error') !== null) {
            document
                .querySelector('.homePage__formblock')
                .removeChild(document.querySelector('.homePage__error'));
        }
    }
    if (event.target === document.querySelector('#js-nextButton')) {
        apiServices.page += 1;
        onButtonClick();
    }
    if (event.target === document.querySelector('#js-backButton')) {
        apiServices.page -= 1;
        onButtonClick();
    }

    prevBtnVisible();
}

function prevBtnVisible() {
    if (apiServices.page === 1) {
        document.querySelector('#js-backButton').classList.add('homePage__hide');
        return;
    } else {
        document.querySelector('#js-backButton').classList.remove('homePage__hide');
    }
}

function resetPage() {
    apiServices.page = 1;
}

function clearInput() {
    document.querySelector('.js-input').value = '';
}

function clearCardList() {
    document.querySelector('.sectionFilms__list').innerHTML = '';
}