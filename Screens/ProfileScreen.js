import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useAuth } from '../AuthContext';
import firebase from 'firebase/app';
import 'firebase/storage';

const ProfileScreen = () => {
  const { currentUser } = useAuth();
  const [newUsername, setNewUsername] = useState(currentUser?.displayName || '');
  const [profileImage, setProfileImage] = useState(currentUser?.photoURL || null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setProfileImage(image.path);
    }).catch(error => {
      console.log('Error picking image: ', error);
    });
  };

  const handleUpdate = async () => {
    // Update profile picture
    let downloadURL = profileImage;
    if (profileImage && !profileImage.startsWith('http')) {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const storageRef = firebase.storage().ref().child(`profilePictures/${currentUser.uid}`);
      const snapshot = await storageRef.put(blob);
      downloadURL = await snapshot.ref.getDownloadURL();
    }
    
    // Update username and profile picture URL in Firebase Auth
    await currentUser.updateProfile({
      displayName: newUsername,
      photoURL: downloadURL,
    }).then(() => {
      alert('Profile updated successfully!');
      // Optionally, refresh the user info in your AuthContext
    }).catch((error) => {
      console.error("Error updating profile: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Email: {currentUser?.email}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewUsername}
        value={newUsername}
        placeholder="Username"
      />
      <Image source={{ uri: profileImage }} style={styles.image} />
      <Button title="Pick an Image" onPress={pickImage} />
      <Button title="Update Profile" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
  },
});

export default ProfileScreen;
