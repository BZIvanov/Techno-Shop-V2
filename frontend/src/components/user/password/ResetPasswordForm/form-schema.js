import * as yup from 'yup';

const schema = yup
  .object({
    newPassword: yup.string().min(8).required('Password is required'),
    confirmNewPassword: yup
      .string()
      .min(8)
      .required('Confirm Password is required')
      .oneOf([yup.ref('newPassword'), null], 'Passwords should match'),
  })
  .required();

const defaultValues = {
  newPassword: '',
  confirmNewPassword: '',
};

export const formConfig = { schema, defaultValues };
