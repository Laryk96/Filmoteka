import axios from 'axios';

const API_KEY = 'b1cb6bb9f0fb8b16da0ef0bac91fc5ae';
const BASE_URL = 'https://api.themoviedb.org';
const KEY_STORAGE_FILMS = 'Popular movies';
export default class ApiService {
  constructor() {
    this._search = ' ';
    this._totalPage = 0;
    this._paga = 1;
  }

  getPopularFilms(page = 1) {
    return axios
      .get(`${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}&page=${page}`)
      .then(resalt => {
        this._totalPage = resalt.data.total_pages;

        localStorage.setItem(
          KEY_STORAGE_FILMS,
          JSON.stringify(resalt.data.results)
        );
        return resalt.data.results;
      });
  }

  getPopularSortBy(id) {
    return axios
      .get(
        `${BASE_URL}/3/discover/movie?sort_by=popularity.desc&with_genres=${id}&api_key=${API_KEY}&page=${this._paga}`
      )
      .then(resalt => {
        this._totalPage = resalt.data.total_pages;

        localStorage.setItem(
          KEY_STORAGE_FILMS,
          JSON.stringify(resalt.data.results)
        );

        return resalt.data.results;
      });
  }

  getFilms() {
    return axios
      .get(
        `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${this._search}&language=en-US&page=${this._paga}`
      )
      .then(resalt => {
        this._totalPage = resalt.data.total_pages;

        localStorage.setItem(
          KEY_STORAGE_FILMS,
          JSON.stringify(resalt.data.results)
        );
        return resalt.data.results;
      });
  }

  getFilmsById(id) {
    const url = `${BASE_URL}/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

    return axios.get(url).then(result => result.data);
  }

  getGenres() {
    const url = `${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return axios.get(url).then(result => result.data.genres);
  }

  getOptionsPage() {
    return {
      currentPage: this.paga,
      totalPages: this._totalPage,
    };
  }

  get totalPage() {
    return this._totalPage;
  }

  set totalPage(newTotalPage) {
    this._totalPage = newTotalPage;
  }
  '';

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._paga = newPage;
  }
}

// async getPopularFilms() {
//   return await axios
//     .get(`${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}`)
//     .then(resalt => {
//       this._totalPage = resalt.data.total_pages;

//       const films = resalt.data.results;

//       const updateFilms = films.map(film => {
//         const url = `${BASE_URL}/3/movie/${film.id}?api_key=${API_KEY}&language=en-US`;
//         const tags = [];
//         axios.get(url).then(result => {
//           tags.push(...result.data.genres);
//         });
//         return {
//           ...film,
//           tags,
//         };
//       });
//       // console.log(updateFilms);
//       return updateFilms;
//     });
// }
