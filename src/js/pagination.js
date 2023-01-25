import Pagination from 'tui-pagination';
import ApiService from './APIservice';
import { refs } from './refs';
import sprite from '../images/sprite.svg';
import { renderCards } from './renderCards';
import sprite from '../images/sprite.svg';

const apiService = new ApiService();

export default class Paginations {
  constructor(amount) {
    this._totalPage = amount;
    this.option = {
      totalItems: this.totalPage,
      itemsPerPage: 20,
      visiblePages: 5,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',

      template: {
        page: '<li href="#" class="tui-page-btn">{{page}}</li>',
        currentPage:
          '<li class="tui-page-btn tui-is-selected" id="current"><strong >{{page}}</strong></li>',
        moveButton:
          '<li href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</li>',
        disabledMoveButton:
          '<li class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</li>',
        moreButton:
          '<li href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</li>',
      },
    };
  }

  paginationForPopularMovie() {
    const option = this.option;

    const pagination = new Pagination('pagination', option);

    pagination.on('beforeMove', e => {
      this.updateElements();
      apiService.getPopularFilms(e.page).then(films => {
        renderCards(films);
      });
    });
  }

  paginationForSearchMovie(search) {
    const option = this.option;
    const pagination = new Pagination('pagination', option);

    pagination.on('beforeMove', e => {
      this.updateElements();
      apiService._search = search;
      apiService._paga = e.page;
      apiService.getFilms().then(films => {
        renderCards(films);
      });
    });
  }

  paginationForSortBy(id) {
    const option = this.option;
    const pagination = new Pagination('pagination', option);

    pagination.on('beforeMove', e => {
      this.updateElements();

      apiService._paga = e.page;
      apiService.getPopularSortBy(id).then(films => {
        renderCards(films);
      });
    });
  }

  updateElements() {
    const firstEl = document.querySelector('.tui-ico-first');
    const lastEl = document.querySelector('.tui-ico-last');

    firstEl.innerHTML = '1';
    lastEl.innerHTML = Math.floor(this._totalPage / 20);
  }

  get totalPage() {
    return this._totalPage;
  }

  set totalPages(newtotalPage) {
    this._totalPage = newtotalPage;
  }
}

/* <svg  class="paginate-btn__icon"><use href="${sprite}#icon-arrow-right"></use><svg></svg> */
