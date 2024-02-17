// CustomAlert.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlert = ({ isVisible, onDismiss, message }) => (
  <Modal isVisible={isVisible} onBackdropPress={onDismiss}>
    <View style={styles.modalContent}>
      <Text>{message}</Text>
      <Button title="Close" onPress={onDismiss} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContent: {
    height: "auto",
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default CustomAlert;