import { gallery } from '../index';

function createGalleryItem(images) {
  const markup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<a class="gallery__item" target="_self" href="${largeImageURL}">
              <div class="img-container">
                  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
              </div>
              <div class="info">
                  <p class="info-item"><b>Likes</b> <br>${likes}</p>
                  <p class="info-item"><b>Views</b> <br>${views}</p>
                  <p class="info-item"><b>Comments</b> <br>${comments}</p>
                  <p class="info-item"><b>Downloads</b> <br>${downloads}</p>
              </div></a>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export { createGalleryItem };
