import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { QrCode, X, Play } from 'lucide-react-native';

export default function QRScanOverlay({ onComplete, onClose }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    onComplete(data);
  };

  const handleSimulate = () => {
    setScanned(true);
    onComplete("SIMULATED-ID-888");
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white mb-4">No camera access</Text>
        <TouchableOpacity onPress={requestPermission} className="bg-blue-500 px-4 py-2 rounded">
          <Text className="text-white">Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} className="mt-8">
           <Text className="text-gray-400">Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal animationType="slide" transparent={false} visible={true}>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          {/* Overlay UI */}
          <View className="flex-1 bg-black/50 justify-center items-center relative">
            
            <TouchableOpacity onPress={onClose} className="absolute top-12 right-6 bg-white/20 p-2 rounded-full">
              <X color="white" size={24} />
            </TouchableOpacity>

            <View className="w-72 h-72 border-2 border-white/50 rounded-3xl justify-center items-center overflow-hidden bg-transparent">
              {/* Fake Corners */}
              <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl" />
              <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl" />
              <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl" />
              <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl" />
              
              <QrCode color="rgba(255,255,255,0.2)" size={100} />
            </View>

            <Text className="text-white font-bold text-xl mt-8">Scanning ID...</Text>
            
            {/* Simulation Button */}
            <TouchableOpacity 
              onPress={handleSimulate}
              className="mt-6 bg-white/20 border border-white/30 flex-row items-center px-6 py-3 rounded-xl"
            >
               <Play color="white" size={16} fill="white" />
               <Text className="text-white font-bold ml-2">SIMULATE SCAN</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
});