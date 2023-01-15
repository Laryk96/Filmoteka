import { refs } from './refs';
const KEY_STORAGE_THEME = 'darkTheme';
const ToggleBtn = refs.toggleThemeBtn;
const mainBody = refs.maim;

function theme() {
  ToggleBtn.addEventListener('click', event => {
    if (!localStorage.getItem('KEY_STORAGE_THEME')) {
      event.currentTarget.classList.toggle('sun');
      event.currentTarget.classList.toggle('moon');

      localStorage.setItem(KEY_STORAGE_THEME, 'Dark');

      mainBody.classList.toggle('dark-theme');
    }
  });
}
theme();
