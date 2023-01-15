import ApiService from './js/APIservice';
import Pagination from './js/pagination';
// import SimpleLightbox from 'simplelightbox';
import { getAllTags } from './js/getTags';
import { renderCards } from './js/renderCards';
import { refs } from './js/refs';
import Notiflix from 'notiflix';

const apiService = new ApiService();
const pagination = new Pagination(apiService.getOptionsPage());
const KEY_STORAGE = 'search';
const KEY_STORAGE_FILMS = 'films';
getAllTags();

refs.form.addEventListener('submit', onSubmitForm);
refs.paginationList.addEventListener('click', onClickBtn);
refs.contentsList.addEventListener('click', openModal);
apiService.getPopularFilms().then(films => {
  const pagination = new Pagination(apiService.getOptionsPage());

  renderCards(films);
  pagination.createPagination();
});

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

function openModal(event) {
  event.preventDefault();

  const targetEl = Number(event.target.closest('li').dataset.id);
  const data = JSON.parse(localStorage.getItem(KEY_STORAGE_FILMS));

  const film = getFilmOfStorage(data, targetEl);
  updateModal(film);

  refs.backdrop.classList.remove('is-hidden');

  closeModal();

  // if(event.currentTarget)
}

function closeModal() {
  refs.backdrop.addEventListener('click', event => {
    document.querySelector('body').addEventListener('keydown', e => {
      if (e.code === 'escape') {
        refs.backdrop.classList.add('is-hidden');
      }
    });
    if (
      event.target.classList.contains('modal__close') ||
      event.target.nodeName === 'svg' ||
      event.target.nodeName === 'use' ||
      event.target.classList.contains('backdrop')
    ) {
      refs.backdrop.classList.add('is-hidden');
    }
  });
}

function getFilmOfStorage(films, id) {
  for (film of films) {
    if (film.id === id) {
      return film;
    }
  }
}

function updateModal(film) {
  const {
    original_title,
    poster_path,
    tags,
    popularity,
    vote_average,
    overview,
  } = film;

  const img = `<img src="https://image.tmdb.org/t/p/w500${poster_path}"
   class="contents__img"
          alt=""
          width="280"
          loading="lazy"/>`;

  refs.modalImgBox.innerHTML = '';
  refs.modalImgBox.insertAdjacentHTML('afterbegin', img);
  refs.modalPopular.textContent = popularity;
  refs.modalTitle.textContent = original_title;
  refs.modalRaiting.textContent = vote_average;
  refs.modalOverview.textContent = overview;

  //   refs.modalTags.textContent = tags;
}
