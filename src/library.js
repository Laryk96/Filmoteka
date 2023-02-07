import { refs } from './js/refs';
import './js/colorTheme';
import './js/scrollToTo';
import './js/modal-window';
import './js/sortMenu';

import { renderCards } from './js/renderCards';

const KEY_TO_WATHED = 'Wathed list';
const KEY_FOR_QUEUE = 'Queue list';

refs.changeListLib.addEventListener('click', onBtnClick);

updateCards();

function onBtnClick(e) {
  const currentBtn = e.target.dataset.btn;

  switch (currentBtn) {
    case 'watched': {
      refs.watchedLibraryBrn.classList.add('current');
      refs.queueLibraryBrn.classList.remove('current');
      updateCards();
      break;
    }
    case 'queue': {
      refs.queueLibraryBrn.classList.add('current');
      refs.watchedLibraryBrn.classList.remove('current');
      updateCards(KEY_FOR_QUEUE);
      break;
    }
  }
}

function updateCards(key = KEY_TO_WATHED) {
  const films = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : '';

  if (films) {
    renderCards(films);
  }
}
