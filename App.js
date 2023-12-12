import React from 'react';
import {StatusBar, StyleSheet } from 'react-native'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Image} from 'react-native-elements';
import { AuthProvider } from './AuthContext';
import Login from './Screens/LoginUserScreen';
import Register from './Screens/RegisterUserScreen';
import Profile from './Screens/ProfileScreen'
import ReceiptHistory from './Screens/ReceiptHistoryScreen'
import ReceiptDetailScreen from './Screens/ReceiptDetailScreen'
import ReadReceipt from './Screens/ReadReceipt'
import Home from './Screens/HomeScreen'
import AnalyticsScreen from './Screens/AnalyticsScreen';
import TotalSpent from './Screens/TotalSpent'
import CategoriesScreen from './Screens/Categories';
import Comparison from './Screens/Comparison';
import BottomNavBar from './Screens/BottomNavBar';
import ScanReceipt from './Screens/ScanReceipt';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <AuthProvider>
      
      <StatusBar hidden={true} />
        <NavigationContainer>
          <Stack.Navigator 
          initialRouteName="Login" 
          screenOptions={{
          }}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="ReceiptHistory" component={ReceiptHistory} options={{unmountOnBlur: true}}/>
            <Stack.Screen name="ReceiptDetailScreen" component={ReceiptDetailScreen} />
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="ReadReceipt" component={ReadReceipt}/>
            <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen}/>
            <Stack.Screen name="BottomNavBar" component={BottomNavBar}/>
            <Stack.Screen name="TotalSpent" component={TotalSpent}/>
            <Stack.Screen name="CategoriesScreen" component={CategoriesScreen}/>
            <Stack.Screen name="Comparison" component={Comparison}/>
            <Stack.Screen name="ScanReceipt" component={ScanReceipt}/>
            <Stack.Screen name="Home" component={Home} options={{
            gestureEnabled: false,
            headerShown: true,
            headerLeft: () => <></>,}}>
           </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
