import './styles.scss';
import './js/initialHomePage';
import './js/searchAndPlaginationHomePage';
import './js/navigation';
import './js/filmDetailsPage';
import './js/libraryPage';
import apiServices from './js/apiServices';
import detailsPage from './templates/detailsPage.hbs';

// https://image.tmdb.org/t/p/w500//TnOeov4w0sTtV2gqICqIxVi74V.jpg

const getFilms = async() => {
    const films = await apiServices.get();
    console.log(films[0]);
    // const markup = `<img src="https://image.tmdb.org/t/p/w500//${films[0].poster_path}" alt="">
    // `;

    const markup = detailsPage(films[2]);

    // console.log(markup);

    // document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
};

getFilms();