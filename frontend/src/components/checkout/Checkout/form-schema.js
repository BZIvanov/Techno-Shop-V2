import * as yup from 'yup';

const schema = yup
  .object({
    address: yup.string().max(200).required(),
    coupon: yup.string().min(2).max(20),
  })
  .required();

const defaultValues = {
  address: '',
  coupon: '',
};

export const formConfig = { schema, defaultValues };
