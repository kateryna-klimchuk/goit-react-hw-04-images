import axios from 'axios';

const API_KEY = '27448491-3edcbaaac83ebd1071ff4125b';
const BASE_URL = `https://pixabay.com/api/`;

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};
