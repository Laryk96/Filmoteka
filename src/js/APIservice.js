import axios from 'axios';

const API_KEY = 'b1cb6bb9f0fb8b16da0ef0bac91fc5ae';
const KEY_STORAGE = 'search';
const baseUrl = 'https://api.themoviedb.org';

export default class ApiService {
  constructor() {
    this._search = localStorage.getItem(KEY_STORAGE);
    this._totalPage = 0;
    this.paga = 5;
  }

  getPopularFilms() {
    return axios
      .get(`${baseUrl}/3/trending/movie/day?api_key=${API_KEY}`)
      .then(resalt => {
        this._totalPage = resalt.data.total_pages;
        return resalt.data.results;
      });
  }

  searchFilms() {
    return axios
      .get(
        `${baseUrl}/3/search/movie?api_key=${API_KEY}&query=${this._search}&language=en-US&page=${this._paga}`
      )
      .then(resalt => {
        this._totalPage = resalt.data.total_pages;
        return resalt.data.results;
      });
  }

  getOptions() {
    return {
      currentPage: this.paga,
      totalPages: this._totalPage,
    };
  }

  get totalPage() {
    return this._totalPage;
  }
}
