// ReceiptScanner.js
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TextRecognition } from '@react-native-ml-kit/text-recognition';
import { useAuth } from '../AuthContext';

const ReceiptScanner = () => {
  const cameraRef = useRef(null);
  const [imageUri, setImageUri] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  // Capture an image using the camera
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.8, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setImageUri(data.uri);
        runOcr(data.uri);
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  };

  // Run OCR on the captured image using ML Kit
  const runOcr = async (uri) => {
    try {
      setLoading(true);
      // Use ML Kit's text recognition to process the image.
      const result = await TextRecognition.recognize(uri);
      // Combine text from all detected blocks.
      const recognizedText = result.blocks.map(block => block.text).join('\n');
      setOcrText(recognizedText);
      // Send the recognized text to your backend via the new OCR endpoint.
      sendTextToBackend(recognizedText);
    } catch (error) {
      console.error('OCR error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Send the recognized OCR text to the new backend endpoint.
  const sendTextToBackend = async (text) => {
    try {
      const response = await fetch('http://192.168.1.145:3000/api/receipts/ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can send additional data like userId if required.
        body: JSON.stringify({ text, userId: currentUser.email }),
      });
      const json = await response.json();
      console.log('Backend response:', json);
      // Optionally, update your UI or navigate based on the response.
    } catch (error) {
      console.error('Error sending OCR text to backend:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!imageUri ? (
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
        >
          <View style={styles.captureContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
              <Text style={{ fontSize: 14 }}>CAPTURE</Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      ) : (
        <View style={styles.resultContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Image source={{ uri: imageUri }} style={styles.capturedImage} />
              <Text style={styles.ocrText}>{ocrText}</Text>
            </>
          )}
          <TouchableOpacity onPress={() => { setImageUri(null); setOcrText(''); }} style={styles.retakeButton}>
            <Text>Retake</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  captureButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  resultContainer: {
    flex: 1,
    padding: 10,
  },
  capturedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  ocrText: {
    marginTop: 10,
    fontSize: 16,
  },
  retakeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
});

export default ReceiptScanner;
