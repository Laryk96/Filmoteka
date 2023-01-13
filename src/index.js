import ApiService from './js/APIservice';
import { renderCards } from './js/renderCards';
import { refs } from './js/refs';

class Pagination {
  constructor({ page, allPage }) {
    this.beforePage = page - 1;
    this.afterPage = page + 1;
    this.isActive;
    this.content = '';
    this.allPage = Math.floor(allPage / (page * 20));
  }

  setPagination() {
    if (this.page > 1) {
      this.content += ` <li class="paginate-btn decrement">
          <svg class="paginate-btn__icon">
            <use href="./images/sprite.svg#icon-arrow-left"></use>
          </svg>
        </li>`;
    }

    for (
      let pageLength = this.beforePage;
      pageLength <= this.afterPage;
      pageLength += 1
    ) {
      if (this.page === pageLength) {
        this.isActive = 'actove';
      } else {
        this.isActive = '';
      }

      this.content += ` <li class="number ${this.isActive}">${pageLength}</li>`;
    }

    if (this.page < this.allPage) {
      this.content += `   <li class="paginate-btn increment">
          <svg class="paginate-btn__icon">
            <use href="./images/sprite.svg#icon-arrow-right"></use>
          </svg>
        </li>`;
    }

    this.createGallery();
  }

  createGallery() {
    document
      .querySelector('.contents')
      .insertAdjacentHTML('afterend', '<ul  class="paginate"></ul>');
    const list = document.querySelector('.paginate');
    list.innerHTML('<li>Hello</li>');
  }
}

const getFilms = new ApiService();

const KEY_STORAGE = 'search';

getFilms.getPopularFilms().then(films => {
  renderCards(films);
});

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const inputSearch = refs.searchInput.value;

  localStorage.setItem(KEY_STORAGE, inputSearch);
  search();
  event.currentTarget.reset();
}

function search() {
  try {
    getFilms._paga = 1;
    getFilms._search = localStorage.getItem(KEY_STORAGE);

    getFilms.searchFilms().then(films => {
      refs.errorText.classList.add('hidden');
      if (films.length === 0) {
        console.log('пусто');
        refs.errorText.classList.remove('hidden');
        console.log(refs.errorText.classList);
      }
      refs.contentsList.innerHTML = '';
      renderCards(films);
      const pagination = new Pagination(getFilms.getOptions());
      pagination.setPagination(getFilms.getOptions());
    });
  } catch (error) {
    console.log(error);
  }
}

// const page = 1;
// const allPage = 20;
