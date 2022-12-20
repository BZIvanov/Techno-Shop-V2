import Carousel from '../Carousel/Carousel';
import productImage from '../../../../assets/images/product.png';

const ImagesCarousel = ({ images = [] }) => {
  return (
    <Carousel>
      {images.length > 0 ? (
        images.map(({ publicId, imageUrl }) => (
          <img src={imageUrl} key={publicId} alt='product-preview' />
        ))
      ) : (
        <img src={productImage} alt='product-preview' />
      )}
    </Carousel>
  );
};

export default ImagesCarousel;
