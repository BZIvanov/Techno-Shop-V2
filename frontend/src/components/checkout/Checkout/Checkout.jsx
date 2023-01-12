import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from '../../../store/hooks';
import { useForm } from '../../../providers/form/hooks';
import FormProvider from '../../../providers/form/FormProvider';
import { formConfig } from './form-schema';
import TextFieldAdapter from '../../common/forms/TextFieldAdapter/TextFieldAdapter';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);

  const formMethods = useForm(formConfig);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Paper sx={{ margin: 2, padding: 1 }}>
      <Box>
        <Typography>
          Total price:{' '}
          <strong>
            ${' '}
            {Object.keys(cart)
              .map((cartProductKey) => {
                const {
                  product: { price },
                  count,
                } = cart[cartProductKey];

                return price * count;
              })
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}
          </strong>
        </Typography>
      </Box>

      <Box>
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter
              name='address'
              label='Address'
              multiline={true}
              minRows={2}
              maxRows={5}
            />
          </Box>

          <Box my={1}>
            <TextFieldAdapter name='coupon' label='Got a coupon?' />
          </Box>

          <Button variant='contained' type='submit'>
            Buy
          </Button>
        </FormProvider>
      </Box>
    </Paper>
  );
};

export default Checkout;
