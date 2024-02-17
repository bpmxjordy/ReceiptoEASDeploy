import React from 'react';
import { View, Dimensions, Text as NativeText } from 'react-native';
import { Svg, Polyline, Text, Line, Path, Circle } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const LineGraph = ({ data }) => {
  if (data.length < 2) {
    return <NativeText style={{ color: 'white', textAlign: 'center' }}>Not enough data for graph.</NativeText>;
  }

  const graphHeight = 200;
  const graphWidth = screenWidth - 110; // Adjusted padding
  const maxValue = Math.max(...data.map(d => d.totalAmount + 20));
  const minValue = Math.min(...data.map(d => d.totalAmount));

  // Generate Y-axis grid lines and labels
  const yAxisElements = () => {
    const numLines = 5;
    const step = graphHeight / numLines - 2;
    let elements = [];
    for (let i = 0; i <= numLines; i++) {
      const y = graphHeight - (i * step) ;
      const amount = minValue + (i * (maxValue - minValue) / numLines) + 1;
      elements.push(
        <React.Fragment key={`yGrid-${i}`}>
          <Line x1="40" y1={y} x2={graphWidth + 40} y2={y} stroke="#444" strokeWidth="0.5" />
          <Text
            x="10"
            y={y}
            fontSize="10"
            fill="white"
            textAnchor="start"
            alignmentBaseline="middle">
            {`£${amount.toFixed(0)}`}
          </Text>
        </React.Fragment>
      );
    }
    return elements;
  };

  // Generate X-axis grid lines and labels
  const xAxisLabels = () => {
    return data.map((item, index) => {
      const x = (index / (data.length - 1)) * graphWidth + 40; // Align x to match data point
      const y = graphHeight; // Position labels just below the graph
      const dateStr = new Date(item.date).toISOString().split('T')[0];
      const [year, month, day] = dateStr.split('-');
      return (
        <Text
          key={`xLabel-${index}`}
          x={x}
          y={y + 20} // Adjust y position to place labels under the graph
          fontSize="10"
          fill="white"
          textAnchor="middle">
          {`${day}-${month}`}
        </Text>
      );
    });
  };

  const dataPoints = () => {
    return data.map((item, index) => {
      
      const amounts = data.map(item => item.totalAmount); // Use totalAmount here
      const maxAmount = Math.max(...amounts);
      const minAmount = Math.min(...amounts);
      const x = ((index / (data.length - 1)) * 275) + 45; 
      const y = 200 - ((item.totalAmount - minAmount) / (maxAmount - minAmount)) * 195;
      
      console.log(`Circle ${index}: x=${x}, y=${y}`); // Debugging line
      return (
        <>
        <Circle
        key={`visible-${index}`}
        cx={x}
        cy={y}
        r="7" // Smaller radius for the visible point
        fill="#92D8FF"
      />
      {/* Larger invisible circle for easier touch */}
      <Circle
        key={`touch-${index}`}
        cx={x}
        cy={y}
        r="20" // Larger radius for the touch area
        fill="transparent"
        onPress={() => handlePointPress(item)} // Attach the onPress handler here
      />
      </>
      );
    })};

  const handlePointPress = (item) => {
    alert(`Date: ${item.date}, Amount: ${item.totalAmount}`);
  };

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * graphWidth + 25;
    const y = ((item.totalAmount - minValue) / (maxValue - minValue)) * graphHeight;
    return `${x},${graphHeight - y}`;
  }).join(' ');

  return (
    <View style={{ marginLeft: 20, marginTop: 20}}>
      <Svg height={graphHeight + 60} width={screenWidth - 20}>
        {yAxisElements()}
        {xAxisLabels()}
        <Polyline
          points={points}
          fill="none"
          stroke="#466785"
          strokeWidth="4"
          transform="translate(20, 0)"
        />
      {dataPoints()}
      </Svg>
    </View>
  );
};

export default LineGraph;
