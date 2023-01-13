import axios from 'axios';

const API_KEY = 'b1cb6bb9f0fb8b16da0ef0bac91fc5ae';
const KEY_STORAGE = 'search';
const baseUrl = 'https://api.themoviedb.org';

export default class ApiService {
  constructor() {
    this._paga = 1;
    this._search = localStorage.getItem(KEY_STORAGE);
    this.counterImages = 0;
  }

  getPopularFilms() {
    return axios
      .get(`${baseUrl}/3/trending/movie/day?api_key=${API_KEY}`)
      .then(resalt => resalt.data.results);
  }

  searchFilms() {
    return axios
      .get(
        `${baseUrl}/3/search/movie?api_key=${API_KEY}&query=${this._search}&language=en-US&page=${this._paga}`
      )
      .then(resalt => resalt.data.results);
  }

  incrementPage() {
    this._page += 1;
  }

  decementPage() {
    this._page -= 1;
  }

  set page(targetPage) {
    this._paga = targetPage;
  }

  resetPage() {
    this._page = 1;
  }
}
