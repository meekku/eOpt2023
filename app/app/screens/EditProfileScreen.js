import React, {useState} from 'react';
import {
  View,
  Image,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import {useTheme} from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import { useLogin } from '../context/LoginProvider';



const EditProfileScreen = () => {

  const [image, setImage] = useState('https://cdn.pixabay.com/photo/2017/01/11/21/16/the-light-bulb-1972925_960_720.png');
  const {colors} = useTheme();

  const { setIsLoggedIn, profile } = useLogin();
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing:true
    });
    if (!result.canceled) {
      //console.log(result)
      setImage(result.assets[0].uri);
    }
  };


  return (
    <View style={styles.container}>
      

        <View style={{flex:0.43,  padding:20, alignItems:'center', marginTop:110 , }}>
              <StatusBar hidden={true}  />
                  {image && <Image source={{uri:image}} style={{flex:1, width:'47%', borderRadius:100, }}  />}
                  <Button title="Pick your profile image" onPress={pickImage} color='black' />
              <StatusBar style="auto" />
        </View>
        
        <ScrollView style={{flex:1,  padding:20,  }}>

          <Text style={{ fontSize: 20,  textAlign:'center'}}>
            {profile.username}
          </Text>

        <View style={styles.action}>
          
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder="Address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder="Postal code"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        
        <View style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>Save</Text>
          </TouchableOpacity>
        </View>

        </ScrollView>
     
        
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  commandButton: {
    padding: 10,
    backgroundColor: "#b4dbfa",
    alignItems: 'center',
    marginTop: 10,
    width:200,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  panelButtonTitle: {
    textAlign:'center',
    fontWeight: '600', 
    fontSize: 16, 
    color:'white' 
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});