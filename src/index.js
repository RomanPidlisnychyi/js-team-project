import './styles.scss';
// import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
import './js/initialHomePage';
import './js/searchAndPlaginationHomePage';
import './js/navigation';
import './js/filmDetailsPage';
import './js/libraryPage';
import apiServices from './js/apiServices';
import detailsPage from './templates/detailsPage.hbs';

const getFilms = async() => {
    const films = await apiServices.get();
    console.log(films[0]);
    const markup = detailsPage(films[2]);

    document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
};

getFilms();

document.querySelector('body').onclick = onBodyClick;

function onBodyClick(event) {
    // console.log(event);
    if (event.target === document.querySelector('.detailsPage__btnAddFavorite')) {
        console.log('addBtn');
        event.target.textContent = 'qweqwe';
    }
}