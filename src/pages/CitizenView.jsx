import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MOCK_PATIENT } from '../data/mockData';
import { LogOut, User, Shield, QrCode, FileText, CreditCard, Phone, ChevronRight, Clock, Edit2, X, Save, Lock, AlertCircle, Mail, MapPin, Ruler, Activity } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CitizenView({ onBack }) {
  const [patientData, setPatientData] = useState(MOCK_PATIENT);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(MOCK_PATIENT);

  const handleEditOpen = () => {
    setFormData(JSON.parse(JSON.stringify(patientData)));
    setIsEditing(true);
  };

  const handleSave = () => {
    setPatientData(formData);
    setIsEditing(false);
    Alert.alert("Profile Updated", "Your contact details and biometrics have been saved.");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="bg-yellow-400 pb-8 rounded-b-[40px] pt-12 px-6 shadow-lg">
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={onBack} className="bg-white/20 p-2 rounded-full">
              <LogOut color="#713f12" size={20} />
            </TouchableOpacity>
            <Text className="font-bold text-yellow-900 text-lg">My Health ID</Text>
            <TouchableOpacity onPress={handleEditOpen} className="bg-white/20 p-2 rounded-full">
              <Edit2 color="#713f12" size={20} />
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-5 shadow-lg items-center mx-6">
            <View className="w-20 h-20 bg-slate-200 rounded-full justify-center items-center mb-2">
              <User color="#94a3b8" size={36} />
            </View>
            <Text className="font-bold text-gray-800 text-xl text-center">{patientData.name}</Text>
            <Text className="text-sm text-gray-500 text-center mb-4">MyKad: {patientData.id}</Text>
            <View className="flex-row w-full border-t border-gray-100 pt-4 justify-evenly">
              <View className="items-center">
                <Text className="text-xs text-gray-400 font-bold uppercase">Height</Text>
                <Text className="text-lg font-bold text-slate-700">{patientData.biometrics.height} <Text className="text-xs text-gray-400">cm</Text></Text>
              </View>
              <View className="w-[1px] bg-gray-200 h-full" />
              <View className="items-center">
                <Text className="text-xs text-gray-400 font-bold uppercase">Weight</Text>
                <Text className="text-lg font-bold text-slate-700">{patientData.biometrics.weight} <Text className="text-xs text-gray-400">kg</Text></Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-center gap-3 mt-2 px-6">
          {[{ icon: QrCode, label: 'Show QR' }, { icon: FileText, label: 'Reports' }, { icon: CreditCard, label: 'Insurance' }]
            .map((item, i) => (
              <TouchableOpacity key={i} className="bg-white w-28 p-4 rounded-xl shadow-sm items-center justify-center gap-2" style={{ elevation: 2 }}>
                <item.icon color="#334155" size={28} />
                <Text className="text-xs font-bold text-slate-700 text-center">{item.label}</Text>
              </TouchableOpacity>
            ))}
        </View>

        {/* Contact Info Preview */}
        <View className="justify-center mt-4 px-6 mb-8">
          <Text className="font-bold text-gray-800 text-lg mb-2">Contact Details</Text>
          <View className="bg-white p-4 rounded-xl shadow-sm gap-3 border border-gray-100">
            <View className="flex-row items-center gap-3">
              <Phone size={16} color="#64748b" />
              <Text className="text-gray-600">{patientData.contactInfo.phone}</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Mail size={16} color="#64748b" />
              <Text className="text-gray-600">{patientData.contactInfo.email}</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <MapPin size={16} color="#64748b" />
              <Text className="text-gray-600 flex-1">{patientData.contactInfo.address}</Text>
            </View>
          </View>
        </View>

        {/* Insurance Card */}
        <View className="justify-center mt-4 px-6 mb-8">
          <LinearGradient colors={['#2563eb', '#1e40af']} className="rounded-xl p-5 shadow-lg relative overflow-hidden">
            <View className="absolute top-0 right-0 opacity-10 p-4"><Shield color="white" size={120} /></View>
            <Text className="text-blue-200 text-xs">Coverage Provider</Text>
            <Text className="text-white font-bold text-lg mb-4">{patientData.insurance.provider}</Text>
            <Text className="text-blue-200 text-xs">Policy Number</Text>
            <Text className="text-white font-mono text-xl tracking-widest">{patientData.insurance.policyNo}</Text>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* ================= EDIT MODAL ================= */}
      <Modal animationType="slide" transparent={true} visible={isEditing} onRequestClose={() => setIsEditing(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[30px] h-[90%]">

            <View className="flex-row justify-between items-center p-6 border-b border-gray-100">
              <Text className="text-xl font-bold text-gray-800">Edit Profile</Text>
              <TouchableOpacity onPress={() => setIsEditing(false)} className="bg-gray-100 p-2 rounded-full">
                <X color="#374151" size={20} />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-6">

              {/* EDITABLE: Personal Contact Info */}
              <Text className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wider">Contact Information</Text>
              <View className="bg-gray-50 p-4 rounded-xl mb-6 gap-4 border border-gray-100">
                <View>
                  <Text className="text-xs text-gray-500 font-bold mb-1">Phone Number</Text>
                  <TextInput
                    className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800"
                    value={formData.contactInfo.phone}
                    onChangeText={(text) => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, phone: text } })}
                    keyboardType="phone-pad"
                  />
                </View>
                <View>
                  <Text className="text-xs text-gray-500 font-bold mb-1">Email Address</Text>
                  <TextInput
                    className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800"
                    value={formData.contactInfo.email}
                    onChangeText={(text) => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, email: text } })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View>
                  <Text className="text-xs text-gray-500 font-bold mb-1">Home Address</Text>
                  <TextInput
                    className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800"
                    value={formData.contactInfo.address}
                    onChangeText={(text) => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, address: text } })}
                    multiline
                  />
                </View>
              </View>

              {/* EDITABLE: Biometrics */}
              <Text className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wider">Body Measurements</Text>
              <View className="bg-gray-50 p-4 rounded-xl mb-6 flex-row gap-4 border border-gray-100">
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 font-bold mb-1">Height (cm)</Text>
                  <View className="relative">
                    <TextInput
                      className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800 pl-10"
                      value={formData.biometrics.height}
                      onChangeText={(text) => setFormData({ ...formData, biometrics: { ...formData.biometrics, height: text } })}
                      keyboardType="numeric"
                    />
                    <View className="absolute left-3 top-3.5"><Ruler size={16} color="#94a3b8" /></View>
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 font-bold mb-1">Weight (kg)</Text>
                  <View className="relative">
                    <TextInput
                      className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800 pl-10"
                      value={formData.biometrics.weight}
                      onChangeText={(text) => setFormData({ ...formData, biometrics: { ...formData.biometrics, weight: text } })}
                      keyboardType="numeric"
                    />
                    <View className="absolute left-3 top-3.5"><Activity size={16} color="#94a3b8" /></View>
                  </View>
                </View>
              </View>

              {/* EDITABLE: Insurance */}
              <Text className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wider">Insurance</Text>
              <View className="bg-blue-50 p-4 rounded-xl mb-6 gap-4 border border-blue-100">
                <View>
                  <Text className="text-xs text-blue-800 font-bold mb-1">Provider Name</Text>
                  <TextInput
                    className="bg-white p-3 rounded-lg border border-blue-100 text-gray-800"
                    value={formData.insurance.provider}
                    onChangeText={(text) => setFormData({ ...formData, insurance: { ...formData.insurance, provider: text } })}
                  />
                </View>
                <View>
                  <Text className="text-xs text-blue-800 font-bold mb-1">Policy Number</Text>
                  <TextInput
                    className="bg-white p-3 rounded-lg border border-blue-100 text-gray-800"
                    value={formData.insurance.policyNo}
                    onChangeText={(text) => setFormData({ ...formData, insurance: { ...formData.insurance, policyNo: text } })}
                  />
                </View>
              </View>

              {/* READ-ONLY: Clinical */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-sm font-bold text-gray-400 uppercase tracking-wider">Locked Clinical Data</Text>
                <Lock size={14} color="#9ca3af" />
              </View>
              <View className="bg-gray-100 p-4 rounded-xl mb-24 border border-gray-200">
                <Text className="text-gray-500 text-sm mb-1">Blood Type: <Text className="font-bold text-gray-700">{formData.bloodType}</Text></Text>
                <Text className="text-gray-500 text-sm mb-1">Allergies: <Text className="font-bold text-red-600">{formData.allergies.join(", ")}</Text></Text>
                <View className="flex-row items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                  <AlertCircle size={12} color="#6b7280" />
                  <Text className="text-xs text-gray-500 italic">Updated by attending physician only.</Text>
                </View>
              </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
              <TouchableOpacity onPress={handleSave} className="bg-blue-600 p-4 rounded-xl flex-row justify-center items-center gap-2 shadow-lg">
                <Save color="white" size={20} />
                <Text className="text-white font-bold text-lg">Save Changes</Text>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}