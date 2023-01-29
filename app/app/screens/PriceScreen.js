import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, Image } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import PriceChart from '../components/PriceChart';
import TomorrowPriceChart from '../components/TomorrowPriceChart';

const PriceScreen = () => {
  return (
    <View style={styles.container}>
            <Image
        source={require('../../assets/panels.jpg')} resizeMode="strech"  style={styles.image} 
  />
  <View style={{backgroundColor:'rgba(255, 255, 255,0.9)', padding:10, margin:10, marginTop:150 ,flex: 1, borderRadius:20,
    }}>
      <ScrollView style={styles.sideContainer} >
          <Text style={{fontSize:30, textAlign:'center'}}>Price of Electricity</Text>
              <PriceChart />
              <TomorrowPriceChart />

      </ScrollView>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b4dbfa",
    borderRadius:80,
    position:'absolute',
    height:900,
  },
  image: {
    opacity:0.3,
    height:900,
    position:'absolute',   
    
  },
  sideContainer: {
    
    //marginTop:50,
    paddingTop:20,
    
    //borderTopRightRadius:300,
    //borderTopLeftRadius:300,
  }
});

export default PriceScreen;