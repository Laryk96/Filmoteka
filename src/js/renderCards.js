import { refs } from './refs';

function createCard(film) {
  const { overview, title, poster_path, release_date, genre_ids } = film;
  return ` <li class="contents__item">
             ${
               poster_path
                 ? `<img src="https://image.tmdb.org/t/p/w500${poster_path}"`
                 : `<img src="https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj"`
             }
             class="contents__img"
             alt="${title}"
             width="280"
             loading="lazy"
             />
              <p class="contents__text"> ${title}</p>
              <p class="contents__tag"> |${release_date.slice(0, 4)}</p>`;
}

function renderCards(apiData) {
  const markup = apiData.map(createCard).join('');

  refs.contentsList.insertAdjacentHTML('beforeend', markup);
}

export { renderCards };
