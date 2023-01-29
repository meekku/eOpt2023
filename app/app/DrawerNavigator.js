import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {useTheme } from 'react-native-paper';

import { useLogin } from "./context/LoginProvider";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

import EditProfileScreen from "./screens/EditProfileScreen";


import { MaterialCommunityIcons } from '@expo/vector-icons';



import {createStackNavigator} from '@react-navigation/stack';


const ProfileStack = createStackNavigator();



const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#def0ff',
          shadowColor: '#def0ff', // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="pencil-outline"
                size={25}
                backgroundColor={'transparent'}
                color='black'
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: '',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};



const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { setIsLoggedIn, profile } = useLogin();
  return (
    <View style={{ flex: 1, backgroundColor: "#def0ff" }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#def0ff",
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{fontSize:18, }}>Welcome {profile.username}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: "#b4dbfa",
          padding: 20,
        }}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: "#def0ff",
        },
        headerTitle: "",
        drawerActiveBackgroundColor: "#b4dbfa",
        drawerActiveTintColor: "black",
        activeTintColor: "#e91e63",
        headerTintColor: "#4189c4",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen component={HomeScreen} name="Home" />
      <Drawer.Screen component={ProfileStackScreen} name="Profile" />
     
    </Drawer.Navigator>
  );
};



export default DrawerNavigator;


