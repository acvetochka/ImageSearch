import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getGallery, totalPages } from './js/api-set';
import { scroll } from './js/scroll';
import { createGalleryItem } from './js/createMarkup';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');
let query = '';
let page = 1;
const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('change', onInput);
form.addEventListener('submit', onSubmit);
btnLoad.addEventListener('click', onClick);

function onInput(evt) {
  query = evt.target.value.trim();
  return query;
}

function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  btnLoad.classList.add('btn-hidden');

  if (!evt.target.elements.searchQuery.value) {
    Notiflix.Notify.failure('Please, enter a search query');
  } else {
    // getGallery(query, page).then(addImages);
    addGallerySubmit();
  }
}

async function addGallerySubmit() {
  try {
    const response = await getGallery(query, page);
    addImages(response);
  } catch (error) {
    console.error(error);
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
    // getGallery(query, page).then(response =>
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    // );
    lightbox.refresh();
    if (totalPages > 1) {
      btnLoad.classList.remove('btn-hidden');
    }
  }
}

async function addGalleryClick() {
  try {
    const response = await getGallery(query, page);
    const images = response.data.hits;
    createGalleryItem(images);
    scroll();
    lightbox.refresh();
  } catch (error) {
    console.error(error);
  }
}

function onClick(evt) {
  page += 1;
  addGalleryClick();
  //   getGallery(query, page).then(response => {
  //     const images = response.data.hits;
  //     createGalleryItem(images);
  //     scroll();
  //     lightbox.refresh();
  //   });
  if (page > totalPages) {
    evt.target.classList.add('btn-hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

export { gallery };
