// Profile.js
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ReadReceipt from './ReadReceipt';

const CategoriesScreen = ({navigation}) => {
  
    const { currentUser } = useAuth();

    const TotalSpentNav = () => {
      navigation.push("TotalSpent")
    }

    const CategoriesNav = () => {
      navigation.push("CategoriesScreen")
    }

    const ComparisonNav = () => {
      navigation.push("Comparison")
    }

    return (
          <View style={styles.container}>
            <ReadReceipt/>
            <Text>Categories</Text>

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
          onPress={TotalSpentNav}
          >
            <Text style={{fontWeight: 'bold'}}>Amount Spent</Text>
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
          onPress={CategoriesNav}
          >
            <Text style={{fontWeight: 'bold'}}>Categories</Text>
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
          onPress={ComparisonNav}
          >
            <Text style={{fontWeight: 'bold'}}>Comparison</Text>
          </TouchableOpacity>
          <Text style={{color: 'white'}}></Text>
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
          onPress={ProfileNav}
          >
            <Text style={{fontWeight: 'bold'}}>Profile</Text>
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
        onPress={AnalyticsNav}
        >
          <Text style={{fontWeight: 'bold'}}>Read NFC</Text>
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

export default CategoriesScreen;
