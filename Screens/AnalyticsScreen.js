// Profile.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReadReceipt from './ReadReceipt';







const Analytics = ({navigation}) => {

    const { currentUser } = useAuth();

    const [recentReceipt, setRecentReceipt] = useState('');

    const TotalSpent = () => {
      navigation.push("TotalSpent")
    }

    const CategoriesScreen = () => {
      navigation.push("CategoriesScreen")
    }

    const Comparison = () => {
      navigation.push("Comparison")
    }

    return (
      
      <View style={styles.container}>
        <ReadReceipt/>
        <View style={styles.tabContainer}>
        <TouchableOpacity 
        style={styles.HomeTab}
        onPress={TotalSpent}
        >
          <Image source={require('../assets/images/SpentTab.png')} 
          containerStyle=
          {{ 
            display: 'flex',
            width: '100%',
            height: undefined,
            aspectRatio: '315 / 150',
            borderRadius: 10
            
            
          }}>

            <Text style={{width: '100%', fontSize: 25, padding: 50, color: 'white', fontWeight: 'bold', marginLeft: '-5%'}}>Spendings</Text>

          </Image>
          

        </TouchableOpacity>
        
        <TouchableOpacity 
        style={styles.HomeTab}
        onPress={CategoriesScreen}
        >
          
            
            <Image source={require('../assets/images/AnalyticsHomeTab.png')} 
            containerStyle=
            {{ 
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: undefined,
              aspectRatio: '315 / 150',
              borderRadius: 10
              
              
            }}>
              <Text style={{width: '100%', fontSize: 25, color: 'white', padding: 10, fontWeight: 'bold'}}>Categories</Text>
            </Image>
          
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.ComparisonTab}
        onPress={Comparison}
        >
            <Image source={require('../assets/images/ComparisonTab.png')} 
            containerStyle=
            {{ 
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: undefined,
              aspectRatio: '315 / 150',
              borderRadius: 10
              
              
            }}>
              <Text style={{width: '100%', fontSize: 25, padding: 50, color: 'white', fontWeight: 'bold'}}>Comparison</Text>
          
            </Image>
          
        </TouchableOpacity>
        </View>
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
      flexDirection: 'row',
      justifyContent: 'center'
    },
    NavbarBottom: {
      width: '100%',
      height: '10%',
      marginTop: '170%',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabContainer: {
      width: '100%',
      height: '100%',
      marginBottom: '10%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      flex: 1,
      color: 'white'
    },
    HomeTab: {
      height: '100%',
      width: '90%',
      display: 'flex',
      borderRadius: 10,
      flex: 1,
      marginTop: "5%",
      backgroundColor: '#11182F',
      color: 'white'
    },
    ComparisonTab: {
      height: '100%',
      width: '90%',
      display: 'flex',
      borderRadius: 10,
      flex: 1,
      marginTop: "5%",
      backgroundColor: '#11182F',
      color: 'white'
    },
    Text: {
      
      color: 'white'
    }
  });

export default Analytics;
