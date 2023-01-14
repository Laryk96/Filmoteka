import ApiService from './js/APIservice';
import Pagination from './js/pagination';
import { renderCards } from './js/renderCards';
import { refs } from './js/refs';

const getFilms = new ApiService();
const KEY_STORAGE = 'search';

refs.form.addEventListener('submit', onSubmitForm);

getFilms.getPopularFilms().then(films => {
  const pagination = new Pagination(getFilms.getOptions());

  renderCards(films);
  pagination.createPagination();
});

function onSubmitForm(event) {
  event.preventDefault();

  const inputSearch = refs.searchInput.value;

  localStorage.setItem(KEY_STORAGE, inputSearch);
  search();
  event.currentTarget.reset();
}

function search() {
  getFilms._paga = 1;
  getFilms._search = localStorage.getItem(KEY_STORAGE);

  try {
    getFilms.searchFilms().then(films => {
      refs.errorText.classList.add('hidden');

      if (films.length === 0) {
        return refs.errorText.classList.remove('hidden');
      }

      refs.contentsList.innerHTML = '';
      renderCards(films);
      console.log(getFilms.getOptions());
      const pagination = new Pagination(getFilms.getOptions());
      pagination.createPagination();
    });
  } catch (error) {
    console.log(error);
  }
}
