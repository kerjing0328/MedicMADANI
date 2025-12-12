import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingPage from './src/pages/LandingPage';
import ParamedicView from './src/pages/ParamedicView';
import DoctorView from './src/pages/DoctorView';
import CitizenView from './src/pages/CitizenView';
import QRScanOverlay from './src/components/QRScanOverlay';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isScanning, setIsScanning] = useState(false);
  const [targetRole, setTargetRole] = useState(null);

  useEffect(() => {
    if (targetRole) {
      setIsScanning(true);
    }
  }, [targetRole]);

  const completeScan = (scannedData) => {
    console.log("Scanned Data:", scannedData); 
    setIsScanning(false);
    setCurrentView(targetRole);
    setTargetRole(null);
  };

  const cancelScan = () => {
    setIsScanning(false);
    setTargetRole(null);
  }

  const goBack = () => {
    setCurrentView('landing');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-slate-900">
        {isScanning && (
          <QRScanOverlay 
            onComplete={completeScan} 
            onClose={cancelScan} 
          />
        )}
        
        {currentView === 'landing' && <LandingPage onSelectRole={setTargetRole} />}
        {currentView === 'paramedic' && <ParamedicView onBack={goBack} />}
        {currentView === 'doctor' && <DoctorView onBack={goBack} />}
        {currentView === 'citizen' && <CitizenView onBack={goBack} />}
      </View>
    </SafeAreaProvider>
  );
}