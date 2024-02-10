import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../AuthContext'; // Import your AuthContext
import DateRangeSelector from './DateRangeSelector';
import PieChart from './PieChartComponent'


const CategoryAnalyticsScreen = () => {
    const { currentUser } = useAuth(); // Access the current user from your AuthContext
    const [categoryData, setCategoryData] = useState([]);

    // Function to fetch category analytics
    const fetchCategoryAnalytics = async (range) => {

            let endDate = new Date();
            let startD = new Date();
            endDate.setDate(endDate.getDate() + 1);
            switch (range) {      
                case '1':                                                   //minusing days of the current day to get the end range 
                startD.setDate(endDate.getDate() - 1);
                    break;
                case '2':
                  startD.setDate(endDate.getDate() - 2);
                    break;                                          
                case '7':
                  startD.setDate(endDate.getDate() - 7);
                    break;
                case '14':
                  startD.setDate(endDate.getDate() - 14);
                    break;
                case '30':
                  startD.setDate(endDate.getDate() - 30);
                    break;
                case '365':
                  startD.setFullYear(endDate.getFullYear() - 1);
                    break;
                default:
                    startD.setDate(endDate.getDate() - 7);
            }

            const body = JSON.stringify({                                   //body to send the data through the post request
                startDate: startD.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                userId: 'bpmxjordy@gmail.com'
            });
            console.log(body);
        const response = await fetch('http://192.168.1.145:3000/api/statistics/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            

            const totalAmount = data.reduce((acc, item) => acc + item.totalAmount, 0);
            const dataWithPercentages = data.map(item => ({
              ...item,
              percentage: (item.totalAmount / totalAmount) * 100,
          })).sort((a, b) => b.percentage - a.percentage).slice(0, 6) // Sort and take top 6
            .map((item, index) => ({
                ...item,
                color: pieChartColors[index] // Assign color based on index
            }));
            setCategoryData(dataWithPercentages);
        } else {
            console.error('Failed to fetch category analytics');
        }
    };

    useEffect(() => {
        fetchCategoryAnalytics();
    }, []);


    const pieChartColors = ['#007bff', // Blue
                        '#dc3545', // Red
                        '#28a745', // Green
                        '#ffc107', // Yellow
                        '#17a2b8', // Cyan
                        '#6c757d']; // Grey

    const getRandomColor = () => {
      // Generate a random color in hex format (#RRGGBB)
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    const renderTableHeader = () => (
      <View style={styles.tableRow}>
          <Text style={styles.tableHeaderCell}>Category Name</Text>
          <Text style={styles.tableHeaderCell}>Percentage</Text>
          <Text style={styles.tableHeaderCell}>Amount Spent</Text>
      </View>
  );
  
  const renderTableRow = (item) => (
      <View style={styles.tableRow} key={item._id}>
          <Text style={styles.tableCell}>{item._id}</Text>
          <Text style={styles.tableCell}>{item.percentage.toFixed(2)}%</Text>
          <Text style={styles.tableCell}>${item.totalAmount.toFixed(2)}</Text>
      </View>
  );
  const Legend = ({ data }) => {
    return (
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item._id}</Text>
          </View>
        ))}
      </View>
    );
  };
  

    return (
        <ScrollView style={styles.container}>
            {/* Pie Chart for Category Analytics */}
            <Text style={styles.header}>Category Analytics</Text>
            <DateRangeSelector onSelect={fetchCategoryAnalytics} />
            <View style={styles.piechartContainer}>
                <PieChart data={categoryData} size={200} />
            </View>
            <Legend data={categoryData} />
            

            {renderTableHeader()}
            {categoryData.map(renderTableRow)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    header: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
    piechartContainer: {
        width: "100%",
        height: "auto",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pieChart: {
      width: "90%"
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      borderBottomWidth: 1,
      borderColor: '#ccc',
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
  },
  tableCell: {
      flex: 1,
      textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 10,
  },
  legendText: {
    fontSize: 14,
  },
});

export default CategoryAnalyticsScreen;
