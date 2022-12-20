import { Carousel as AppCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// thin wrapper around the Carousel package to make it user for future refactoring
const Carousel = ({ children, ...rest }) => {
  return (
    <AppCarousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      {...rest}
    >
      {children}
    </AppCarousel>
  );
};

export default Carousel;
