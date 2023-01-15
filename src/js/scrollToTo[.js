import { refs } from './refs';
import throttle from 'lodash.throttle';

class Scroll {
  constructor() {}

  scrollBy() {
    const { height: baseHeightCard } =
      refs.contentsList.getBoundingClientRect();

    return window.scrollBy({
      top: baseHeightCard * 2,
      behavior: 'smooth',
    });
  }

  useScrollToTop() {
    const start = refs.contentsList;

    return window.scrollTo({ top: start, behavior: 'smooth' });
  }

  showScroll() {
    refs.scrollToTop.classList.remove('hidden');
  }

  hideScroll() {
    refs.scrollToTop.classList.add('hidden');
  }

  handleBtnScroll() {
    const RATIO = 0.5;

    document.documentElement.scrollTop > RATIO
      ? this.showScroll()
      : this.hideScroll();
  }
}

const scroll = new Scroll();

refs.scrollToTop.addEventListener('click', () => {
  scroll.useScrollToTop();
});

document.addEventListener('scroll', () => {
  scroll.handleBtnScroll();
});
