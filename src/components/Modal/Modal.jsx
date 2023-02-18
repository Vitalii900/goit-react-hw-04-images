import '../Modal/Modal.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ reset, image, onClose }) => {
  useEffect(() => {
    const closeModal = event => {
      if (event.code === 'Escape' || event.target.nodeName !== 'IMG') {
        // console.log(event.code);
        onClose();
        reset();
      }
    };
    // console.log('mount');
    window.addEventListener('keydown', closeModal);
    window.addEventListener('click', closeModal);

    return () => {
      // console.log('unmount');
      window.removeEventListener('keydown', closeModal);
      window.removeEventListener('click', closeModal);
    };
  }, [onClose, reset]);



  return createPortal(
    <div className="overlay">
      <div className="modal">
        <img className="largeImage" src={image} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  reset: PropTypes.func,
  image: PropTypes.string,
};
