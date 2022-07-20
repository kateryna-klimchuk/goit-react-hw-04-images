import ImageGalleryItem from '../ImageGalleryItem/index';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
  return (
    <div>
      <Gallery>
        {images.length > 0
          ? images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                tags={tags}
                smImage={webformatURL}
                modalImage={largeImageURL}
                onClick={openModal}
              />
            ))
          : null}
      </Gallery>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
