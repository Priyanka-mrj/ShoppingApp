import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 140,
    height: 35,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(2, 60, 64, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'rgba(2, 60, 64, 1)',
    fontSize: 14,
  },
});

export default CustomButton;
