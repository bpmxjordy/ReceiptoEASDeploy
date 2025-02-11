// CameraScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function CameraScreen() {
  // Local state to track whether permission is granted.
  const [hasPermission, setHasPermission] = useState(false);

  // Retrieve the available camera devices; select the back camera.
  const devices = useCameraDevices();
  const device = devices.back;

  // Request camera permissions when the component mounts.
  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      // The permission returns a string, for example "authorized" when granted.
      setHasPermission(permission === 'authorized');
    })();
  }, []);

  // If the back camera device isn’t available yet, show a loading message.
  if (device == null) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Loading camera...</Text>
      </View>
    );
  }

  // If permission is not granted, show an error message.
  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No camera permission.</Text>
      </View>
    );
  }

  // Render the Camera view using the back camera.
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true} // Keep the camera active while this view is mounted.
      />
      <TouchableOpacity style={styles.captureButton} onPress={() => { /* add capture functionality here */ }}>
        <Text style={styles.buttonText}>CAPTURE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
