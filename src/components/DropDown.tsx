import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const VegetableDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownButtonText}>
          {selectedOption || '1kg'}
        </Text>
        <Image
          source={require('../assets/dropdown.png')}
          resizeMode='cover'
          style={styles.image}
        />
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => selectOption('1kg')}>
              <Text style={styles.optionText}>1kg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => selectOption('2kg')}>
              <Text style={styles.optionText}>2kg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => selectOption('3kg')}>
              <Text style={styles.optionText}>3kg</Text>
            </TouchableOpacity>
            {/* Add more options here as needed */}
          </ScrollView>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    width: '95%',
    left: 10
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  image: {
    width: 24,
    height: 24,
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 150,
    width: '100%',
    marginTop: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  optionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default VegetableDropdown;
