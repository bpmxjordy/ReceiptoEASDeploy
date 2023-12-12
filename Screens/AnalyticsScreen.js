// Profile.js
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AnalyticsPageSelector from './AnalyticsPageSelector'
import ReadReceipt from './ReadReceipt';
  
const AnalyticsScreen = ({navigation}) => {
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

    const ChangeTab = async (range) => {
    
      switch (range) {      
          case 'Overview':                                                   //Navigating to the selected page 
              break;
          case 'Total Spent':                                                   //Navigating to the selected page 
              navigation.push("TotalSpent");
              break;
          case 'Categories':
              navigation.push("CategoriesScreen");
              break;                                          
          case 'Comparison':
              navigation.push("Comparison");
              break;
      }
    }

    return (
          <View style={styles.container}>
            <ReadReceipt/>
            <AnalyticsPageSelector onSelect={ChangeTab} />
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

export default AnalyticsScreen;
