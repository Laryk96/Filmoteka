import { refs } from './refs';
import { renderContentForModal } from './renderCards';

const KEY_STORAGE_FILMS = 'Popular movies';
const KEY_TO_WATHED = 'Wathed list';
const KEY_FOR_QUEUE = 'Queue list';
const KEY_CURRENT_ID = 'Current ID';

const watchedFilms = [];
const queueFilms = [];

refs.contentsList.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  refs.backdropFilm.classList.remove('is-hidden');
  document.body.classList.add('open-modal');

  const targetEl = Number(event.target.closest('li').dataset.id);

  const data = JSON.parse(localStorage.getItem(KEY_STORAGE_FILMS));
  const film = getFilmOfStorageById(data, targetEl);

  localStorage.setItem(KEY_CURRENT_ID, JSON.stringify(film.id));
  renderContentForModal(film);
  refs.modalContainer.addEventListener('click', createWatchedList);
  closeModal();
}

function closeModal() {
  removeEventListener('click', createWatchedList);

  document.querySelector('body').addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      document.body.classList.remove('open-modal');
      refs.backdropFilm.classList.add('is-hidden');
    }
  });

  refs.backdropFilm.addEventListener('click', event => {
    if (
      event.target.classList.contains('modal__close') ||
      event.target.nodeName === 'svg' ||
      event.target.nodeName === 'use' ||
      event.target.classList.contains('backdrop')
    ) {
      document.body.classList.remove('open-modal');
      refs.backdropFilm.classList.add('is-hidden');
    }
  });
}

function getFilmOfStorageById(films, id) {
  for (film of films) {
    if (film.id === id) {
      return film;
    }
  }
}

function createWatchedList(event) {
  const watchedBtnEl = document.querySelector('.modal__btn--to-watched');
  const queueBtnEl = document.querySelector('.modal__btn--to-queue');

  const targetBtn = event.target.dataset.list;
  const targetID = Number(localStorage.getItem(KEY_CURRENT_ID));
  const films = JSON.parse(localStorage.getItem(KEY_STORAGE_FILMS));
  const targetFilm = getFilmOfStorageById(films, targetID);

  const wathedFilmId = watchedFilms.findIndex(film => film.id === targetID);
  const queueFilmId = queueFilms.findIndex(film => film.id === targetID);

  switch (targetBtn) {
    case 'watched': {
      if (wathedFilmId !== -1) {
        watchedBtnEl.textContent = 'ADD TO WATCHED';

        watchedFilms.splice(wathedFilmId, 1);
        localStorage.setItem(KEY_TO_WATHED, JSON.stringify(watchedFilms));
        break;
      }

      if (!queueFilmId) {
        queueBtnEl.textContent = 'ADD TO WATCHED';
        queueBtnEl.style.backgroundColor = '#fff';
        queueBtnEl.style.color = '#000';
        queueBtnEl.style.border = '1px solid #000';

        queueFilms.splice(queueFilmId, 1);
        localStorage.setItem(KEY_FOR_QUEUE, JSON.stringify(queueFilms));
      }

      watchedBtnEl.textContent = 'REMOVE';

      watchedFilms.push(targetFilm);
      localStorage.setItem(KEY_TO_WATHED, JSON.stringify(watchedFilms));
      break;
    }

    case 'queue': {
      if (queueFilmId !== -1) {
        queueBtnEl.textContent = 'ADD TO QUEUE';

        queueFilms.splice(queueFilmId, 1);
        localStorage.setItem(KEY_FOR_QUEUE, JSON.stringify(queueFilms));
        break;
      }

      if (!wathedFilmId) {
        watchedBtnEl.textContent = 'ADD TO QUEUE';

        watchedFilms.splice(wathedFilmId, 1);
        localStorage.setItem(KEY_TO_WATHED, JSON.stringify(watchedFilms));
      }

      queueBtnEl.textContent = 'REMOVE';
      queueBtnEl.style.backgroundColor = '#ff6b01';
      queueBtnEl.style.border = 'none';
      queueBtnEl.style.color = '#ffff';

      queueFilms.push(targetFilm);
      localStorage.setItem(KEY_FOR_QUEUE, JSON.stringify(queueFilms));
      break;
    }
  }
}
