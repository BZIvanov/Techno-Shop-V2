import * as yup from 'yup';

const schema = yup
  .object({
    address: yup.string().max(200).required(),
    // required only if some value is provided
    coupon: yup.string().matches(/^.{2,20}$/, {
      excludeEmptyString: true,
      message: 'Must be between 2 and 20 characters.',
    }),
  })
  .required();

const defaultValues = {
  address: '',
  coupon: '',
};

export const formConfig = { schema, defaultValues };
