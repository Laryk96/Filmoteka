import Notiflix from 'notiflix';
// import Pagination from 'tui-pagination';

import ApiService from './js/APIservice';
import { getAllTags } from './js/getTags';
import { renderCards } from './js/renderCards';
import { refs } from './js/refs';
import Paginations from './js/pagination';

import './js/colorTheme';
import './js/modal-window';
import './js/scrollToTo';
import './js/sortMenu';
import './js/authorization';

const apiService = new ApiService();

getAllTags();

apiService.getPopularFilms().then(films => {
  const paginate = new Paginations(apiService._totalPage);

  paginate.createPaginationForMovei();
  paginate.updateElements();
  renderCards(films);
});

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const inputSearch = refs.searchInput.value.trim();

  if (!inputSearch) {
    return Notiflix.Notify.warning('Sorry! But, string is empty');
  }

  request(inputSearch);

  event.currentTarget.reset();
}

function request(search) {
  apiService._search = search;

  try {
    apiService.getFilms().then(films => {
      refs.errorText.classList.add('hidden');

      if (films.length === 0) {
        return refs.errorText.classList.remove('hidden');
      }

      const paginate = new Paginations(apiService._totalPage);

      paginate.createPaginationForMovei();
      paginate.updateElements();

      refs.contentsList.innerHTML = '';
      renderCards(films);
    });
  } catch (error) {
    console.log(error);
  }
}
