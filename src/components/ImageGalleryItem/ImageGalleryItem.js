import PropTypes from 'prop-types';
import { Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smImage, tags, onClick, modalImage }) => {
  return (
    <li>
      <Image src={smImage} alt={tags} onClick={() => onClick(modalImage)} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
