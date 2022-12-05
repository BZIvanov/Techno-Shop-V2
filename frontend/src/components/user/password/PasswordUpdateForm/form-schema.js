import * as yup from 'yup';

const schema = yup
  .object({
    oldPassword: yup.string().min(8).required('Old Password is required'),
    newPassword: yup.string().min(8).required('New Password is required'),
    confirmNewPassword: yup
      .string()
      .min(8)
      .required('Confirm New Password is required')
      .oneOf([yup.ref('newPassword'), null], 'Passwords should match'),
  })
  .required();

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const formConfig = { schema, defaultValues };
