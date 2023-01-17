import { refs } from './refs';

function createTag({ id, name }) {
  return `
      <li  class="menu-tags__item">
        <a data-id="${id}" class="menu-tags__link" href="./">${name}</a></li>
`;
}

function renderTagsList(tags) {
  const markup = tags.map(createTag).join('');

  refs.tagsList.innerHTML = markup;
}

export { renderTagsList };
