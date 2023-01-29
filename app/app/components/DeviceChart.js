import { useState, useEffect } from "react";
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import client from '../api/client';
import { ScrollView } from 'react-native';
import Loading from './Loading';

import { MaterialCommunityIcons } from '@expo/vector-icons';


const screenWidth = Dimensions.get("window").width;
const DeviceChart = () => {

    const [devices, setDevices] = useState([]);

    const [loading, setLoading] = useState(true);
    // this^^ needs to be changes to false when gettin real data


    useEffect(() => {
        showDeviceConsumption();
    }, []);


    const showDeviceConsumption = async () => {

        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <View>
       
        {loading ? 
        <View style={{ margin:20}}>
          <Text style={{textAlign:'center', fontSize:20}}>Consumption of your home devices</Text>
          <ScrollView horizontal={true}> 
          <LineChart
 
          withHorizontalLabels={true}
          withVerticalLabels={true}
        data={{
        labels: ["00:00", "01:00", "02:00", "03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
        datasets: [
                            
                    {
                                data: [10, 4, 6, 8, 50, 20, 30, 12, 10, 0, 16, 25, 22, 30, 12, 10, 0, 16, 25, 22,12 ],
                                strokeWidth: 3,
                                color: (opacity = 1) => 'rgba(10, 63, 107, 1)',
                          
                    },
                    {
                                data: [5,8,6,9,8,2, 20, 40, 10, 3, 4, 26, 30, 30, 32, 0, 4, 26, 25, 52, 10,],
                                strokeWidth: 3,
                                color: (opacity = 1) => 'rgba(65, 137, 196, 1)',
                    },
                ],
        legend: ['Actual consumption', 'Ideal consumption'],
        }}
        //width={Dimensions.get('window').width - 16}
        width={1500}
        height={300}
        chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(65, 137, 196, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(10, 63, 107, ${opacity})`,
                        style: {
                          borderRadius:16,
                        },
                        propsForDots: {
                          r: "6",
                          strokeWidth: "3",
                        }
                    }}
        style={{
                borderRadius: 16,
            }}
                />
          </ScrollView>
      </View> : <Loading />}
        
    </View>
      );
}

const styles = StyleSheet.create({

  });

export default DeviceChart