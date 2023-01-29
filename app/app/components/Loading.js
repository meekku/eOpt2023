import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" />
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});