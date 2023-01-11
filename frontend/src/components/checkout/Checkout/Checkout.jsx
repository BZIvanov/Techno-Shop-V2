import Box from '@mui/material/Box';
import { useForm } from '../../../providers/form/hooks';
import FormProvider from '../../../providers/form/FormProvider';
import { formConfig } from './form-schema';
import TextFieldAdapter from '../../common/forms/TextFieldAdapter/TextFieldAdapter';

const Checkout = () => {
  const formMethods = useForm(formConfig);

  const handleFormSubmit = () => {};

  return (
    <Box>
      <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
        <TextFieldAdapter
          name='address'
          label='Address'
          multiline={true}
          minRows={2}
          maxRows={5}
        />
      </FormProvider>
    </Box>
  );
};

export default Checkout;
