import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
} from '@mui/material';
import productImage from '../../../assets/images/product.png';

const ProductCard = ({ product: { title, description, images }, children }) => (
  <Card>
    <CardActionArea>
      <CardMedia
        component='img'
        height='140'
        image={images.length > 0 ? images[0].url : productImage}
        alt='app product'
      />
      <CardContent>
        <Typography gutterBottom={true} variant='h5'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description.length > 80
            ? description.substring(0, 80) + '...'
            : description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>{children}</CardActions>
  </Card>
);

export default ProductCard;