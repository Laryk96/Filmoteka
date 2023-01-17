import { refs } from './refs';
const KEY_STORAGE_THEME = 'Theme';
const toggleBtn = refs.toggleThemeBtn;
const mainBody = refs.maim;

initialTheme();

toggleBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
  if (!localStorage.getItem(KEY_STORAGE_THEME)) {
    event.currentTarget.classList.toggle('sun');
    event.currentTarget.classList.toggle('moon');

    localStorage.setItem(KEY_STORAGE_THEME, 'Dark');

    mainBody.classList.toggle('dark-theme');
  } else {
    event.currentTarget.classList.toggle('sun');
    event.currentTarget.classList.toggle('moon');
    mainBody.classList.toggle('dark-theme');
    localStorage.removeItem(KEY_STORAGE_THEME);
  }
}

function initialTheme() {
  if (localStorage.getItem(KEY_STORAGE_THEME)) {
    toggleBtn.classList.add(`moon`);
    mainBody.classList.toggle('dark-theme');
  } else {
    toggleBtn.classList.add('sun');
    localStorage.removeItem(KEY_STORAGE_THEME);
  }
}
