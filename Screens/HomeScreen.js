// Profile.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReadReceipt from './ReadReceipt';







const Home = ({navigation}) => {

  const { currentUser } = useAuth();

    const [recentReceipt, setRecentReceipt] = useState('');

    const ReceiptHistoryNav = () => {
      navigation.push("ReceiptHistory")
    }

    const ScanNav = () => {
      navigation.push("ScanReceipt")
    }

    const HomeNav = () => {
      
    }

    const AnalyticsNav = () => {
      navigation.push("AnalyticsScreen")
    }

    const ProfileNav = () => {
      navigation.push("Profile")
    }

    const fetchReceipts = async (navigation) => {
      try {
        const response = await fetch(`https://real-pear-leopard-tam.cyclic.app/api/receipts?userId=${currentUser.email}`);
          const receipts = await response.json();
          const mostRecentReceipt = receipts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
          console.log(mostRecentReceipt);
          navigation.navigate('ReceiptDetailScreen', { receipt: mostRecentReceipt });
      } catch (error) {
          console.error('Error fetching receipts:', error);
      }
  };
  
    return (
      
      <View style={styles.container}>
        <ReadReceipt/>
        <View style={styles.tabContainer}>
        <TouchableOpacity 
        style={styles.HomeTab}
        onPress={() => fetchReceipts(navigation)}
        >
          <Text style={styles.Text}>Recent Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.HomeTab}
        onPress={AnalyticsNav}
        >
          <Text style={styles.Text}>Analytics</Text>
        </TouchableOpacity>

        <View style={styles.doubleTabContainer}>
          <TouchableOpacity 
          style={styles.doubleTab}
          onPress={ScanNav}
          >
            <Text style={styles.Text}>Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.doubleTab}
          onPress={ReceiptHistoryNav}
          >
            <Text style={styles.Text}>History</Text>
          </TouchableOpacity>

          
        </View>
        </View>
        
        <View style={styles.NavbarBottom}>
        <TouchableOpacity //Receipt History Button
          style={{
            width: 50,
            height: 50,
            margin: '3%',
            padding: 10,
            borderRadius: 109,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={ReceiptHistoryNav}
        >
          <Image
            source={require('../assets/images/HistoryIcon.png')}
            fadeDuration={0}
            style={{ marginLeft: 0, width: 35, height: 35, objectFit: 'contain' }}
          />
        </TouchableOpacity>
        <TouchableOpacity //Scan Button
          style={{
            width: 50,
            height: 50,
            margin: '3%',
            padding: 10,
            borderRadius: 109,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={ScanNav}
        >
          <Image
            source={require('../assets/images/CameraIcon.png')}
            fadeDuration={0}
            style={{ width: 35, height: 35, objectFit: 'contain' }}
          />
        </TouchableOpacity>
        <TouchableOpacity //Home Button
          style={{
            width: 50,
            height: 50,
            margin: '3%',
            padding: 10,
            borderRadius: 109,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={HomeNav}
        >
          <Image
            source={require('../assets/images/HomeIcon.png')}
            fadeDuration={0}
            style={{ marginBottom: 3, width: 35, height: 35, objectFit: 'contain' }}
          />
        </TouchableOpacity>
        <TouchableOpacity // Analytics Button
          style={{
            width: 50,
            height: 50,
            margin: '3%',
            padding: 10,
            borderRadius: 109,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={AnalyticsNav}
        >
          <Image
            source={require('../assets/images/AnalyticsIcon.png')}
            fadeDuration={0}
            style={{ width: 30, height: 30, objectFit: 'contain' }}
          />
        </TouchableOpacity>


        <TouchableOpacity //profile button
          style={{
            width: '10',
            height: '20px',
            margin: '3%',
            padding: 10,
            borderRadius: 1000,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={ProfileNav}
        >
          <Image
            source={require('../assets/images/ProfileIcon.png')}
            fadeDuration={0}
            style={{ width: 35, height: 35, objectFit: 'contain' }}
          />
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
      height: '70%',
      marginTop: '10%',
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
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      flex: 1,
      marginTop: '5%',
      backgroundColor: '#11182F',
      color: 'white'
    },
    doubleTabContainer: {
      width: '92%',
      height:  '30%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    doubleTab: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      flex: 1,
      marginTop: '10%',
      margin: '2%',
      backgroundColor: '#11182F',
      color: 'white'
    },
    Text: {
      
      color: 'white'
    }
  });

export default Home;
