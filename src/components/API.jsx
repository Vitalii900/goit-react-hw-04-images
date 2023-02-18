import axios from 'axios';

export default async function getPhotoFromServer(value, page) {
  const KEY = '32193446-673e16063f0204736e3ddb7cd';
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${value}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    );
    const arrayOfPhoto = response.data;
    return arrayOfPhoto;
  } catch (error) {
    console.error(error);
  }
}
