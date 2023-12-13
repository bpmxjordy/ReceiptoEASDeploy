import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import { AuthProvider, useAuth } from '../AuthContext';
import ReadReceipt from './ReadReceipt';

const ReceiptHistoryScreen = ({navigation}) => {
    const [receipts, setReceipts] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = receipts.length;

    const { currentUser } = useAuth();


    const loadReceipts = async () => {
        
        if (isLoading) return;  // Prevent new fetch if already loading
        
        setIsLoading(true);
        try {
            console.log(currentUser.email)
            //const response = await fetch(`http://192.168.1.145:3000/api/receipts?userId=${currentUser.email}&page=${page}&pageSize=${pageSize}`);
            const response = await fetch(`https://real-pear-leopard-tam.cyclic.app/api/receipts?userId=${currentUser.email}&page=${page}&pageSize=${pageSize}`);
            const newData = await response.json();
            setReceipts([...receipts, ...newData]);
            setPage(page + 1); // Increment page for next load
            
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
            

    const renderItem = ({ item }) => (
        
        <TouchableOpacity 
        style={styles.receiptBox}
        onPress={() => navigation.navigate('ReceiptDetailScreen', { receipt: item })}
        >
            <View style={styles.receiptBox}>
                <Text style={{color: 'white'}}>Owner: {item.userId}</Text>
                <Text style={{color: 'white'}}>Shop: {item.shop}</Text>
                <Text style={{color: 'white'}}>Date: {item.date.split('T')[0].split('.')[0]}</Text>
                <Text style={{color: 'white'}}>Time: {item.date.split('T')[1].split('.')[0]}</Text>
                <Text style={{color: 'white'}}>Total Amount: £{item.totalAmount}</Text>
            </View>
        </TouchableOpacity>
    );

    useEffect(() => {
        loadReceipts();
    }, []);

    return (
        <View style={{height: '100%', width: '100%', backgroundColor: '#080B16'}}>
        <ReadReceipt/>
        <FlatList
                data={receipts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}

                onEndReached={loadReceipts}
                onEndReachedThreshold={0.5} // Trigger the load more when half of the last item is visible
        />
        </View>
    );
};



const styles = StyleSheet.create({
    body: {
        backgroundColor: '#080B16'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 20,
        color:'white'
    },
    receiptBox: {
        backgroundColor: '#11182F',
        color: 'white',
        borderRadius: 10,
        margin: '5%',
        paddingBottom: '2.5%',
        marginBottom: '0%'
    }

});

export default ReceiptHistoryScreen;