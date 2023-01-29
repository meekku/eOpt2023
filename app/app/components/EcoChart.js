import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar } from "victory-native";

const data = [
  {
    x: "Level 1",
    y: 25,
    fill: "red",
  },
  {
    x: "Level 2",
    y: 50,
    fill: "orange",
  },
  {
    x: "Level 3",
    y: 75,
    fill: "yellow",
  },
  {
    x: "Level 4",
    y: 100,
    fill: "green",
  },
];

const EcoChart = () => {
  return (
    <View style={styles.chart}>
      <VictoryBar
        data={data}
        barWidth={70}
        labels={({ datum }) => datum.x}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: { width: "100%", height: 300 },
});

export default EcoChart;
