import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useAuth } from '../AuthContext'; // Import your AuthContext
import DateRangeSelector from './DateRangeSelector';
import { PieChart } from 'react-native-chart-kit'; // Import PieChart

const CategoryAnalyticsScreen = () => {
    const { currentUser } = useAuth(); // Access the current user from your AuthContext
    const [categoryData, setCategoryData] = useState([]);
    const screenWidth = Dimensions.get('window').width;

    // Function to fetch category analytics
    const fetchCategoryAnalytics = async (range) => {

            let endDate = new Date();
            let startD = new Date();
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
                userId: currentUser.email
            });

            console.log(currentUser);
        const response = await fetch('http://192.168.1.145:3000/api/statistics/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

        if (response.ok) {
          const data = await response.json();
          const totalAmount = data.reduce((acc, item) => acc + item.totalAmount, 0);
  
          // Sort data and calculate percentages
          let processedData = data.map(item => ({
              ...item,
              percentage: (item.totalAmount / totalAmount) * 100,
          })).sort((a, b) => b.percentage - a.percentage);
  
          // Assign colors to top 5 categories
          const topCategories = processedData.slice(0, 5).map((item, index) => ({
              ...item,
              color: pieChartColors[index] // Directly use colors from your array
          }));
  
          // Combine the rest into an "Others" category
          const othersData = processedData.slice(5);
          if (othersData.length > 0) {
              const othersCombined = othersData.reduce((acc, item) => ({
                  _id: 'Others',
                  totalAmount: acc.totalAmount + item.totalAmount,
                  percentage: acc.percentage + (item.totalAmount / totalAmount) * 100,
              }), {_id: 'Others', totalAmount: 0, percentage: 0});
  
              // Assign the last color in the array to "Others"
              othersCombined.color = pieChartColors[5]; // Grey color for "Others"
  
              topCategories.push(othersCombined);
          }
  
          setCategoryData(topCategories);
      } else {
          console.error('Failed to fetch category analytics');
      }
    };

    

    useEffect(() => {
        fetchCategoryAnalytics();
    }, []);

    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
  };

      // Prepare data for the pie chart
      const pieChartData = categoryData.map(item => ({
        name: item._id,
        population: item.percentage,
        color: item.color,
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    }));

    // Function to render the legend
    const renderLegend = () => (
      <View style={styles.legendContainer}>
        {pieChartData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
                <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.name}</Text>
            </View>
          ))}
      </View>
  );

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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Category Analytics</Text>
            <DateRangeSelector onSelect={fetchCategoryAnalytics} />
            <View style={styles.piechartContainer}>
            {categoryData.length > 0 && (
                <View>
                    <PieChart
                        data={pieChartData}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            decimalPlaces: 2, 
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"0"}
                        center={[screenWidth / 4, 0]} 
                        absolute 
                        hasLegend={false} 
                    />
                    {renderLegend()}
                </View>
            )}
            </View>
            

            {renderTableHeader()}
            {categoryData.map(renderTableRow)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      heigh: '100%',
      width: '100%',
      flex: 1,
      backgroundColor: '#080B16'
    },
    header: {
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 20,
      color: "white"
    },
    piechartContainer: {
      width: "100%",
      alignContent: "center",
      color: "white"
    },
    pieChart: {
      width: "100%",
      height: "auto",
      color: "white"
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      color: "white"
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
      color: "white"
  },
  tableCell: {
      flex: 1,
      textAlign: 'center',
      color: "white"
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
    color: "white"
  },
  legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5,
      color: "white"
  },
  colorIndicator: {
      width: 20,
      height: 20,
      marginRight: 10,
      borderRadius: 10
  },
  legendText: {
      fontSize: 14,
      color: "white"
  },
});

export default CategoryAnalyticsScreen;
