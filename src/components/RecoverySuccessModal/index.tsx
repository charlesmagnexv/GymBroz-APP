import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

const RecoverySuccessModal: React.FC = () => {
  const navigation = useNavigation();

  const handleCloseModal = () => {
    navigation.goBack();
  };

  return (
    <Modal isVisible={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>
          E-mail de recuperação enviado com sucesso!
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "lightgreen",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default RecoverySuccessModal;
