import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import client from '../api/client';
import { ScrollView } from 'react-native';
import Loading from './Loading';

const PriceChart = () => {

    const [today, setToday] = useState('');
    const [cheap, setCheap] = useState('');
    const [expensive, setExpensive] = useState('');
    const [testdata, setTestData] = useState({});
    const [loading, setLoading] = useState(false);


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
    
            for (const key in prices) {
                
    
                // cheapest FOR BALLS
                if(prices[key].Rank === 1){
    
                    var nowCheap = new Date(prices[key].DateTime)
    
                    var currentCheap = String(nowCheap.getHours()).padStart(2, '0') + 
                    ':' + 
                    String(nowCheap.getMinutes()).padStart(2, '0');
    
                    setCheap(currentCheap)
                }
                // most expensive FOR BALLS
                if(prices[key].Rank === 24){
                    
                    var nowExpensive = new Date(prices[key].DateTime)
    
                    var currentExpensive = String(nowExpensive.getHours()).padStart(2, '0') + 
                    ':' + 
                    String(nowExpensive.getMinutes()).padStart(2, '0');
    
                    setExpensive(currentExpensive)
                }
                
                // same hour today FOR BOX
                if(prices[key].DateTime.includes(nowAsString)){
                    setToday(prices[key].PriceWithTax*100)

                }

            }
            const bLabels = ["00:00", "01:00", "02:00", "03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]

            const bData = [prices[0].PriceWithTax*100, prices[1].PriceWithTax*100, prices[2].PriceWithTax*100, prices[3].PriceWithTax*100, prices[4].PriceWithTax*100, prices[5].PriceWithTax*100, prices[6].PriceWithTax*100, prices[7].PriceWithTax*100, prices[8].PriceWithTax*100, prices[9].PriceWithTax*100, prices[10].PriceWithTax*100, prices[11].PriceWithTax*100, prices[12].PriceWithTax*100, prices[13].PriceWithTax*100, prices[14].PriceWithTax*100, prices[15].PriceWithTax*100, prices[16].PriceWithTax*100, prices[17].PriceWithTax*100, prices[18].PriceWithTax*100, prices[19].PriceWithTax*100, prices[20].PriceWithTax*100, prices[21].PriceWithTax*100, prices[22].PriceWithTax*100, prices[23].PriceWithTax*100]

            setTestData({labels: bLabels,
              datasets: [
                {
                  data: bData}]})
                  //console.log(testdata)
            if (testdata !== {}) {
              setLoading(true)
            }

  
            
        } catch (error){
            console.log(error)
        }
       
    }
       
  return (
    <View>
   
    {loading ? 
    <View style={{ margin:20}}>
      <View style={{ alignItems:'center', padding:10,borderWidth:1,}}>
          <Text style={{fontSize:20, padding: 5, fontStyle:'italic', fontWeight:'bold'}}>Price now: {toFixed(today)} c/kWh</Text>
          <Text style={{fontSize:15, padding: 5, fontStyle:'italic', textAlign:'center'}}>Most expensive time of today: {'\n'}{expensive}</Text>
          <Text style={{fontSize:15, padding: 5, fontStyle:'italic', textAlign:'center'}}>Most cheapest time of today: {'\n'}{cheap}</Text>
      </View>
      <Text style={{textAlign: 'center', fontSize:18, marginTop:20,}}>TODAY</Text>
      <Text style={{ fontSize:15, marginLeft:18, marginBottom:10, color: "#0a3f6b"}}>
        c/kWH
      </Text>
      <ScrollView horizontal={true}> 
     
      <LineChart
      data={testdata}
      //width={Dimensions.get("window").width} // from react-native
      width={1500}
      height={300}
      //yAxisLabel="ajshsadhasd"
      //yAxisSuffix=" c/kWh"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#ffc5a6",
        backgroundGradientFrom: "#ffc5a6",
        backgroundGradientTo: "#ffc5a6",
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(65, 137, 196, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(10, 63, 107, ${opacity})`,
        style: {
      
        },
        propsForDots: {
          r: "6",
          strokeWidth: "3",
          stroke: "#4189c4",
        
        }
      }}
      //renderDotContent={({x, y, index}) => <Text key={index} x={x} y={y} value={testdata.datasets[0].data[index]}/>}
      renderDotContent={({ x, y, index }) => <Text key={x+y} style={{ position: 'absolute', paddingTop: y-25, paddingLeft: x-20 }}> {toFixed(testdata.datasets[0].data[index])}</Text>}
      //bezier
      verticalLabelRotation={30}
      style={{

      }}
      showValuesOnTopOfBars={true}
     
     
    /> 
    
  </ScrollView> 
  </View> : <Loading />}
    
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
});

export default PriceChart;