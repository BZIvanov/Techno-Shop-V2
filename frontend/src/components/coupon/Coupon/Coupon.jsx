import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useSelector } from '../../../store/hooks';
import { TextFieldAdapter } from '../../common/forms/TextFieldAdapter';
import DatePickerFieldAdapter from '../../common/forms/DatePickerFieldAdapter/DatePickerFieldAdapter';
import { useForm } from '../../../providers/form/hooks';
import FormProvider from '../../../providers/form/FormProvider';
import { formConfig } from './form-schema';

const Coupon = () => {
  const loading = useSelector((state) => state.apiCall.loading);

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleCategorySubmit = () => {
    reset();
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Coupons</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <Box>
        <FormProvider onSubmit={handleCategorySubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='coupon' label='Coupon Name' />
          </Box>

          <Box my={1}>
            <TextFieldAdapter
              name='discount'
              label='Discount %'
              type='number'
            />
          </Box>

          <Box my={1}>
            <DatePickerFieldAdapter
              name='expirationDate'
              label='Expiration Date'
            />
          </Box>

          <Button
            variant='contained'
            type='submit'
            disabled={formState.submitting || loading}
          >
            Create
          </Button>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Coupon;
