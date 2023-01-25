import Pagination from 'tui-pagination';
import ApiService from './APIservice';
import { refs } from './refs';
import sprite from '../images/sprite.svg';
import { renderCards } from './renderCards';
const apiService = new ApiService();
import sprite from '../images/sprite.svg';

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

  createPaginationForMovei() {
    const option = this.option;
    const totalPages = this._totalPage;

    const pagination = new Pagination('pagination', option);

    pagination.on('beforeMove', e => {
      this.updateElements();
      apiService.getPopularFilms(e.page).then(films => {
        renderCards(films);
      });

      console.log(e.page);
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
