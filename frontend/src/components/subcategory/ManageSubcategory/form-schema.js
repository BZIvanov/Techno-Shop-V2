import * as yup from 'yup';

const schema = yup
  .object({
    categoryId: yup.string().required('Category is required'),
    subcategoryName: yup
      .string()
      .min(2)
      .required('Subcategory name is required'),
  })
  .required();

const defaultValues = { categoryId: '', subcategoryName: '' };

export const formConfig = { schema, defaultValues };
