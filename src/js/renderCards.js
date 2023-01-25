import { refs } from './refs';
import { getTagsById, checkTags } from './getTags';

const KEY_TO_WATHED = 'Wathed list';
const KEY_FOR_QUEUE = 'Queue list';

function createCard(film) {
  const { overview, title, poster_path, release_date, genre_ids, id } = film;

  const tags = checkTags(getTagsById(genre_ids));

  return ` <li data-id="${id}" class="contents__item"><a href="./">${
    poster_path
      ? `<img src="https://image.tmdb.org/t/p/w500${poster_path}"`
      : `<img src="https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj"`
  }
             class="contents__img"
             alt="${title}"
             width="280"
             loading="lazy"
             />
             <div class="wrapper-text"><p class="contents__text"> ${title}</p>
              <p class="contents__tag">${tags} | ${release_date.slice(
    0,
    4
  )}</p></div>
              </a></li>`;
}

function updateBtn(id) {
  const wathedFilm = JSON.parse(localStorage.getItem(KEY_TO_WATHED));
  const queueFilm = JSON.parse(localStorage.getItem(KEY_FOR_QUEUE));

  const isWathced = wathedFilm ? wathedFilm.find(film => film.id === id) : null;

  const isQueue = queueFilm ? queueFilm.find(film => film.id === id) : null;

  return {
    watched: isWathced ? 'REMOVE' : 'ADD TO WATCHED',
    queue: isQueue ? 'REMOVE' : 'ADD TO QUEUE',
    backgroundColor: isQueue ? 'add' : '',
  };
}

function renderCards(apiData) {
  const markup = apiData.map(createCard).join('');

  refs.contentsList.innerHTML = markup;
}

function renderContentForModal(film) {
  const {
    original_title,
    poster_path,
    tags,
    popularity,
    vote_average,
    overview,
    id,
    genre_ids,
    vote_count,
    title,
  } = film;

  const genre = getTagsById(genre_ids);
  const { watched, queue, backgroundColor } = updateBtn(id);

  const img = `<img src="https://image.tmdb.org/t/p/w500${poster_path}"
   class="contents__img"
          alt=""
          width="280"
          loading="lazy"/>`;

  const markup = ` <h2 class="modal__title">${title}</h2>
        <div class="modal__description">
          <ul class="modal__list">
            <li class="modal__item">Vote / Votes</li>
            <li class="modal__item">Popularity</li>
            <li class="modal__item">Original Title</li>
            <li class="modal__item">Genre</li>
          </ul>
          <ul class="modal__list-value">
            <li class="modal__item-value">
              <span class="modal__item-value--rating vote_average">${vote_average}</span> / ${vote_count}
            </li>
            <li class="modal__item-value popularity">${popularity}</li>
            <li class="modal__item-value original_title">${original_title}</li>
            <li class="modal__item-value tags">${genre}</li>
          </ul>
        </div>
        <h3 class="modal__subtitle">about</h3>
        <p class="modal__text overview">${overview}</p>
        <ul class="modal__btn-list">
          <li>
            <button
              class="modal__btn modal__btn--to-watched active"
              data-list="watched" >
             ${watched}
            </button>
          </li>
          <li>
            <button class="modal__btn modal__btn--to-queue ${backgroundColor}" data-list="queue">${queue}</button>
          </li>
        </ul>`;

  refs.leftBoxModal.innerHTML = '';
  refs.rightBoxModal.innerHTML = '';

  refs.leftBoxModal.innerHTML = img;
  refs.rightBoxModal.innerHTML = markup;
}

export { renderCards, createCard, renderContentForModal };
