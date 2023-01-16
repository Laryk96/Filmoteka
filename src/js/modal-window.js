import { refs } from './refs';
import { getTagsById } from './getTags';
import { renderCards, createCard } from './renderCards';
const KEY_STORAGE_FILMS = 'films';
const KEY_TO_WATHED = 'Wathed-List';
const KEY_FOR_QUEUE = 'Queue-List';
const KEY_CURRENT_ID = 'current-ID';

refs.contentsList.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();
  refs.backdrop.classList.remove('is-hidden');

  const targetEl = Number(event.target.closest('li').dataset.id);
  const data = JSON.parse(localStorage.getItem(KEY_STORAGE_FILMS));

  const film = getFilmOfStorage(data, targetEl);
  updateModal(film);
  localStorage.setItem(KEY_CURRENT_ID, JSON.stringify(film.id));
  handleBtnClick();
  closeModal();
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
    id,
    genre_ids,
  } = film;

  const genre = getTagsById(genre_ids);

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
  refs.modalTags.textContent = genre;
}

function handleBtnClick() {
  refs.btnListModal.addEventListener('click', addFilmsInList);
}

function addFilmsInList(event) {
  const targetBtn = event.target.dataset.list;
  const targetID = Number(localStorage.getItem(KEY_CURRENT_ID));
  const data = JSON.parse(localStorage.getItem(KEY_STORAGE_FILMS));
  const film = getFilmOfStorage(data, targetID);

  switch (targetBtn) {
    case 'watched': {
      const result = pushStorage(KEY_TO_WATHED, film);

      if (result === '') {
        refs.addWatch.textContent = 'REMOVE';
      } else {
        refs.addWatch.textContent = 'ADD TO WATCHED';

        renderCardForLib(JSON.parse(result));
      }

      break;
    }
    case 'queue': {
      const result = pushStorage(KEY_FOR_QUEUE, film);

      if (result !== '') {
        refs.addQueue.textContent = 'REMOVE';
      } else {
        refs.addQueue.textContent = 'ADD TO QUEUE';
      }
    }
  }
}

function pushStorage(key, film) {
  localStorage.getItem(key)
    ? localStorage.setItem(key, '')
    : localStorage.setItem(key, JSON.stringify(film));

  return localStorage.getItem(key);
}

function renderCardForLib(film) {
  console.log(film);
  const markup = createCard(film);
}
