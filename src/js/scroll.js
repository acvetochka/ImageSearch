import { gallery } from '../index';

function scroll() {
  if (!gallery.firstElementChild) {
    return;
  } else {
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

export { scroll };

// function populate() {
//     while (true) {
//       // нижня частина документа
//       let windowRelativeBottom =
//         document.documentElement.getBoundingClientRect().bottom;

//       // якщо користувач не прокрутив достатньо далеко (>100px до кінця)
//       if (windowRelativeBottom > document.documentElement.clientHeight + 100)
//         break;

//       // додамо більше даних
//       newPage += 1;
//       console.log(totalPages);
//       console.log(page);
//       getGallery(query).then(response => {
//         const images = response.data.hits;
//         createGalleryItem(images);
//         lightbox.refresh();
//       });
//       if (page > totalPages) {
//         evt.target.classList.add('btn-hidden');
//         Notiflix.Notify.warning(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//       // document.body.insertAdjacentHTML('beforeend', `<p>Date: ${new Date()}</p>`);
//     }
//   }

//   window.addEventListener('scroll', populate);

//   // populate(); // ініціалізація документа
