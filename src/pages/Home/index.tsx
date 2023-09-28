import { View, Text } from "native-base";
import React from "react";
import { useAuth } from "../../context/auth";
import { Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
const Home: React.FC = () => {
  
  return (
    <View style={styles.container}>
      <Text>Início</Text>
    </View>
  )
}

export default Home