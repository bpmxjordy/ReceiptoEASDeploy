import React from 'react';
import { View } from 'react-native';
import { Svg, Circle, Path, G, Text as SvgText } from 'react-native-svg';

const PieChart = ({ data, diameter = 200 }) => {
    const radius = diameter / 2;
    const viewBox = `0 0 ${diameter} ${diameter}`;
    let startAngle = 0;
  
    const polarToCartesian = (angle, radius) => {
      let rad = ((angle-90) * Math.PI) / 180.0;
      return {
        x: radius + (radius * Math.cos(rad)),
        y: radius + (radius * Math.sin(rad))
      };
    };
  
    const calculatePath = (startAngle, endAngle, radius) => {
      const start = polarToCartesian(endAngle, radius);
      const end = polarToCartesian(startAngle, radius);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      const d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", radius, radius,
        "Z"
      ].join(" ");
  
      return d;
    };
  
    return (
      <Svg width={diameter} height={diameter} viewBox={viewBox}>
        <G>
          {data.map((slice, index) => {
            const endAngle = startAngle + (slice.percentage / 100) * 360;
            const path = calculatePath(startAngle, endAngle, radius - 1); // -1 for stroke alignment
            startAngle = endAngle;
  
            return (
              <Path key={index} d={path} fill={slice.color} />
            );
          })}
        </G>
      </Svg>
    );
  };
  

export default PieChart;