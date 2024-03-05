// Profile.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReadReceipt from './ReadReceipt';
import Leaderboard from './Leaderboard';







const Analytics = ({navigation}) => {

    const { currentUser } = useAuth();

    const [recentReceipt, setRecentReceipt] = useState('');

    const [totalAmount, setTotalAmount] = useState('');
    const [totalReceipts, setTotalReceipts] = useState('');
    const [totalItems, setTotalItems] = useState('');
    const [topShop, setTopShop] = useState('');

    const TotalSpent = () => {
      navigation.push("TotalSpent")
    }

    const CategoriesScreen = () => {
      navigation.push("CategoriesScreen")
    }

    const Leaderboard = () => {
      navigation.push("Leaderboard")
    }
    
    const ShopNav = () => {
      navigation.push("ShopStat")
    }

    const fetchStats = async () => {

      const body = JSON.stringify({
        userId: currentUser.email,
      });

                const response = await fetch('https://real-pear-leopard-tam.cyclic.app/api/receipts/overallAmount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
              });

              if(response.ok)
              {
                const data = await response.json();
                setTotalAmount(data.totalAmount);
              }else{
                console.log("Error: total amount");
              }

              const response2 = await fetch('https://real-pear-leopard-tam.cyclic.app/api/receipts/overallReceipts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
              });

              if(response2.ok)
              {
                data = await response2.json();
                console.log((data).length);
                setTotalReceipts((data).length);
              }else{
                console.log("Error: total receipts");
              }

              const response3 = await fetch('https://real-pear-leopard-tam.cyclic.app/api/receipts/overallReceipts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
              });

              if(response3.ok)
              {
                data = await response3.json();
                console.log((data).length);
                let items = 0;

                for(let i = 0; i < ((data).length); i++)
                {
                  items += (data[i].items).length;
                }

                setTotalItems(items);
              }else{
                console.log("Error: total items");
              }
    };

    useEffect(() => {
      fetchStats();
  }, []);


    return (
      
      <View style={styles.container}>
        <ReadReceipt/>
        <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Totals</Text>
        <View style={styles.summaryTabContainer}>
          <View style={styles.summaryTab}>
            <Text style={styles.summaryText}>Total spent</Text>
            <Text style={styles.summaryValue}>{totalAmount}</Text>
          </View>
          
          <View style={styles.summaryTab}>
            <Text style={styles.summaryText}>Total Receipts </Text>
            <Text style={styles.summaryValue}>{totalReceipts}</Text>
          </View>

          <View style={styles.summaryTab}>
            <Text style={styles.summaryText}>Total items</Text>
            <Text style={styles.summaryValue}>{totalItems}</Text>
          </View>

        </View>
        </View>
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
              height: "auto",
              aspectRatio: '315 / 150',
              borderRadius: 10
              
              
            }}>
              <Text style={{width: '100%', fontSize: 25, color: 'white', padding: 30, fontWeight: 'bold'}}>Categories</Text>
            </Image>
          
        </TouchableOpacity>
        </View>

        <View style={styles.doubleTabContainer}>
          <TouchableOpacity 
          style={styles.doubleTab}
          onPress={Leaderboard}
          >
              <Image source={require('../assets/images/leaderboard.png')} 
              containerStyle=
              {{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width:  '60%',
                height: undefined,
                aspectRatio: '448 / 416',
                borderRadius: 0
                
                
              }}>
                
              </Image>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.doubleTab}
          onPress={ShopNav}
          >
            <Image source={require('../assets/images/shopIcon.png')} 
              containerStyle=
              {{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '70%',
                height: undefined,
                aspectRatio: '473 / 416',
                borderRadius: 10
                
                
              }}>
                <Text style={{width: '100%', height: "100", marginTop: "20%", fontSize: 25, color: 'white', fontWeight: 'bold'}}>Shops</Text>
              </Image>
          </TouchableOpacity>

          
        </View>

    </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: '#080B16',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: "center"
    },
    summary: {
      height: "18%",
      width: "90%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#11182F',
      color: 'white',
      borderRadius: 10
    },
    summaryTabContainer: {
      display: "flex",
      flex: 4,
      flexDirection: "row"
    },
    summaryTab: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      margin: "2%",
      backgroundColor: '#080B16',
      borderRadius: 10
    },
    summaryTitle: {
      width: "90%",
      flex: 1.5,
      fontSize: 20,
      textAlign: "left",
      textAlignVertical: "center",
      color: 'white'
    },
    summaryText: {
      flex: 1.5,
      fontSize: 13,
      height: "100%",
      marginTop: 10,
      textAlign: "center",
      textAlignVertical: "center",
      color: 'white'
    },
    summaryValue: {
      flex: 4,
      height: "100%",
      textAlign: "center",
      textAlignVertical: "center",
      color: 'white',
      fontSize: 22,
      fontWeight: "bold"
    },
    tabContainer: {
      width: '100%',
      height: '48%',
      marginTop: '0%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      color: 'white',
    },
    profileContainer: {
      width: '90%',
      height: '10%',
      marginTop: '20%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'relative',
      color: 'white'
    },
    ProfileTab: {
      height: '100%',
      position: "relative",
      width: '60%',
      display: 'flex',
      borderRadius: 10,
      backgroundColor: '#11182F',
      color: 'white'
    },
    HomeTab: {
      height: '100%',
      width: '90%',
      display: 'flex',
      borderRadius: 10,
      flex: 1,
      marginTop: '5%',
      backgroundColor: '#11182F',
      color: 'white'
    },
    doubleTabContainer: {
      width: '92%',
      height:  '22%',
      marginTop: '2%',
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

export default Analytics;
