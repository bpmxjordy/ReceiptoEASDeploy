import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../AuthContext';

export default function ProfileScreen() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!uid) return;

    const loadProfile = async () => {
      try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || '');
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

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. JohnDoe"
        placeholderTextColor="#606C94"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.multiLine]}
        placeholder="Write something about yourself..."
        placeholderTextColor="#606C94"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="+1 555 123 4567"
        placeholderTextColor="#606C94"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. London, UK"
        placeholderTextColor="#606C94"
        value={location}
        onChangeText={setLocation}
      />

      <Text
        style={styles.saveButton}
        onPress={handleSave}
      >
        Save Changes
      </Text>
    </ScrollView>
  );
}

//----------------- STYLES -----------------//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B16',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 24,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#11182F',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  multiLine: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#fff',
    color: '#080B16',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
  },
});
