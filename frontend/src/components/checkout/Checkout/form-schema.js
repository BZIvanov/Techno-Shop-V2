import * as yup from 'yup';

const schema = yup
  .object({
    address: yup.string().max(500).required(),
  })
  .required();

const defaultValues = {
  address: '',
};

export const formConfig = { schema, defaultValues };
