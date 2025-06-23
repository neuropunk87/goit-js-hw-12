import axios from 'axios';

const API_KEY = '45141549-5d04e9bb650dc04154699f876';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return data;
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
}
