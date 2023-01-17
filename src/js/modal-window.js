import { refs } from './refs';
import { getTagsById } from './getTags';
import { renderCards, createCard } from './renderCards';
const KEY_STORAGE_FILMS = 'films';
const KEY_FOR_QUEUE = 'Queue-List';
const KEY_TO_WATHED = 'Wathed-List';
const KEY_CURRENT_ID = 'current-ID';
const watchedFilms = [];
const queueFilms = [];
refs.contentsList.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();
  refs.backdrop.classList.remove('is-hidden');

  const targetEl = Number(event.target.closest('li').dataset.id);
  const data = JSON.parse(localStorage.getItem(KEY_STORAGE_FILMS));

  const film = getFilmOfStorageById(data, targetEl);

  localStorage.setItem(KEY_CURRENT_ID, JSON.stringify(film.id));
  refs.btnListModal.addEventListener('click', createWatchedList);
  updateModal(film);
  closeModal();
}

function closeModal() {
  removeEventListener('click', createWatchedList);

  document.querySelector('body').addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      refs.backdrop.classList.add('is-hidden');
    }
  });

  refs.backdrop.addEventListener('click', event => {
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

function getFilmOfStorageById(films, id) {
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
  refs.modalPopular.innerHTML = popularity;
  refs.modalTitle.innerHTML = original_title;
  refs.modalRaiting.innerHTML = vote_average;
  refs.modalOverview.innerHTML = overview;
  refs.modalTags.innerHTML = genre;
}

function createWatchedList(event) {
   const targetBtn = event.target.dataset.list;
  const targetID = Number(localStorage.getItem(KEY_CURRENT_ID));

  const films = JSON.parse(localStorage.getItem(KEY_STORAGE_FILMS));
  const targetFilm = getFilmOfStorageById(films, targetID);

  const wathedFilmId = watchedFilms.findIndex(film => film.id === targetID);
  const queueFilmId = queueFilms.findIndex(film => film.id === targetID);


  switch (targetBtn) {
  
    case 'watched': {
      console.log(wathedFilmId);
      if (wathedFilmId !== -1) {
        refs.addWatch.textContent = 'ADD TO WATCHED';
        
         watchedFilms.splice(wathedFilmId, 1);
        localStorage.setItem(KEY_TO_WATHED, JSON.stringify(watchedFilms));
      break;
      }
    
      refs.addWatch.textContent = 'REMOVE';

      watchedFilms.push(targetFilm);
    localStorage.setItem(KEY_TO_WATHED, JSON.stringify(watchedFilms));
    break;
    }
      
    case 'queue': {
      if (queueFilmId !== -1) {
        refs.addQueue.textContent = 'ADD TO QUEUE';
    
        queueFilms.splice(queueFilmId, 1);
        localStorage.setItem(KEY_FOR_QUEUE, JSON.stringify(queueFilms));
      break;
      }

      refs.addQueue.textContent = 'REMOVE';
      refs.addQueue.style.backgroundColor = "#ff6b01";
      refs.addQueue.style.border = "none";
      refs.addQueue.style.color = "#ffff";
      
      queueFilms.push(targetFilm);
      localStorage.setItem(KEY_FOR_QUEUE, JSON.stringify(queueFilms));
    break;
    }
    // case "queue": {
    //   if (queueFilmId !== -1) {
          
    //     refs.addQueue.textContent = 'ADD TO QUEUE';
    //     refs.addQueue.style.backgroundColor = "#ff6b01";


    //   queueFilms.splice(removeById, 1);
    //   localStorage.setItem(KEY_FOR_QUEUE, JSON.stringify(queueFilms));
    //   break;
    //   }
      
    //   refs.addQueue.textContent = "REMOVE";
    //   refs.addQueue.style.backgroundColor = "#ff6b01";
    //   refs.addQueue.style.border = "none";
    //   refs.addQueue.style.color = "#ffff";
      
      
    //   queueFilms.push(targetFilm);
    // localStorage.setItem(KEY_FOR_QUEUE, JSON.stringify(queueFilms));
    // break;
    //   }

}

// function renderCardForLib(film) {
//   const markup = createCard(film);
// }

// function pushStorage(key, film) {
//   localStorage.getItem(key)
//     ? localStorage.setItem(key, '')
//     : localStorage.setItem(key, JSON.stringify(film));

//   return localStorage.getItem(key);
// }

// function handleBtnClick() {}

// function updateStorage() {
//   localStorage.getItem(KEY_TO_WATHED) !== null
//     ? localStorage.getItem(KEY_TO_WATHED)
//     : localStorage.setItem(KEY_TO_WATHED, JSON.stringify(watchedFilms));
// }
