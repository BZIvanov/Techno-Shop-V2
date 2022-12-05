import * as yup from 'yup';

const schema = yup
  .object({ email: yup.string().email().required('Email is required') })
  .required();

const defaultValues = { email: '' };

export const formConfig = { schema, defaultValues };
