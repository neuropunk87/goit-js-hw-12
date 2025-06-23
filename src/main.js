import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
const perPage = 15;
let isLoading = false;

hideLoader();
hideLoadMoreButton();

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const newQuery = input.value.trim();
  if (!newQuery) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  query = newQuery;
  page = 1;
  totalHits = 0;

  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits || 0;
    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(data.hits);

    if (totalHits > perPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    // form.reset();
  }
});

loadMoreBtn.addEventListener('click', async function () {
  if (isLoading) return;

  isLoading = true;
  page += 1;

  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);

    if (!data.hits.length) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }
    createGallery(data.hits);

    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
      const { height: cardHeight } = galleryItems[0].getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const loadedImages = (page - 1) * perPage + data.hits.length;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
});
