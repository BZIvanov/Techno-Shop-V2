import * as yup from 'yup';

const schema = yup
  .object({
    username: yup.string().required('Username is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
    confirmPassword: yup
      .string()
      .min(8)
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords should match'),
  })
  .required();

const defaultValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const formConfig = { schema, defaultValues };
