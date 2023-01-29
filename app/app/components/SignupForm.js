import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";

import { Formik } from "formik";
import * as Yup from 'yup';

import client from "../api/client";

const validationSchema = Yup.object({
  username: Yup.string().trim().min(3, 'Invalid username').required('Username is required'),
  password: Yup.string().trim().min(5, 'Password is too short').required('Password is required'),
  confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'Password does not match!')
})
const SignupForm = () => {

    const userInfo = {
      username: '',
      password: '',
      confirmPassword: '',
    }

    const signUp = async (values, formikActions) => {
        console.log(values.username)
        const res = await client.post('/api/auth/sign-up', {
          username: values.username,
          password: values.password
        })

        console.log(res.data);
        formikActions.resetForm();
        formikActions.setSubmitting(false);

    }

    return (
    <FormContainer>
      <Formik 
      initialValues={userInfo} 
      validationSchema={validationSchema}
      onSubmit={signUp}>
        {({
          values, 
          errors, 
          touched, 
          isSubmitting,
          handleChange, 
          handleBlur, 
          handleSubmit}) => {

          const {username, password, confirmPassword} = values

          return (
          <>
        <FormInput 
          value={username}
          error={touched.username && errors.username}
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          autoCapitalize='none'
          label='Username'
          placeholder='JohnSmith12' />

        <FormInput 
          value={password}
          error={touched.password && errors.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          autoCapitalize='none'
          secureTextEntry
          label='Password'
          placeholder='********' />

        <FormInput 
          value={confirmPassword}
          error={touched.confirmPassword && errors.confirmPassword}
          onChangeText={ handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          autoCapitalize='none'
          secureTextEntry
          label='Confirm Password'
          placeholder='********' />

          <FormSubmitButton 
          submitting={isSubmitting} 
          onPress={handleSubmit} title='Sign up' />
          </>
          )
        }}
      </Formik>

    </FormContainer>

    )
}


const styles = StyleSheet.create({
    scrollViewTextLogin: {
      fontSize: 50,
      fontWeight: 'bold',
    }
  });

export default SignupForm;