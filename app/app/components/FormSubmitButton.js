import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const FormSubmitButton = ({title,submitting, onPress}) => {
    const backgroundColor = submitting 
    ? 'rgba(98, 181, 245, 0.4)' 
    : 'rgba(98, 181, 245, 1)'

    return (
        <TouchableOpacity onPress={submitting ? null : onPress} style={[styles.container, {backgroundColor}]}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: 'white'
    }
})

export default FormSubmitButton;