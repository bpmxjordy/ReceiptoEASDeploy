import React, { useState, useEffect } from 'react';
import { ScrollView , Text, View, StyleSheet} from 'react-native';
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
    const date = dateObject.toISOString().split('T')[0];

    // Extract the time and removing milliseconds
    const time = dateObject.toISOString().split('T')[1].split('.')[0];
    return (
        <View style={styles.container}>
            <ReadReceipt/>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Receipt Details</Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}><Text>Shop: {receipt.shop}</Text></Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Day: {date}</Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Time: {time}</Text>
            <Text style={{color: 'white', fontSize: 20, marginTop: '5%', fontWeight: 'bold'}}>Total Amount: £{receipt.totalAmount}</Text>
            <Text style={{color: 'white', marginTop: '5%', fontSize: 25, fontWeight: 'bold'}}>Items</Text>
            <ScrollView style={styles.scrollView}>
            {receipt.items && receipt.items.map((item, index) => (
                <View style={styles.items} key={index}>
                    <View style={{width:  '85%', height: 'auto'}}><Text style={styles.textTitle}>{item.name}</Text><Text style={styles.textCategory}>{item.category}</Text></View>
                    <View style={{width: 'auto', height: 'auto'}}><Text style={styles.textPrice}>£{item.price} </Text></View>
                </View>
            ))}
            </ScrollView>
            
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
    scrollView: {
    
    },
    items: {
        width: '100%',
        height: 'auto',
        padding: '2.5%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textTitle: {
        width: 'auto',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
        marginLeft: '10%'
    },
    textPrice: {
        width: '100%',
        textAlign: 'right',
        color: 'white'
    },textCategory: {
        width: 'auto',
        fontStyle: 'italic',
        textAlign: 'left',
        color: '#646978',
        marginLeft: '10%'
    },
});

export default ReceiptDetailScreen;
