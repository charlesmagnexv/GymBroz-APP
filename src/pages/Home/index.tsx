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

  const { user, signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }
  return (
    <View style={styles.container}>
      <Text>{user?.firstName}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  )
}

export default Home