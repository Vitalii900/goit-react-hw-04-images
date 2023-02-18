import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import '../ImageGallery/ImageGallery.css';
import PropTypes from 'prop-types';

export function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="imageGallery">
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onImageClick={onImageClick}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  onImageClick: PropTypes.func,
};
