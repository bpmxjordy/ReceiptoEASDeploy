// Profile.js
import React, { useState } from 'react';
import { View, Modal, TextInput, Alert, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateRangeSelector from './DateRangeSelector';
import ReadReceipt from './ReadReceipt';
import LineGraph from './LineGraph'

    const TotalSpent = () => {
        const { currentUser } = useAuth();
        const [totalAmount, setTotalAmount] = useState(0);
        const [graphData, setGraphData] = useState([]);

        const fetchAmountSpent = async (range) => {
            let endDate = new Date();
            let startDate = new Date();
    
            switch (range) {      
                case '1':                                                   //minusing days of the current day to get the end range 
                    startDate.setDate(endDate.getDate() - 1);
                    break;
                case '2':
                    startDate.setDate(endDate.getDate() - 2);
                    break;                                          
                case '7':
                    startDate.setDate(endDate.getDate() - 7);
                    break;
                case '14':
                    startDate.setDate(endDate.getDate() - 14);
                    break;
                case '30':
                    startDate.setDate(endDate.getDate() - 30);
                    break;
                case '365':
                    startDate.setFullYear(endDate.getFullYear() - 1);
                    break;
                default:
                    startDate.setDate(endDate.getDate() - 7);
            }

            const body = JSON.stringify({                                   //body to send the data through the post request
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                userId: currentUser.email
            });

            try {
                const response = await fetch('http://192.168.1.145:3000/api/receipts/amountSpent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTotalAmount(data.totalAmount);
            } catch (error) {
                console.error('Error fetching amount spent:', error);
            }
        };

        const fetchDailyAmountSpent = async (range) => {
            let endDate = new Date();
            let startDate = new Date();
        
            switch (range) {      
                case '1':                                                   //minusing days of the current day to get the end range 
                    startDate.setDate(endDate.getDate() - 1);
                    break;
                case '2':
                    startDate.setDate(endDate.getDate() - 2);
                    break;                                          
                case '7':
                    startDate.setDate(endDate.getDate() - 7);
                    break;
                case '14':
                    startDate.setDate(endDate.getDate() - 14);
                    break;
                case '30':
                    startDate.setDate(endDate.getDate() - 30);
                    break;
                case '365':
                    startDate.setFullYear(endDate.getFullYear() - 1);
                    break;
                default:
                    startDate.setDate(endDate.getDate() - 7);
            }
        
            const body = JSON.stringify({
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                userId: currentUser.email
            });
        
            try {
                const response = await fetch('http://192.168.1.145:3000/api/receipts/dailyAmountSpent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: body
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGraphData(data); 
            } catch (error) {
                console.error('Error fetching daily amount spent:', error);
            }
        };

        const handleDateRangeSelect = async (range) => {
            await fetchAmountSpent(range); // Fetches and sets the total amount
            await fetchDailyAmountSpent(range); // Fetches and sets the graph data
        };

        return (
            <View style={styles.container}>
                <ReadReceipt/>
                <DateRangeSelector onSelect={handleDateRangeSelect} />
                <Text style={styles.totalAmountText}>Total Amount Spent: £{totalAmount}</Text>
                <LineGraph data={graphData}/>
            </View>
        );
    };
    
    const styles = StyleSheet.create({
        container: {
            heigh: '100%',
            width: '100%',
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#080B16'
        },
        totalAmountText: {
            marginTop: 20,
            fontSize: 20,
            color: 'white'
        },
    });

export default TotalSpent;
