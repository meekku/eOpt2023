import { Text, StyleSheet } from "react-native";

const DefaultText = (props) => {
  return <Text style={styles.baseText}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  baseText: {
    fontSize: 15,
  },
});

export default DefaultText;
