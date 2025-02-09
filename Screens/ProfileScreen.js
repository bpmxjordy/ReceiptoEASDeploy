import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebaseConfig'
import { useAuth } from '../AuthContext';

export default function ProfileScreen() {
  const { currentUser } = useAuth();
  const uid = currentUser.uid;
  // State for fields
  const [username, setUsername] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!uid) return;

    // Load user profile from Firestore on component mount
    const loadProfile = async () => {
      try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || '');
          setProfilePicUrl(data.profilePicture || null);
          setBio(data.bio || '');
          setPhone(data.phone || '');
          setLocation(data.location || '');
        }
      } catch (error) {
        console.log('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [uid]);

  // Request permission & pick an image from library
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Allow camera roll permission to change your profile picture.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7
      });

      if (!result.cancelled) {
        // result.uri is local file path to the image
        uploadProfilePicture(result.uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  // Upload to Firebase Storage, update Firestore with download URL
  const uploadProfilePicture = async (imageUri) => {
    try {
      if (!uid) return;

      // Convert to blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Create storage ref
      const storageRef = ref(storage, `profilePictures/${uid}.jpg`);

      // Upload file
      await uploadBytes(storageRef, blob);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore doc
      await updateDoc(doc(db, 'users', uid), {
        profilePicture: downloadURL
      });

      // Update state
      setProfilePicUrl(downloadURL);
      Alert.alert('Success', 'Profile picture updated!');
    } catch (error) {
      console.log('Error uploading profile pic:', error);
      Alert.alert('Error', 'Could not upload image.');
    }
  };

  // Save changes (username, bio, phone, location) to Firestore
  const handleSave = async () => {
    if (!uid) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }

    try {
      const userRef = doc(db, 'users', uid);

      await setDoc(
        userRef,
        {
          username: username.trim(),
          bio: bio.trim(),
          phone: phone.trim(),
          location: location.trim(),
          // If you want to ensure profilePicture is saved even if user changes other fields:
          profilePicture: profilePicUrl || ''
        },
        { merge: true }
      );

      Alert.alert('Profile Updated', 'Your changes have been saved.');
    } catch (error) {
      console.log('Error saving profile:', error);
      Alert.alert('Error', 'Could not save profile.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* Profile Picture Section */}
      <TouchableOpacity
        style={styles.profilePicContainer}
        onPress={pickImage}
      >
        {profilePicUrl ? (
          <Image source={{ uri: profilePicUrl }} style={styles.profilePic} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload picture</Text>
        )}
      </TouchableOpacity>

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. JohnDoe"
        placeholderTextColor="#606C94"
        value={username}
        onChangeText={setUsername}
      />

      {/* Bio */}
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.multiLine]}
        placeholder="Write something about yourself..."
        placeholderTextColor="#606C94"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      {/* Phone */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="+1 555 123 4567"
        placeholderTextColor="#606C94"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Location */}
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. London, UK"
        placeholderTextColor="#606C94"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

//----------------- STYLES -----------------//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B16',
    padding: 20
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 24,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  profilePicContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 80,
    width: 120,
    height: 120,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePic: {
    width: 120,
    height: 120
  },
  uploadText: {
    color: '#fff',
    textAlign: 'center'
  },
  label: {
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#11182F',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16
  },
  multiLine: {
    height: 80,
    textAlignVertical: 'top'
  },
  saveButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16
  },
  saveButtonText: {
    color: '#080B16',
    fontWeight: 'bold',
    fontSize: 16
  }
});
