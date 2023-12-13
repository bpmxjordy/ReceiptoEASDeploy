import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useAuth } from '../AuthContext';
import ReadReceipt from './ReadReceipt';

const ReceiptDetailScreen = ({ route }) => {
    const { receipt } = route.params;


    if (!receipt) {
        return (
            <View style={styles.container}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>No receipt data available.</Text>
            </View>
        )
    }

    const dateObject = new Date(receipt.date);

    // Extract the date
    const date = dateObject.toISOString().split('T')[0]; // "2023-12-13"

    // Extract the time and removing milliseconds
    const time = dateObject.toISOString().split('T')[1].split('.')[0]; // "17:39:44"
    return (
        <View style={styles.container}>
            <ReadReceipt/>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Receipt Details</Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}><Text>Shop: {receipt.shop}</Text></Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Day: {date}</Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Time: {time}</Text>
            <Text style={{color: 'white', fontSize: 20, marginTop: '5%', fontWeight: 'bold'}}>Total Amount: £{receipt.totalAmount}</Text>
            <Text style={{color: 'white', marginTop: '5%', fontSize: 25, fontWeight: 'bold'}}>Items</Text>
            
            {receipt.items && receipt.items.map((item, index) => (
                <View style={styles.items} key={index}>
                    <View style={{width:  '60%', height: 'auto'}}><Text style={styles.textTitle}>{item.name}</Text></View>
                    <View style={{width: 'auto', height: 'auto'}}><Text style={styles.textPrice}>Price: £{item.price} </Text></View>
                </View>
            ))}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#080B16',
    },
    items: {
        width: '100%',
        height: '10%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textTitle: {
        width: 'auto',
        
        textAlign: 'left',
        color: 'white',
        marginLeft: '10%'
    },
    textPrice: {
        width: 'auto',
        textAlign: 'right',
        color: 'white',
        marginLeft: '10%'
    }
});

export default ReceiptDetailScreen;
