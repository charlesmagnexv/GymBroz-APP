import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Routes from "./src/routes";
import { AuthProvider } from "./src/context/auth";
import { NativeBaseProvider } from "native-base";
import { FeedbackProvider } from "./src/context/useFeedback";
import PasswordRecoveryScreen from "./src/screens/PasswordRecoveryScreen";
import RecoverySuccessModal from "./src/components/RecoverySuccessModal";

export default function App() {
  return (
    <NativeBaseProvider>
      <FeedbackProvider>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
            <PasswordRecoveryScreen />
            <RecoverySuccessModal />
          </AuthProvider>
        </NavigationContainer>
      </FeedbackProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
