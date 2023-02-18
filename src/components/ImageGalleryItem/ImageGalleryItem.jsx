import '../ImageGalleryItem/ImageGalleryItem.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ webformatURL, largeImageURL, onImageClick }) {
  return (
    <li
      onClick={() => onImageClick(largeImageURL)}
      className="imageGalleryItem"
    >
      <img className="imageGalleryItem-image" src={webformatURL} alt="" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImageClick: PropTypes.func,
};