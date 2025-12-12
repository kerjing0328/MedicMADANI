import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import { Activity, AlertTriangle, Phone, Shield } from 'lucide-react-native';
import { MOCK_PATIENT } from '../data/mockData';

export default function ParamedicView({ onBack }) {
  return (
    <View className="flex-1 bg-gray-100">
      <SafeAreaView className="bg-red-600">
        <Header title="EMERGENCY ACCESS" icon={Activity} colorClass="bg-red-600" onBack={onBack} />
      </SafeAreaView>
      
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* Vital ID Card */}
        <View className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-red-500 mb-4" style={{ elevation: 2 }}>
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-xl font-bold text-gray-900">{MOCK_PATIENT.name}</Text>
              <Text className="text-gray-500 text-sm">ID: {MOCK_PATIENT.id}</Text>
              <Text className="text-gray-500 text-sm mt-1">
                {MOCK_PATIENT.age} Years Old • {MOCK_PATIENT.gender}
              </Text>

              {/* OKU STATUS */}
              {MOCK_PATIENT.okuStatus && (
                <View className="mt-2 bg-blue-100 px-2 py-1 rounded-md w-fit border border-blue-300">
                  <Text className="text-xs font-bold text-blue-700 uppercase">
                    OKU STATUS: {MOCK_PATIENT.okuStatus}
                  </Text>
                </View>
              )}
            </View>

            <View className="items-center justify-center bg-red-50 border-2 border-red-100 rounded-lg p-2 w-20 h-20">
              <Text className="text-xs text-red-400 font-bold uppercase">Blood</Text>
              <Text className="text-3xl font-black text-red-600">{MOCK_PATIENT.bloodType}</Text>
            </View>
          </View>

          {/* Critical Tags */}
          <View className="gap-3">
            {/* Allergies */}
            <View className="bg-red-50 p-3 rounded-lg border border-red-100">
              <View className="flex-row items-center gap-2 mb-2">
                <AlertTriangle color="#dc2626" size={20} />
                <Text className="font-bold text-red-700 text-sm">CRITICAL ALLERGIES</Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {MOCK_PATIENT.allergies.map((allergy, i) => (
                  <View key={i} className="bg-red-200 px-2 py-1 rounded-md border border-red-300">
                    <Text className="text-red-900 text-xs font-bold uppercase">{allergy}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Genetic / Known Conditions */}
            <View className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
              <View className="flex-row items-center gap-2 mb-1">
                <Shield color="#ca8a04" size={20} />
                <Text className="font-bold text-yellow-700 text-sm">
                  GENETIC / KNOWN CONDITIONS
                </Text>
              </View>
              <Text className="text-sm text-gray-700 pl-7">
                {MOCK_PATIENT.conditions.join(", ")}
              </Text>
            </View>
          </View>
        </View>

        {/* Guardians */}
        <Text className="font-bold text-gray-700 text-sm mb-2 pl-1">GUARDIANS</Text>
        <View className="flex-row gap-4 mb-4">
          {MOCK_PATIENT.emergencyContacts.map((contact, i) => (
            <TouchableOpacity 
              key={i} 
              className="flex-1 bg-white p-4 rounded-xl shadow-sm items-center border border-gray-200" 
              style={{ elevation: 1 }}
            >
              <View className="bg-green-100 p-3 rounded-full mb-2">
                <Phone color="#16a34a" size={24} />
              </View>
              <Text className="font-bold text-gray-800 text-sm text-center">{contact.name}</Text>
              <Text className="text-xs text-gray-500 text-center">{contact.phone}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
