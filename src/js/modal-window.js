import { refs } from './refs';
const KEY_STORAGE_FILMS = 'films';

refs.contentsList.addEventListener('click', openModal);
function openModal(event) {
  event.preventDefault();
  const targetEl = Number(event.target.closest('li').dataset.id);
  const data = JSON.parse(localStorage.getItem(KEY_STORAGE_FILMS));

  const film = getFilmOfStorage(data, targetEl);
  updateModal(film);

  refs.backdrop.classList.remove('is-hidden');
  console.log(refs.backdrop);
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
