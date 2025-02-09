import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthContext';
import ReadReceipt from './ReadReceipt';
import { Image } from 'react-native-elements';

const ReceiptHistoryScreen = ({ navigation }) => {
  const [receipts, setReceipts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = receipts.length;

  const { currentUser } = useAuth();

  const loadReceipts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      console.log(currentUser.email);
      const response = await fetch(
        `http://192.168.1.145:3000/api/receipts?userId=${currentUser.email}&page=${page}&pageSize=${pageSize}`
      );
      const newData = await response.json();
      setReceipts([...receipts, ...newData]);
      setPage(page + 1); // Increment page for next load
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReceipts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.receiptBox}
      onPress={() => navigation.navigate('ReceiptDetailScreen', { receipt: item })}
    >
      <View>
        <Text style={styles.whiteText}>Owner: {item.userId}</Text>
        <Text style={styles.whiteText}>Shop: {item.shop}</Text>
        <Text style={styles.whiteText}>
          Date: {item.date.split('T')[0].split('.')[0]}
        </Text>
        <Text style={styles.whiteText}>
          Time: {item.date.split('T')[1].split('.')[0]}
        </Text>
        <Text style={styles.whiteText}>Total Amount: £{item.totalAmount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ReadReceipt />

      <TouchableOpacity 
        style={styles.addAReceiptBox}
        onPress={() => navigation.navigate('AddReceipt')}
      >
        <Text style={styles.addReceiptText}>Add a receipt</Text>
        <Image
          source={require('../assets/images/PlusIcon.png')}
          style={styles.plusIcon}
        />
      </TouchableOpacity>

      <FlatList
        data={receipts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={loadReceipts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#080B16',
  },
  whiteText: {
    color: 'white',
  },
  receiptBox: {
    backgroundColor: '#11182F',
    borderRadius: 10,
    marginHorizontal: '5%',
    marginTop: '5%',
    padding: 12,
  },
  addAReceiptBox: {
    backgroundColor: '#11182F',
    borderRadius: 10,
    margin: '5%',
    marginBottom: 0,
    padding: 16,

    // Lay out horizontally
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addReceiptText: {
    color: 'white',
    fontSize: 16,
  },
  plusIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default ReceiptHistoryScreen;
