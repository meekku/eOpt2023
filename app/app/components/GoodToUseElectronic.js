import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import client from '../api/client';
import Loading from './Loading';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const GoodToUseElectronic = () => {

    const [today, setToday] = useState('');
    const [loading, setLoading] = useState(false);
    const [todayRank, setTodayRank] = useState('');
    // usually false^^


    useEffect(() => {
        getPriceToday();
    }, []);

    const toFixed = (number) => {
      parseInt(number)
      return number.toFixed(2)
    }

    const getPriceToday = async () => {
        try {
            const res = await client.get("api/data/price-today")
            //console.log(res.data)
            // clock time only as hours
            // this should return 'Thh' format as string
            var now = new Date().getHours();
        
            var nowAsString = 'T'
            if (now < 10) {
                nowAsString = nowAsString + '0' + now.toString();
            }
            else {
                nowAsString = nowAsString + now.toString();
            }

            const prices = res.data
            //console.log(prices)
            //console.log(nowAsString)
    
            for (const key in prices) {
                //console.log(prices[key].DateTime)
                // same hour today FOR BOX
                if(prices[key].DateTime.includes(nowAsString)){
                    setTodayRank(prices[key].Rank)
                    //console.log(todayRank)
                    setToday(prices[key].PriceWithTax*100)
                    //console.log(today)

                }

            }
            /*console.log("wtf")
            console.log(todayRank)
            //console.log(prices)
            console.log("wtf")
            if (todayRank !== '') {
              setLoading(true)
            } */
            setLoading(true)

  
            
        } catch (error){
            console.log(error)
        }
       
    }
       
  return (
    <View>
   
    {loading ? 
    <View>
        {todayRank < 6 ? 
      <View style={{ alignItems:'center', padding:10}}>
          <Text style={{fontSize:20, padding: 5, fontWeight:'bold',}}>Price now: {toFixed(today)} c/kWh</Text>
          <Text style= {{textAlign:'center', paddingBottom:12, padding:20,}}>It is good time of the day to use electricity</Text>
          <MaterialCommunityIcons name="emoticon-happy-outline" size={60} color='#b1ff8f'  />
      </View> : todayRank > 6 && todayRank < 12 ? 
        <View style={{ alignItems:'center', padding:10,}}>
            <Text style={{fontSize:20, padding: 5, fontWeight:'bold',}}>Price now: {toFixed(today)} c/kWh</Text>
            <Text style= {{textAlign:'center', paddingBottom:12, padding:20,}}>Now it's okay time to use electricity today</Text>
            <MaterialCommunityIcons name="emoticon-neutral-outline" size={60} color='#ffdd8f' />
        </View> :
        <View style={{ alignItems:'center', padding:10 }}>
            <Text style={{fontSize:20, padding: 5, fontWeight:'bold',}}>Electricity price now: {toFixed(today)} c/kWh</Text>
            <Text style= {{textAlign:'center', padding:20,}}>It is one of the most expensive times to use electricity today</Text>
            <MaterialCommunityIcons name="emoticon-sad-outline" size={60} color='#ff8f8f' />
        </View> 
      }
 
  </View> : <Loading />}
    
</View>
  );
};


export default GoodToUseElectronic;