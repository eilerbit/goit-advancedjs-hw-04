import axios from 'axios';

const API_KEY = '46478990-fb5d5efdf6e3e23306ddee690';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {  
  const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15
    };

  try {
    const response = await axios.get(BASE_URL, { params });    
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
