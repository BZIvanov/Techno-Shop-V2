import React from 'react';
import { connect } from 'react-redux';
import schema from './schema';
import formBuilder from './formBuilder';
import { CommonForm } from '../../molecules';
import { AppWidth, FormWrapper } from '../../atoms';
import { fetchUserStartAsync } from '../../../store/actions/user';

const RegisterForm = ({ register }) => {
  const handleFormSubmit = (data) => {
    const { username, email, password } = data;
    register(username, email, password);
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

const mapDispatchToProps = (dispatch) => ({
  register: (username, email, password) =>
    dispatch(fetchUserStartAsync(username, email, password)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);
