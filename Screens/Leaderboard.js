import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import {Picker} from '@react-native-picker/picker'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('mostMoneySpent');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://real-pear-leopard-tam.cyclic.app/api/leaderboard/${selectedCategory}`);
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Most Money Spent" value="mostMoneySpent" />
          <Picker.Item label="Most Receipts Collected" value="mostReceipts" />
          <Picker.Item label="Most Items" value="mostItems" />
        </Picker>
      </View>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => `${selectedCategory}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.rank}>{index + 1}</Text>
            <View style={styles.details}>
              <Text style={styles.TextUser}>{item._id}</Text>
              <Text style={styles.detailText}>Total: {item.value}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#080B16'
  },
  pickerContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    color: "white"
  },
  picker: {
    backgroundColor: 'white',
    color: "black",
    
  },
  listItem: {
    backgroundColor: '#11182F',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    color: "white"
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 20,
    color: "white"
  },
  details: {
    flex: 1,
    color: "white"
  },
  TextUser: {
    fontSize: 20,
    color: "white"
  },
  detailText: {
    fontSize: 16,
    color: "white"
  },
});

export default Leaderboard;
