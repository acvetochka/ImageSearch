import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getGallery, totalPages } from './js/api-set';
import { scroll } from './js/scroll';
import { createGalleryItem } from './js/createMarkup';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const gallerySection = document.querySelector(".gallery-section");
const guard = document.querySelector('.guard');
let query = '';
let page = 1;
const lightbox = new SimpleLightbox('.gallery a');
const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0,
};

const observer = new IntersectionObserver(onPagination, options);

form.addEventListener('change', onInput);
form.addEventListener('submit', onSubmit);

async function addGallerySubmit() {
  try {
    const response = await getGallery(query, page);
    addImages(response);
    if (page !== totalPages) {
      observer.observe(guard);
    }
  } catch (error) {
    console.error(error);
  }
}


async function addGalleryPag() {
  try {
    scroll();
    const response = await getGallery(query, page);
    const images = response.data.hits;
    createGalleryItem(images);
    lightbox.refresh();

    if (page > totalPages) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.error(error);
  }
}

function onInput(evt) {
  query = evt.target.value.trim();
  return query;
}

function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  gallery.innerHTML = '';

  if (!evt.target.elements.searchQuery.value) {
    Notiflix.Notify.failure('Please, enter a search query');
  } else {
    addGallerySubmit();
  }
}

function addImages(response) {
  const images = response.data.hits;

  if (!images.length) {
    gallery.innerHTML = '';
    gallerySection.classList.add('desert-gallery')
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    gallerySection.classList.remove('desert-gallery')
    createGalleryItem(images);
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    lightbox.refresh();
  }
}

function onPagination(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      page += 1;
      addGalleryPag();
      if (page === totalPages) {
        observer.unobserve(guard);
      }
    }
  });
}

export { gallery };
