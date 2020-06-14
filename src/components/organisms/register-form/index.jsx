import React from 'react';
import schema from './schema';
import formBuilder from './formBuilder';
import { CommonForm } from '../../molecules';
import { AppWidth, FormWrapper } from '../../atoms';

const RegisterForm = () => {
  const handleFormSubmit = (data) => {
    const { username, email, password } = data;
    console.log(username, email, password);
  };

  return (
    <AppWidth>
      <FormWrapper>
        <CommonForm
          buttonText="Register"
          formBuilder={formBuilder}
          schema={schema}
          onFormSubmit={handleFormSubmit}
        />
      </FormWrapper>
    </AppWidth>
  );
};
export default RegisterForm;
