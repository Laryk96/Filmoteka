import ApiService from './js/APIservice';
import { renderCards } from './js/renderCards';
import { refs } from './js/refs';
const getFilms = new ApiService();

const KEY_STORAGE = 'search';

getFilms.getPopularFilms().then(films => {
  console.log(films);
  renderCards(films);
});

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const inputSearch = refs.searchInput.value;

  localStorage.setItem(KEY_STORAGE, inputSearch);
  search();
  event.currentTarget.reset();
}

function search() {
  try {
    getFilms._paga = 1;
    getFilms._search = localStorage.getItem(KEY_STORAGE);

    getFilms.searchFilms().then(films => {
      refs.contentsList.innerHTML = '';
      renderCards(films);
    });
  } catch {
    console.log('error');
  }
}
