import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const AddReceiptScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.email;

  const [shop, setShop] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [items, setItems] = useState([
    { name: '', price: '', quantity: '1', category: '' }
  ]);

  const addItem = () => {
    setItems(prevItems => [
      ...prevItems,
      { name: '', price: '', quantity: '1', category: '' }
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    try {
      if (!userId) {
        Alert.alert('Error', 'No user ID found. Please log in again.');
        return;
      }

      if (!shop.trim()) {
        Alert.alert('Validation Error', 'Please enter a shop name.');
        return;
      }

      const numericTotal = parseFloat(totalAmount);
      if (isNaN(numericTotal) || numericTotal <= 0) {
        Alert.alert('Validation Error', 'Please enter a valid total amount.');
        return;
      }

      if (!items || items.length === 0) {
        Alert.alert('Validation Error', 'Please add at least one item.');
        return;
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.name.trim()) {
          Alert.alert('Validation Error', `Item #${i + 1} is missing a name.`);
          return;
        }
        const parsedPrice = parseFloat(item.price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
          Alert.alert('Validation Error', `Item #${i + 1}: Please enter a valid price.`);
          return;
        }
        const parsedQty = parseInt(item.quantity, 10);
        if (isNaN(parsedQty) || parsedQty <= 0) {
          Alert.alert('Validation Error', `Item #${i + 1}: Please enter a valid quantity.`);
          return;
        }
      }

      const processedItems = items.map((item) => ({
        name: item.name.trim(),
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity, 10),
        category: item.category.trim(),
      }));

      const newReceipt = {
        userId,
        shop: shop.trim(),
        totalAmount: numericTotal,
        items: processedItems,
      };

      const response = await axios.post('http://192.168.1.145:3000/api/receipts', newReceipt);

      if (response.status === 201) {
        Alert.alert('Success', 'Receipt added successfully!');
        setShop('');
        setTotalAmount('');
        setItems([{ name: '', price: '', quantity: '1', category: '' }]);
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Unexpected server response.');
      }
    } catch (error) {
      console.error('Error submitting receipt:', error);
      if (error.response) {
        console.log('Server response:', error.response.data);
      }
      Alert.alert('Error', 'Could not add receipt. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Shop</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter shop name"
        placeholderTextColor="#606C94"
        value={shop}
        onChangeText={setShop}
      />

      <Text style={styles.label}>Total Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter total amount"
        placeholderTextColor="#606C94"
        keyboardType="numeric"
        value={totalAmount}
        onChangeText={setTotalAmount}
      />

      <Text style={styles.label}>Items</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {/* Line 1: Item Name */}
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            placeholderTextColor="#606C94"
            value={item.name}
            onChangeText={text => handleItemChange(index, 'name', text)}
          />

          {/* Line 2: Price and Quantity */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.flexHalf]}
              placeholder="Price"
              placeholderTextColor="#606C94"
              keyboardType="numeric"
              value={item.price}
              onChangeText={text => handleItemChange(index, 'price', text)}
            />
            <TextInput
              style={[styles.input, styles.flexHalf]}
              placeholder="Qty"
              placeholderTextColor="#606C94"
              keyboardType="numeric"
              value={item.quantity.toString()}
              onChangeText={text => handleItemChange(index, 'quantity', text)}
            />
          </View>

          {/* Line 3: Category */}
          <TextInput
            style={styles.input}
            placeholder="Category"
            placeholderTextColor="#606C94"
            value={item.category}
            onChangeText={text => handleItemChange(index, 'category', text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
        <Text style={styles.addItemButtonText}>+ Add Another Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddReceiptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080B16',
    padding: '10%',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  subtitle: {
    marginVertical: 12,
    fontWeight: '600',
    fontSize: 18,
    color: '#fff',
  },
  input: {
    backgroundColor: '#11182F',
    borderRadius: 10,
    color: '#fff',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  /* Each item block */
  itemContainer: {
    marginBottom: 20, // extra space between items
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexHalf: {
    flex: 1,
    marginRight: 8, // gap between price & qty
  },

  /* Outlined add item button */
  addItemButton: {
    borderWidth: 2,
    borderColor: '#fff',       // White outline
    borderRadius: 10,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addItemButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  /* Submit as a nice blue button */
  submitButton: {
    backgroundColor: '#007BFF', // nice blue color
    borderRadius: 10,
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
