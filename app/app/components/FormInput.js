import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const FormInput = (props) => {
    const { placeholder, label, error } = props
    return <>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5,}}>
            <Text style={styles.header}>
                {label}  
            </Text>
            {error ? ( <Text style={{color: 'red', fontSize: 16 }}>
                {error}
            </Text> ) : null }
        </View>
        <TextInput 
        {...props}
        placeholder={placeholder}
        style={styles.styleTextInput} 
        />
    </>
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        marginBottom: 10,
      
    },
    styleTextInput: {
      borderWidth: 1,
      borderColor: '#1b1b33',
      height: 35,
      borderRadius: 8,
      fontSize: 16,
      paddingLeft: 10,
      marginBottom: 10,
    }
  });

export default FormInput;