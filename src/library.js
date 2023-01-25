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
  const tab = e.target.dataset.btn;
  const targetEl = e.target;

  targetEl.classList.toggle('current');

  console.log(e.currentTarget);
  switch (tab) {
    case 'watched': {
      updateCards();
      break;
    }
    case 'queue': {
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
