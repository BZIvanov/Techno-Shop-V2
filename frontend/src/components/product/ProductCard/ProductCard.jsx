import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Skeleton,
} from '@mui/material';
import { useSelector } from '../../../store/hooks';
import productImage from '../../../assets/images/product.png';

const ProductCard = ({
  product: { _id, title, description, images },
  children,
}) => {
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.apiCall);

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/product/${_id}`)}>
        {loading ? (
          <Skeleton
            sx={{ height: 140 }}
            animation='wave'
            variant='rectangular'
          />
        ) : (
          <CardMedia
            component='img'
            height='140'
            image={images.length > 0 ? images[0].imageUrl : productImage}
            alt='app product'
          />
        )}
        <CardContent sx={{ paddingBlock: '8px' }}>
          {loading ? (
            <Fragment>
              <Skeleton
                animation='wave'
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation='wave'
                height={10}
                width='80%'
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation='wave' height={10} />
            </Fragment>
          ) : (
            <Fragment>
              <Typography gutterBottom={true} variant='body1'>
                {title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {description.length > 80
                  ? description.substring(0, 80) + '...'
                  : description}
              </Typography>
            </Fragment>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions>
        {loading ? (
          <Fragment>
            <Skeleton
              animation='wave'
              variant='circular'
              width={40}
              height={40}
            />
            <Skeleton
              animation='wave'
              variant='circular'
              width={40}
              height={40}
            />
          </Fragment>
        ) : (
          children
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
