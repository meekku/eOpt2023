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
const WeatherChart = () => {

    const [symbols, setSymbols] = useState([]);
    const [temps, setTemps] = useState([]);
    const [times, setTimes] = useState([]);

    const [weatherNow, setWeatherNow] = useState('');

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        showWeather();
    }, []);


    const showWeather = async () => {

        try {
            const res = await client.post("api/data/weather-data", {
                city: 'Turku'
            })

            const weatherData = res.data

            //console.log(weatherData)

            const timeArray= []
            var now = new Date().getHours();
            for (const x of Array(20).keys()){
                if (now === 24){
                    timeArray.push('00:00')
                    now = 0
                }
                else {
                    timeArray.push(now + ":00")
                }
                now = now+ 1
            }
            setTimes(timeArray)

            const symbolArray = []
            const tempArray = []
            
            for (const item in weatherData){
                //lets take temperatures
                tempArray.push(weatherData[item].temperature)

                //lets take symbols and change correct symbols so it can find them
                if (weatherData[item].nextHour.summary.symbol_code==='lightsnow'){
                    symbolArray.push('weather-snowy')
                } else if (weatherData[item].nextHour.summary.symbol_code==='partlycloudy_day'){
                    symbolArray.push('weather-partly-cloudy')
                } else if (weatherData[item].nextHour.summary.symbol_code==='clearsky_day'){
                    symbolArray.push('weather-sunny')
                } else if (weatherData[item].nextHour.summary.symbol_code==='lightrain'){
                    symbolArray.push('weather-rainy')
                } else if (weatherData[item].nextHour.summary.symbol_code==='rain'){
                    symbolArray.push('weather-rainy')
                } else if (weatherData[item].nextHour.summary.symbol_code==='heavyrain'){
                    symbolArray.push('weather-pouring')
                } else if (weatherData[item].nextHour.summary.symbol_code==='sleet'){
                    symbolArray.push('weather-snowy-rainy')
                }else if (weatherData[item].nextHour.summary.symbol_code==='clearsky_night'){
                    symbolArray.push('weather-night')
                }else if (weatherData[item].nextHour.summary.symbol_code==='fog'){
                    symbolArray.push('weather-fog')
                } else if (weatherData[item].nextHour.summary.symbol_code==='fair_day'){
                    symbolArray.push('weather-sunny')
                } else if (weatherData[item].nextHour.summary.symbol_code==='partlycloudy_night'){
                    symbolArray.push('weather-night-partly-cloudy')
                }else if (weatherData[item].nextHour.summary.symbol_code==='cloudy'){
                        symbolArray.push('cloud-outline')
                } else if (weatherData[item].nextHour.summary.symbol_code==='fair_night'){
                    symbolArray.push('weather-night')
                } else if (weatherData[item].nextHour.summary.symbol_code==='snow'){
                    symbolArray.push('weather-snowy-heavy')
                } else{
                    symbolArray.push(weatherData[item].nextHour.summary.symbol_code)
                    
                }
                
            }
        
            setTemps(tempArray)
            setSymbols(symbolArray)
            setWeatherNow(weatherData[0])
            //console.log(weatherData[0])
            setLoading(true)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <View>
       
        {loading ? 
        <View style={{ margin:20}}>
          <ScrollView horizontal={true}> 
          <View style={styles.allWeathers}>
                {symbols.map((i,item) => {
                    if(item >=0 && item <20){
                        return (
                            <View key={times[item]} style={styles.oneWeather}>
                                <Text>{times[item]}</Text>
                                <MaterialCommunityIcons name={symbols[item]} size={34} color='black' /> 
                                
                                <Text>{temps[item]}°C</Text>
                            </View>
                        )
                       
                    } 
                    
                })}

            </View>
            </ScrollView>
      </View> : <Loading />}
        
    </View>
      );
}

const styles = StyleSheet.create({
    allWeathers: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
    },
    oneWeather: {
       margin:10,
      },
  });

export default WeatherChart