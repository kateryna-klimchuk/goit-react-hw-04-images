import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';

const Modal = ({ lgImage, tags, closeModal }) => {
  const handleKeyDown = element => {
    if (element.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalDiv>
        <img src={lgImage} alt={tags} />
      </ModalDiv>
    </Overlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  lgImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
