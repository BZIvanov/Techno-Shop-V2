import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import productImage from '../../assets/images/product.png';

const ImagesCarousel = ({ images = [] }) => {
  return (
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
      {images.length > 0 ? (
        images.map(({ publicId, url }) => (
          <img src={url} key={publicId} alt='product-preview' />
        ))
      ) : (
        <img src={productImage} alt='product-preview' />
      )}
    </Carousel>
  );
};

export default ImagesCarousel;
