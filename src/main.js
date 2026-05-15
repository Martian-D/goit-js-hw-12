import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let userQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  userQuery = event.target.elements['search-text'].value.trim();
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(userQuery, page);
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: '#ef4040',
        messageColor: '#fff',
        position: 'topRight',
        maxWidth: '432px',
      });
    } else {
      createGallery(data.hits);
      if (page * 15 >= data.totalHits) {
        hideLoadMoreButton();
        iziToast.error({
          message: "We're sorry, but you've reached the end of search results.",
          color: '#ef4040',
          messageColor: '#fff',
          position: 'topRight',
          maxWidth: '432px',
        });
      } else {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
    event.target.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  try {
    const data = await getImagesByQuery(userQuery, page);
    createGallery(data.hits);
    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    if (page * 15 >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        color: '#ef4040',
        messageColor: '#fff',
        position: 'topRight',
        maxWidth: '432px',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});
