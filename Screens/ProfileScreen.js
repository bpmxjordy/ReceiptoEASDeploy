import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../AuthContext';

const ProfileScreen = () => {
  const { currentUser } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const storage = getStorage();
      const imageRef = ref(storage, 'Vector.png');

      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  return (
    <View style={styles.container}>
      {imageUrl && <Image source={{
    uri: imageUrl }} style={styles.image} />}
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
image: {
width: 100,
height: 100,
borderRadius: 50,
margin: 20,
},
});

export default ProfileScreen;