import ApiService from './APIservice';
import { getAllTags } from './getTags';
import { refs } from './refs';
import { renderCards } from './renderCards';
import { renderTagsList } from './renderTagsMenu';

const apiService = new ApiService();

refs.sortMenu.addEventListener('click', e => {
  e.currentTarget.classList.toggle('is-open');
  refs.tagsMenu.classList.toggle('is-open');

  if (!e.currentTarget.classList.contains('is-open')) {
    return (refs.tagsList.innerHTML = '');
  }

  getAllTags().then(tags => {
    renderTagsList(tags);
  });
});

refs.tagsList.addEventListener('click', event => {
  event.preventDefault();

  const currentSortBy = Number(event.target.dataset.id);
  console.log(currentSortBy);

  apiService.getPopularSortBy(currentSortBy).then(films => {
    console.log(films.map(film => film.title));
    renderCards(films);
  });
});
