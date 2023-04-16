import axios from 'axios';
import { newPage } from './index';

const per_page = 40;
let totalPages = 0;
let page = 1;

async function getGallery(query) {
  try {
    if (newPage === 1) {
      page = 1;
    } else {
      page += 1;
    }
    const API_KEY = '35367804-7020ab364021c8257af086cad';
    const params = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: per_page,
      page: page,
    });

    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    totalPages = response.data.totalHits / per_page;
    // console.log(newPage);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { getGallery, page, totalPages };
