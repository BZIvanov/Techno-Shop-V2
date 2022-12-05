import * as yup from 'yup';

const schema = yup
  .object({
    category: yup.string().min(2).required('Category name is required'),
  })
  .required();

const defaultValues = { category: '' };

export const formConfig = { schema, defaultValues };
