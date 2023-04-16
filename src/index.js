import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getGallery, totalPages } from './js/api-set';
import { scroll } from './js/scroll';
import { createGalleryItem } from './js/createMarkup';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let query = '';
// let newPage = 1;
const btnLoad = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('change', onInput);
form.addEventListener('submit', onSubmit);
btnLoad.addEventListener('click', onClick);

function onInput(evt) {
  query = evt.target.value;
  return query;
}

function onSubmit(evt) {
  evt.preventDefault();
  //   newPage = 1;
  page = 1;
  gallery.innerHTML = '';
  btnLoad.classList.add('btn-hidden');
  document.removeEventListener('scroll', scroll);

  if (!evt.target.elements.searchQuery.value) {
    Notiflix.Notify.failure('Please, enter a search query');
  } else {
    getGallery(query, page).then(addImages);
  }
}

function addImages(response) {
  const images = response.data.hits;

  if (!images.length) {
    gallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    createGalleryItem(images);
    // window.addEventListener('scroll', scroll);
    getGallery(query, page).then(response =>
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
  //   newPage += 1;
  page += 1;
  console.log(totalPages);
  console.log(page);
  getGallery(query, page).then(response => {
    const images = response.data.hits;
    createGalleryItem(images);
    scroll();
    lightbox.refresh();
  });
  if (page > totalPages) {
    evt.target.classList.add('btn-hidden');
    console.dir(document.documentElement);
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

export { newPage, gallery };
