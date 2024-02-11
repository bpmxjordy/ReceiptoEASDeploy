// Profile.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ReadReceipt from './ReadReceipt';

import storage from '@react-native-firebase/storage';

const requestPermissionAndPickImage = async () => {
  // Requesting storage permission
  const result = await launchImageLibrary({
    mediaType: 'photo',
    quality: 1,
  });

  if (result.didCancel) {
    console.log('User cancelled image picker');
  } else if (result.errorCode) {
    console.log('ImagePicker Error: ', result.errorMessage);
  } else {
    const source = {uri: result.assets[0].uri};
    // Continue to upload to Firebase
    return source.uri;
  }
};

const fetchUserDetails = async (userId) => {
  try {
    const doc = await firestore.collection('users').doc(userId).get();
    if (doc.exists) {
      console.log("Document data:", doc.data());
      return doc.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};


const uploadImageToFirebase = async (imageUri) => {
  const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
  const storageRef = storage().ref(`profilePhotos/${currentUser.uid}`);
  
  // Upload the file to Firebase Storage
  const task = storageRef.putFile(uploadUri);
  
  // Observe state change events such as progress, pause, and resume
  task.on('state_changed', snapshot => {
    // You can use snapshot to show upload progress
  },
  error => {
    console.log(error);
  },
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL
    storageRef.getDownloadURL().then(downloadURL => {
      // Update user's profile in Firestore
      firestore().collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      });
    });
  });
};

// Combined function to request permission, pick image, and upload
const updateProfilePhoto = async () => {
  const imageUri = await requestPermissionAndPickImage();
  if (imageUri) {
    await uploadImageToFirebase(imageUri);
  }
};

const Profile = ({navigation}) => {
    const { currentUser } = useAuth();
    const { signOut } = useAuth();
    const [photoURL, setPhotoURL] = useState('');

    const ReceiptHistoryNav = () => {
      navigation.push("ReceiptHistory")
    }

    const ReadReceiptNav = () => {
      navigation.push("ReadReceipt")
    }

    useEffect(() => {
      // Assume you have a method to fetch user details from Firestore
      fetchUserDetails(currentUser.uid).then((userDetails) => {
        setPhotoURL(userDetails.photoURL);
      });
    }, []);

    return (
          <View style={styles.container}>
          <ReadReceipt/>

          <View>
            {photoURL ? <Image source={{uri: photoURL}} style={{width: 100, height: 100}} /> : null}
          </View>

          <Text style={{color: 'white'}}>{currentUser.email}</Text>
          <TouchableOpacity 
          style={{
            width: '50%',
            height: 'auto',
            margin: '5%',
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}
          onPress={ReceiptHistoryNav}
          >
            <Text style={{fontWeight: 'bold'}}>Receipt History</Text>
          </TouchableOpacity>

          <TouchableOpacity 
        style={{
          width: '50%',
          height: 'auto',
          margin: '5%',
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          }}
        onPress = {() => updateProfilePhoto()}
        >
          <Text style={{fontWeight: 'bold'}}>Change Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={{
          width: '50%',
          height: 'auto',
          margin: '5%',
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          }}
        onPress = {() => signOut()}
        >
          <Text style={{fontWeight: 'bold'}}>Sign Out</Text>
        </TouchableOpacity>
         
        
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      heighT: '100%',
      width: '100%',
      backgroundColor: '#080B16',
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

export default Profile;
