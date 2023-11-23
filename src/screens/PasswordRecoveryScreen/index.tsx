import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PasswordRecoveryScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);
  const navigation = useNavigation();

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setValidEmail(true);
  };

  const handleSendPress = () => {
    const emailIsValid = validate(email);

    if (!email || !emailIsValid) {
      setValidEmail(false);
      Alert.alert("Erro", "Digite um e-mail válido");
    } else {
      setValidEmail(true);
      Alert.alert("Sucesso", "Um e-mail foi enviado para você");
      navigation.navigate("RecoverySuccess");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite seu e-mail:</Text>
      <TextInput
        style={[styles.input, !isValidEmail && styles.inputError]}
        placeholder="exemplo@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={handleEmailChange}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: "red",
  },
  sendButton: {
    backgroundColor: "lightgreen",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default PasswordRecoveryScreen;
function validate(email: string) {
  throw new Error("Function not implemented.");
}
