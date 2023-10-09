import { View, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import MapEvents from "../../components/MapEvents";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
const Home: React.FC = () => {

  return (
    <View style={styles.container}>
      <MapEvents />
    </View>
  )
}

export default Home