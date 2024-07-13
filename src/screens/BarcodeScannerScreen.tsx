import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

interface BarcodeScannerProps {
  onBarcodeScanned: (barcode: string) => void;
}

const BarcodeScannerScreen: React.FC<BarcodeScannerProps> = ({ onBarcodeScanned }) => {
  const handleBarcodeScan = ({ data }: { data: string }) => {
    onBarcodeScanned(data); // Pass scanned barcode data to parent component
  };

  const handleBarcodeScanError = (error: any) => {
    Alert.alert('Barcode Scan Error', error.message);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        onBarCodeRead={handleBarcodeScan}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.ean13]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default BarcodeScannerScreen;
