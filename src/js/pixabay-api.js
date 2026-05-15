import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const API_KEY = '55696654-5263066477aa053d936427b42';
  const res = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return res.data;
}
