import React , { useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Pressable,
    Image,
    ScrollView
} from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DeviceChart from '../components/DeviceChart';
import GoodToUseElectronic from '../components/GoodToUseElectronic';
import { useLogin } from '../context/LoginProvider';
//import axios from 'axios';
const HomeScreen = () => {

    const { setIsLoggedIn, profile } = useLogin();
    const [list,setList] = useState([]);
    const [visible,setVisible] = useState(false);

    const [deviceName,setDeviceName] = useState("");
    const [kWh,setkWh] = useState("");
    const [status,setStatus] = useState(1);
    const [hideId,setHideId] = useState(null);
    const [checked, setChecked] = useState(false);
    const [checkedkWh, setCheckedkWh] = useState(false);
    const [selected, setSelected] = useState('');
    const [defaultKWh, setDefaultKWh] = useState('1');
    const [loadingKWh, setLoadingKWh] = useState(false);
    
    const deviceData = [
        {key:'1', value:'Sähkökiuas', consumption:'6.0' },
        {key:'2', value:'Kuivauskaappi', consumption: '4.5'},
        {key:'3', value:'Kuivausrumpu', consumption: '3.0'},
        {key:'4', value:'Uuni', consumption: '2.0'},
        {key:'5', value:'Pyykinpesukone', consumption: '1.9'},
        {key:'6', value:'Astianpesukone', consumption: '1.5'},
        {key:'7', value:'Pyyhekuivain', consumption: '1.4'},
        {key:'8', value:'Silitysrauta', consumption: '1.0'},
        {key:'9', value:'Sähköliesi (1 levy)', consumption: '1.0'},
        {key:'10', value:'Pölynimuri', consumption: '1.0'},
        {key:'11', value:'Hiustenkuivain', consumption: '0.25'},
        {key:'12', value:'Mikroaaltouuni', consumption: '0.2'},
        {key:'13', value:'Liesituuletin', consumption: '0.2'},
        {key:'14', value:'Televisio', consumption: '0.15'},
        {key:'15', value:'Tietokone', consumption: '0.1'},
        {key:'16', value:'Pelikonsoli', consumption: '0.1'},
        {key:'17', value:'Kahvinkeitin', consumption: '0.1'},
        {key:'18', value:'Leivänpaahdin', consumption: '0.1'},
        {key:'19', value:'4.5W LED-lamppu', consumption: '0.0045'},
    
    ]

    async function doSelect (props) {
        setSelected(props)
        return (props)
    }

    const findDefaultKwh = async (props) => {
        await doSelect(props)
        for (const item in deviceData){
            if(deviceData[item].value == props) {
                console.log(deviceData[item].value)
                setDefaultKWh(deviceData[item].consumption)
                setLoadingKWh(true)
            }
        }
    }

    /*useEffect(()=>{
        getList()
    },[])

    const getList= () => {
        // axios({
        //     url:"",
        //     method : "GET"
        // }).then((res)=>{
        //     setList(res.data.list)
        // })
        fetch("",{
            // url:,//"",
            method : "GET"
        }).then(res=>{
            return res.json()
        }).then(res=>{
            alert(res.list.length)
        })
    }

    const handleDelete = (item) =>{
        axios({
            url:"",
            method : "DELETE",
            data : {
                device_id : item.device_id
            }
        }).then((res)=>{
            getList();
        })
    }

    const handleSave = () => {
        if(hideId == null){
            var data = {
                "name": deviceName,
                "description":description,
                "status": Number(status) || 0,
              }
            axios({
                url:"",
                method : "POST",
                data : data,
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then((res)=>{
                getList();
                setDeviceName("")
                setVisible(false)
            })
        }else{
            var data = {
                "device_id" : hideId,
                "name": deviceName,
                "status": Number(status) || 0,
              }
            axios({
                url:"",
                method : "PUT",
                data : data,
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then((res)=>{
                getList();
                setDeviceName("")
                setStatus(1)
                setVisible(false)
            })
        }
        
    }
    */

    /*const handleEdit = (item) => {
        setVisible(true)
        setHideId(item.device_id)
        setDeviceName(item.name)
        setStatus(item.status+"")
    }*/

    const handleVisibleModal = () => {
        setVisible(!visible)
        setHideId(null)
    }

    const onChangeName = (value) => {
        setDeviceName(value)
    }

    const onChangekWh = (value) => {
        setkWh(value)
    }

    const [startDate, setStartDate] = useState(new Date());

    const changeSelectedStartDate = (event, selectedDate) => {
      const currentDate = selectedDate || startDate;
      setStartDate(currentDate);
   };

   const [endDate, setEndDate] = useState(new Date());

   const changeSelectedEndDate = (event, selectedDate) => {
     const currentDate = selectedDate || endDate;
     setEndDate(currentDate);
  };
   


    return (
     <View style={styles.container}>
            <Image
        source={require('../../assets/panels.jpg')} resizeMode="strech"  style={styles.image} 
  />
        <Text style={{position:'absolute', fontSize:25,padding:100,color:'white' }}>
            Welcome {profile.username}
        </Text>
        <View style={{backgroundColor:'rgba(255, 255, 255,0.9)', padding:10, margin:10, marginTop:150 ,flex: 1, borderRadius:20,
    }}>
        <GoodToUseElectronic />
            <View style={styles.header_container}>
                <Text style={styles.txt_main}>Devices: {list.length}</Text>
                <TouchableOpacity
                    onPress={handleVisibleModal}
                    style={styles.btnNewContainer}
                >
                    <Text style={styles.textButton}>Add Device</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                visible={visible}

            >
                <View>
                <View style={styles.form}>
                    <TouchableOpacity
                        onPress={handleVisibleModal}
                    >
                        <Text style={styles.txtClose}>
                            Close
                        </Text>
                    </TouchableOpacity>

                    <TextInput
                        //value={deviceName}
                        style={styles.text_input}
                        placeholder="Device Name"
                        placeholderTextColor="#666666"
                        onChangeText={onChangeName}
                    />
                    
                    <SelectList 
                        setSelected={(val) => findDefaultKwh(val)} 
                        data={deviceData} 
                        save="value"
                        boxStyles={{marginTop:10, borderColor : "gray",}}
                        inputStyles={{color: '#666666'}}
                        placeholder="Type"
                    />  
                    <View style={styles.flexible}>
                      <Text style={{color:'#666666', paddingTop:3, paddingRight:10,}}>Use the average kWh consumption of the device?</Text>

                      {loadingKWh ? 
                      <Pressable onPress={ async () => {
                            setCheckedkWh(!checkedkWh);
                            setkWh(checkedkWh ? '' : defaultKWh + ' kWh')
                        }}>
                        <MaterialCommunityIcons 
                            name={checkedkWh ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color="#666666" />
                        </Pressable>  :  <Text style={{position:'absolute', margin:20, marginTop:63,color:'#666666',}}>Choose type first to get average kWh amount</Text> }

                    </View>
                    <TextInput
                        value={kWh}
                        style={styles.text_input}
                        keyboardType = 'numeric'
                        placeholder={kWh}
                        placeholderTextColor="#666666"
                        onChangeText={onChangekWh}
                    />
                    <View style={styles.text_input}>
                        <Text style={{color:'#666666',paddingBottom:10, }}>Set starting time</Text>
                        <DateTimePicker
                        style={{marginRight:290,}}
                        value={startDate}
                        mode='time'
                        is24Hour={true}
                        display="default"
                        onChange={changeSelectedStartDate}
                        />
                   
                        <Text style={{color:'#666666', paddingBottom:10 }}>Set ending time</Text>
                        <DateTimePicker
                        style={{marginRight:290,}}
                        value={endDate}
                        mode='time'
                        is24Hour={true}
                        display="default"
                        onChange={changeSelectedEndDate}
                        />
                   
                    </View>
                     <View style={styles.flexible}>
                      <Text style={{color:'#666666', paddingTop:3, paddingRight:10,}}>Is starting time flexible?</Text>

                        <Pressable onPress={() => {
                            setChecked(!checked);
                        }}>
                        <MaterialCommunityIcons 
                            name={checked ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color="#666666" />
                        </Pressable>
                    </View>
                    <TouchableOpacity
                        //onPress={setList([{name: 'melina', code: 10, status: 1}, {name: 'melina1', code: 101, status: 1} ])}
                        style={styles.btnContainer}
                    >
                        <Text style={styles.textButton}>
                            {hideId == null ? "Save" : "Update"}
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
            {/*<ScrollView>
                {list.map((item,index)=>{
                    return(
                        <View style={styles.item_device} key={index}>
                            <View>
                                <Text style={styles.txt_name}>{index+1}. {item.name}</Text>
                                <Text style={styles.txt_item}>{item.code}</Text>
                                <Text style={item.status === 1 ? styles.txt_enabled : styles.txt_disabled}>{item.status === 1 ? "Enabled" : "Disabled"}</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={()=>handleDelete(item)}
                                >
                                    <Text style={styles.txt_del}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>handleEdit(item)}
                                >
                                    <Text style={styles.txt_edit}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
              </ScrollView>*/}
      <ScrollView>
        <DeviceChart />
        
        </ScrollView>
        </View>
        </View>
      
    )
}

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#b4dbfa",
    borderRadius:80,
    position:'absolute'
  },
   
    form:{
        padding : 15,
        marginTop:100,
    },
   
    txtClose:{
        fontSize:18,
        fontWeight : "bold",
        marginVertical : 10,
        textAlign : "right"
    },
    image: {
        opacity:0.3,
        height:900,
        position:'absolute',   
        
      },
    text_input:{
        padding :10,
        borderWidth :1,
        borderColor : "gray",
        borderRadius : 10,
        marginTop :10,
        paddingLeft:20,
        
    },
    flexible:{
        padding :10,
        borderWidth :1,
        borderColor : "gray",
        borderRadius : 10,
        marginTop :10,
        paddingLeft:20,
        display:'flex',
        flexDirection:'row'
    },
    header_container : {
        padding : 15,
        flexDirection:"row",
        justifyContent : "space-between"
    },
    txt_main : {
        fontSize : 22,
        fontWeight : "bold"
    },
    item_device : {
        padding :15,
        borderBottomWidth: 1,
        borderBottomColor : "#e2e2e2",
        flexDirection : "row",
        justifyContent:"space-between"
    },
    txt_name : {
        fontSize : 18,
        marginTop : 5,
        fontWeight : "bold"
    },
    txt_item : {
        fontSize : 14,
        marginTop : 5
    },
    txt_enabled : {
        fontSize : 14,
        marginTop : 5,
        color:"green",
        fontWeight : "bold"
    },
    txt_disabled : {
        fontSize : 14,
        marginTop : 5,
        color:"green",
        fontWeight : "bold"
    },
    txt_del:{
        fontSize : 14,
        marginTop : 5,
        color:"red",
        fontWeight : "bold"
    },
    txt_edit:{
        fontSize : 14,
        marginTop : 5,
        color:"blue",
        fontWeight : "bold"
    },
    btnContainer : {
        display : 'flex',
        padding :15,
        backgroundColor : "#84c4fa",
        marginTop : 20,
        
    },
    btnNewContainer : {
        padding :10,
        backgroundColor : "#84c4fa",
    },
    textButton : {
        textAlign : "center",
        color : "#FFF"
    },
})