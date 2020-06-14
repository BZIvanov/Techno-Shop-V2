import React from 'react';
import { TextInput, TextWarning, Button, FormGroup } from '../../atoms';
import { useForm } from 'react-hook-form';

const CommonForm = (props) => {
  const { onFormSubmit, formBuilder, schema, buttonText } = props;
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const inputs = Object.keys(formBuilder).map((input) => (
    <FormGroup key={input}>
      <TextInput
        name={input}
        ref={register}
        placeholder={formBuilder[input].label}
        type={formBuilder[input].type}
      />
      {errors[input] && <TextWarning>{errors[input].message}</TextWarning>}
    </FormGroup>
  ));

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {inputs}
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

export default CommonForm;
