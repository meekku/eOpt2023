import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppForm from './components/AppForm';


import { useLogin } from './context/LoginProvider';
import BottomNavigator from './BottomNavigator';
import DrawerNavigator from './BottomNavigator';
import AllNavigatorStack from './BottomNavigator';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <AllNavigatorStack /> : <StackNavigator />;
};
export default MainNavigator;