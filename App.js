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
import Leaderboard from './Screens/Leaderboard';
import ShopStat from './Screens/ShopStat';

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
            headerStyle: { backgroundColor: '#080B16'},
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="ReceiptHistory" component={ReceiptHistory} options={{unmountOnBlur: true, title: 'History'}}/>
            <Stack.Screen name="ReceiptDetailScreen" component={ReceiptDetailScreen} options={{ title: 'Receipt' }}/>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="ReadReceipt" component={ReadReceipt} options={{ title: 'Read Receipt' }}/>
            <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} options={{ title: 'Analytics' }}/>
            <Stack.Screen name="BottomNavBar" component={BottomNavBar} options={{ title: '' }}/>
            <Stack.Screen name="TotalSpent" component={TotalSpent} options={{ title: 'Spendings' }}/>
            <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ title: 'Categories' }}/>
            <Stack.Screen name="Comparison" component={Comparison} options={{ title: '' }}/>
            <Stack.Screen name="ScanReceipt" component={ScanReceipt} options={{ title: 'Scan' }}/>
            <Stack.Screen name="Leaderboard" component={Leaderboard} options={{ title: 'Leaderboard' }}/>
            <Stack.Screen name="ShopStat" component={ShopStat} options={{ title: 'Shops' }}/>
            <Stack.Screen name="Home" component={Home} options={{
            gestureEnabled: false,
            headerShown: false,
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
