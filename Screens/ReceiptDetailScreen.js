import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useAuth } from '../AuthContext';
import ReadReceipt from './ReadReceipt';

const ReceiptDetailScreen = ({ route }) => {
    const { receipt } = route.params;

    return (
        <View style={styles.container}>
            <ReadReceipt/>
            <Text>Receipt Details</Text>
            <Text>Date: {receipt.date}</Text>
            <Text>Total Amount: {receipt.totalAmount}</Text>
            {receipt.items.map((item, index) => (
                <View key={index}>
                    <Text>{item.name}</Text>
                    <Text>Price: {item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default ReceiptDetailScreen;