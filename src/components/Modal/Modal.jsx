import '../Modal/Modal.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
    window.addEventListener('click', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
    window.removeEventListener('click', this.closeModal);
  }

  closeModal = (event) => {
    if (event.code === 'Escape' || event.target.nodeName !== 'IMG') {
      this.props.onClose();
      this.props.reset();
    }
  }

  render() {
    return createPortal(
      <div className="overlay">
        <div className="modal">
          <img className="largeImage" src={this.props.image} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  reset: PropTypes.func,
  image: PropTypes.string,
};
