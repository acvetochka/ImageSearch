import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getGallery, page, totalPages } from './api-set';
import { scroll } from './scroll';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let query = '';
let newPage = 1;
// const item = document.querySelector('.gallery-item');
const btnLoad = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

const messageFailure =
  'Sorry, there are no images matching your search query. Please try again.';

form.addEventListener('change', onInput);
form.addEventListener('submit', onSubmit);
btnLoad.addEventListener('click', onClick);

function onInput(evt) {
  query = evt.target.value;
  return query;
}

function onSubmit(evt) {
  evt.preventDefault();
  newPage = 1;
  gallery.innerHTML = '';
  btnLoad.classList.add('btn-hidden');

  document.removeEventListener('scroll', scroll);

  if (evt.target.elements.searchQuery.value) {
    //     Notiflix.Notify.failure(messageFailure);
    //   } else {
    getGallery(query).then(addImages);
    document.addEventListener('scroll', scroll);
  }
}

function addImages(response) {
  const images = response.data.hits;

  if (!images.length) {
    gallery.innerHTML = '';
    Notiflix.Notify.failure(messageFailure);
  } else {
    createGalleryItem(images);
    getGallery(query).then(response =>
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      )
    );
    lightbox.refresh();
    if (totalPages > 1) {
      btnLoad.classList.remove('btn-hidden');
    }
  }
}

function onClick(evt) {
  newPage += 1;
  console.log(totalPages);
  console.log(page);
  getGallery(query).then(response => {
    const images = response.data.hits;
    createGalleryItem(images);
    lightbox.refresh();
  });
  if (page > totalPages) {
    evt.target.classList.add('btn-hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
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
      } = image; //loading="lazy"
      return `<a class="gallery__item" target="_self" href="${largeImageURL}">
            <div class="img-container">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}"/>
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

export { newPage, gallery };
