import React from 'react';
import { View,  StyleSheet, Image } from 'react-native';
import { useLogin } from '../context/LoginProvider';

import { TouchableOpacity } from 'react-native-gesture-handler';

import exampleImage from '../../assets/bulb.png'
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri

import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  Text,
} from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';



const ProfileScreen = () => {

  const { setIsLoggedIn, profile } = useLogin();

    return (
      <View style={styles.container}>
      <Image
  source={require('../../assets/panels.jpg')} resizeMode="strech"  style={styles.image} 
/>
<View style={{backgroundColor:'rgba(255, 255, 255,0.9)', padding:35, margin:10, marginTop:150 , borderRadius:20,
}}>
 
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image
            style = {{backgroundColor:'white'}}
              source={{
                uri: exampleImageUri,
              }}
              size={80} 

              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop: 15,
                  marginBottom:5,
                }]}>
                  firstname lastname
                </Title>
                <Caption style={styles.caption}>
                  {profile.username}
                </Caption>
              </View>
          </View>

          <View style={styles.row}>
          <MaterialCommunityIcons name="map-marker-radius" size={30} color='#777777' />
            <Text style={{color:'#777777',marginLeft: 20, marginTop:6, fontSize: 17,}}>city, Finland</Text>
          </View>
          <View style={styles.row}>
          <MaterialCommunityIcons name="phone" size={30} color='#777777' />
            <Text style={{color:'#777777',marginLeft: 20, marginTop:6, fontSize: 17,}}>phone? maybe not needed</Text>
          </View>
          <View style={styles.row}>
          <MaterialCommunityIcons name="email" size={30} color='#777777' />
            <Text style={{color:'#777777',marginLeft: 20, marginTop:6, fontSize: 17,}}>name@gmail.com?</Text>
          </View>
          
  

            <View style={styles.menuWrapper}>
              
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                <MaterialCommunityIcons name="account-check-outline" size={30} color="#b4dbfa" />
                  <Text style={styles.menuItemText}>Support</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                <MaterialCommunityIcons name="cog" size={30} color="#b4dbfa" />
                  <Text style={styles.menuItemText}>Settings</Text>
                </View>
              </TouchableRipple>
              
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#b4dbfa",
                padding: 20,
                margin:50,
                 }}
                onPress={() => setIsLoggedIn(false)}
                >
        <Text style={{textAlign:'center',fontWeight: '600', fontSize: 16, color:'white' }}>Log Out</Text>
      </TouchableOpacity>

        </View>
      </View>
    )

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b4dbfa",
    position:'absolute',
    height:900,
  },
  image: {
    opacity:0.3,
    height:900,
    position:'absolute',   
    
  },
  userInfoSection: {
    paddingHorizontal: 30,
    margin:20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginTop:16,
  },

  menuWrapper: {
    marginTop: 40,
    marginBottom:20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems:'center',
    paddingHorizontal: 80,
    
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default ProfileScreen;