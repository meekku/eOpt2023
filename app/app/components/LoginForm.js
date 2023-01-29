import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FormContainer from "./FormContainer";
import FormSubmitButton from "./FormSubmitButton";
import { useLogin } from "../context/LoginProvider";
import FormInput from "./FormInput";
import { updateError } from "../utils/methods";
import { isValidObjField } from "../utils/methods";
import client from "../api/client";

const LoginForm = () => {

    const { setIsLoggedIn, setProfile } = useLogin();

    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState('');

    const {username, password} = userInfo;

    const handleOnChangeText= (value, fieldName) => {
        setUserInfo({...userInfo, [fieldName] : value})
      }

    const isValidForm = () => {
        if(!isValidObjField(userInfo)) return updateError('Required all fields!', setError)

        if(!password.trim() || password.length < 5) return updateError('Password is too short!', setError)

        return true;
    }

    const submitForm = async () => {
        if(isValidForm()){
            console.log('logging in')
            try {
                const res = await client.post('/api/auth/sign-in', {...userInfo})

                if (res.data.message == "User logged in successfully.") {
                    setProfile({username: userInfo.username});
                    setUserInfo({ username: '', password: '' });
                    
                    setIsLoggedIn(true);
                }
                //console.log(res.data)
            } catch (error) {
                console.log(error.message)
            }

        }
    }

    return (
    <FormContainer>
        {error ? <Text style={{color: 'red', fontSize: 18, textAlign: 'center'}}>{error}</Text>: null}
        <FormInput 
        value={username}
        onChangeText={(value) => handleOnChangeText(value, 'username')}
        autoCapitalize='none'
        label='Username'
        placeholder='JohnSmith12' />

        <FormInput 
        value={password}
        onChangeText={(value) => handleOnChangeText(value, 'password')}
        autoCapitalize='none'
        label='Password'
        secureTextEntry
        placeholder='********' />

        <FormSubmitButton onPress={submitForm} title='Login' />
    </FormContainer>
    )
}


const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold'
    }
  });

export default LoginForm;