import { StyleSheet, Text } from "react-native";

const Header = (props) => {
  return <Text style={styles.baseText}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  baseText: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default Header;
