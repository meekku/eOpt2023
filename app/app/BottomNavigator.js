import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {useTheme, Avatar} from 'react-native-paper';

import { useLogin } from "./context/LoginProvider";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SolarenergyScreen from "./screens/SolarenergyScreen";
import PriceScreen from "./screens/PriceScreen";
import EditProfileScreen from "./screens/EditProfileScreen";


import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()

const ProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor:'black',
      tabBarActiveBackgroundColor: "#b4dbfa",
      tabBarLabel:() => {return null},
      tabBarStyle:{ width:394, marginLeft:10, alignItems:'center', position:'absolute', },
      //tabBarInactiveBackgroundColor:'red',
  
      headerShown:false,
      style: {
        backgroundColor: 'red',
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
      }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="home" size={34} color={tintColor} /> ) }} />
      <Tab.Screen name="SolarEnergy" component={SolarenergyScreen} options={{ title: 'Solar energy', tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="chart-line" size={34} color={tintColor} /> ) }} />
      <Tab.Screen name="Price" component={PriceScreen} options={{ title: 'Price', tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="currency-eur" size={34} color={tintColor} /> ) }} />
      <Tab.Screen name="ProfileStack" component={ProfileStackScreen} options={{ title: 'Profile', tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="account" size={34} color={tintColor} /> ) }} />
    </Tab.Navigator>
  );
}

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:'rgba(1,1,1,0)',
        },
        headerTransparent: true,
        headerTintColor: colors.text,
      }} >
      
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



/*const Drawer = createDrawerNavigator();

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
*/

/*const DrawerNavigator = () => {
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
      <Drawer.Screen component={BottomNavigator} name="BottomNavigator" options={{
      drawerItemStyle: { height: 0 }
      }} />
      <Drawer.Screen component={ProfileStackScreen} name="Profile" />
      {/*Below height set to 0 will hide BottomNavigator button from drawer nav options={{
      drawerItemStyle: { height: 0 }
      }}*//*
      
    </Drawer.Navigator>
  );
};
*/

/*const AllNavigatorStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}  />
    </Stack.Navigator>
  )
}*/

export default BottomNavigator;


