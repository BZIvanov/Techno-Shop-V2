import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string().trim().required().min(3).max(30),
  email: yup.string().required().email().max(30),
  password: yup.string().trim().required().min(6).max(30),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'Both passwords should match')
    .required(),
});
