import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

let lightbox = null;

// const loader = document.querySelector('.loader');
const galleryContainer = document.querySelector('.gallery');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <div>
            <p class="info-title">Likes</p>
            <span class="info-stats">${likes}</span>
          </div>
          <div>
            <p class="info-title">Views</p>
            <span class="info-stats">${views}</span>
          </div>
          <div>
            <p class="info-title">Comments</p>
            <span class="info-stats">${comments}</span>
          </div>
          <div>
            <p class="info-title">Downloads</p>
            <span class="info-stats">${downloads}</span>
          </div>
        </div>
      </li>  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  loaderWrapper.innerHTML = `<span class="loader"></span>`;
  loaderWrapper.style.display = 'block';
}

export function hideLoader() {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  loaderWrapper.innerHTML = '';
  loaderWrapper.style.display = 'none';
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.classList.remove('hidden');
    loadMoreButton.style.display = 'flex';
  }
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.classList.add('hidden');
    loadMoreButton.style.display = 'none';
  }
}
