import sprite from '../images/sprite.svg';
import { refs } from './refs';

export default class Pagination {
  constructor({ currentPage, totalPages } = {}) {
    this._currentPage = currentPage;
    this._totalPages = Math.floor(totalPages / (currentPage * 20));
    this.beforePage = currentPage - 1;
    this.beforeTwoPage = currentPage - 2;
    this.afterPage = currentPage + 1;
    this.afterTwoPage = currentPage + 2;
    this.isActive;
    this.markup = '';
  }

  createPagination() {
    this.markup = '';

    // if (window.innerWidth > 320 && window.innerWidth < 768) {
    //   if (this._currentPage > 1) {
    //     this.markup += `<li  class="pagination__item  decrement"> <svg data-page="${
    //       this._currentPage - 1
    //     }" class="paginate-btn__icon"><use href="${sprite}#icon-arrow-left"></use></svg></li>`;
    //   }
    //   if (this._currentPage > 1) {
    //     this.markup += `<li data-page="${1}" class="pagination__item ">1</li>`;
    //   }

    //   if (this._currentPage > 3) {
    //     this.markup += `<li data-page="${this.beforeTwoPage}" class="pagination__item ">${this.beforeTwoPage}</li>`;
    //   }

    //   if (this._currentPage > 2) {
    //     this.markup += `<li data-page="${this.beforePage}" class="pagination__item ">${this.beforePage}</li>`;
    //   }
    //   this.markup += `<li data-page="${this._currentPage}" class="pagination__item  current"><b>${this._currentPage}</b></li>`;
    //   if (this._totalPages - 1 > this._currentPage) {
    //     this.markup += `<li data-page="${this.afterPage}" class="pagination__item  ">${this.afterPage}</li>`;
    //   }
    //   if (this._totalPages - 2 > this._currentPage) {
    //     this.markup += `<li data-page="${this.afterTwoPage}" class="pagination__item ">${this.afterTwoPage}</li>`;
    //   }

    //   if (this._totalPages > this._currentPage) {
    //     this.markup += `<li data-page="${this._totalPages}" class="pagination__item ">${this._totalPages}</li>`;
    //     this.markup += `<li  class="pagination__item  increment"> <svg data-page="${
    //       this._currentPage + 1
    //     }" class="paginate-btn__icon"><use href="${sprite}#icon-arrow-right"></use></svg><li>`;
    //   }
    // } else {
    if (this._currentPage > 1) {
      this.markup += `<li  class="pagination__item  decrement"> <svg data-page="${
        this._currentPage - 1
      }" class="paginate-btn__icon"><use href="${sprite}#icon-arrow-left"></use></svg></li>`;
    }
    if (this._currentPage > 1) {
      this.markup += `<li data-page="${1}" class="pagination__item ">1</li>`;
    }
    if (this._currentPage > 4) {
      this.markup += `<li  class="pagination__item pagination__item--dots">...</li>`;
    }
    if (this._currentPage > 3) {
      this.markup += `<li data-page="${this.beforeTwoPage}" class="pagination__item ">${this.beforeTwoPage}</li>`;
    }

    if (this._currentPage > 2) {
      this.markup += `<li data-page="${this.beforePage}" class="pagination__item ">${this.beforePage}</li>`;
    }
    this.markup += `<li data-page="${this._currentPage}" class="pagination__item current "><b>${this._currentPage}</b></li>`;
    if (this._totalPages - 1 > this._currentPage) {
      this.markup += `<li data-page="${this.afterPage}"  class="pagination__item ">${this.afterPage}</li>`;
    }
    if (this._totalPages - 2 > this._currentPage) {
      this.markup += `<li data-page="${this.afterTwoPage}" class="pagination__item ">${this.afterTwoPage}</li>`;
    }
    if (this._totalPages - 3 > this._currentPage) {
      this.markup += `<li class="pagination__item pagination__item--dots">...</li>`;
    }
    if (this._totalPages > this._currentPage) {
      this.markup += `<li data-page="${this._totalPages}" class="pagination__item pagination__item--number">${this._totalPages}</li>`;
      this.markup += `<li   class="pagination__item  increment"> <svg data-page="${
        this._currentPage + 1
      }" class="paginate-btn__icon"><use href="${sprite}#icon-arrow-right"></use></svg><li>`;
      // }
    }

    this.renderPagination();
  }
  renderPagination() {
    refs.paginationList.innerHTML = this.markup;
  }

  get totalPage() {
    return this._totalPage;
  }
  set totalPage(newTotalPage) {
    this._totalPage = newTotalPage;
  }

  get currentPage() {
    return this.__currentPage;
  }
  set currentPage(newCurrnetPage) {
    this.__currentPage = newCurrnetPage;
  }
}

// if (this.page > 1) {
//   this.markup += ` <li class="paginate-btn decrement">
//           <svg class="paginate-btn__icon">
//             <use href="./images/sprite.svg#icon-arrow-left"></use>
//           </svg>
//         </li>`;
// }

// for (
//   let pageLength = this.page;
//   pageLength <= this.afterPage;
//   pageLength += 1
// ) {
//   console.log(pageLength);
//   if (this.page === pageLength) {
//     this.isActive = 'active';
//   } else {
//     this.isActive = '';
//   }

//   this.markup += `<li class="number number--${this.isActive}">${pageLength}</li>`;
// }

// if (this.page < this._allPage) {
//   this.markup += `   <li class="paginate-btn increment">
//           <svg class="paginate-btn__icon">
//             <use href="./images/sprite.svg#icon-arrow-right"></use>
//           </svg>
//         </li>`;
// }
