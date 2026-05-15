import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
const container = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
   <li class="gallery-item">
   <a class="gallery-link" href="${largeImageURL}">
   <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
   </a>
   <div class="info">
   <p><b>Likes </b>${likes}</p>
   <p><b>Views </b>${views}</p>
   <p><b>Comments </b>${comments}</p>
   <p><b>Downloads </b>${downloads}</p>
   </div>
   </li>
  `
    )
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  container.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loaderMore.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loaderMore.classList.add('is-hidden');
}
