import Notiflix from 'notiflix';

import ApiService from './js/APIservice';
import Pagination from './js/pagination';

import './js/colorTheme';
import './js/modal-window';
import './js/scrollToTo';
import './js/sortMenu';
import './js/authorization';

import { getAllTags } from './js/getTags';
import { renderCards } from './js/renderCards';
import { refs } from './js/refs';

const apiService = new ApiService();
const pagination = new Pagination(apiService.getOptionsPage());
const KEY_STORAGE = 'search';

getAllTags();

refs.form.addEventListener('submit', onSubmitForm);

apiService.getPopularFilms().then(films => {
  const pagination = new Pagination(apiService.getOptionsPage());

  renderCards(films);
  pagination.createPagination();
});

// PAGINATION
refs.paginationList.addEventListener('click', onClickBtn);
function onSubmitForm(event) {
  event.preventDefault();

  const inputSearch = refs.searchInput.value.trim();

  if (!inputSearch) {
    return Notiflix.Notify.warning('Sorry! But, string is empty');
  }
  localStorage.setItem(KEY_STORAGE, inputSearch);
  search();

  event.currentTarget.reset();
}

function search() {
  apiService._search = localStorage.getItem(KEY_STORAGE);

  try {
    apiService.getFilms().then(films => {
      refs.errorText.classList.add('hidden');

      if (films.length === 0) {
        return refs.errorText.classList.remove('hidden');
      }

      refs.contentsList.innerHTML = '';
      renderCards(films);
      const pagination = new Pagination(apiService.getOptionsPage());
      pagination._totalPages = apiService.getOptionsPage().totalPages;
      pagination.createPagination();
    });
  } catch (error) {
    console.log(error);
  }
}

function onClickBtn(event) {
  event.preventDefault();
  if (
    !event.target.hasAttribute('data-page') ||
    !event.target.nodeName === 'svg'
  ) {
    return;
  }

  const targetPage = event.target.dataset.page;

  apiService._paga = targetPage;
  pagination._currentPage = targetPage;

  apiService.getFilms().then(films => {
    refs.contentsList.innerHTML = '';
    renderCards(films);
    // const pagination = new Pagination(apiService.getOptionsPage());

    pagination.__currentPage = apiService._paga;
    pagination._totalPages = apiService.getOptionsPage().totalPages;

    pagination.createPagination();
  });
}

refs.myLibrary.addEventListener('click', event => {
  console.log('xxx');
});
