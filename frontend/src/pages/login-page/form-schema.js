import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
  })
  .required();

export default schema;
