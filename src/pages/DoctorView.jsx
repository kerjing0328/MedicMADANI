import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import { MOCK_PATIENT } from '../data/mockData';
import { Lock, Stethoscope, User, AlertTriangle, Activity, Syringe, History, Shield, Phone, MapPin, Mail, Ruler, Briefcase, FileText, PillBottleIcon } from 'lucide-react-native';

export default function DoctorView({ onBack }) {
  const [pinVerified, setPinVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [activeTab, setActiveTab] = useState('clinical');

  // PIN Screen Logic
  if (!pinVerified) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center p-6">
        <View className="bg-white p-8 rounded-2xl w-full max-w-sm items-center shadow-lg" style={{ elevation: 5 }}>
          <View className="bg-blue-100 p-4 rounded-full mb-4">
            <Lock color="#2563eb" size={32} />
          </View>
          <Text className="text-xl font-bold text-gray-800 mb-2">Provider Access</Text>
          <Text className="text-sm text-gray-500 mb-6 text-center">Enter PIN for Tier 2 Records</Text>

          <View className="flex-row gap-2 mb-6 h-4">
            {[1, 2, 3, 4].map((_, i) => (
              <View key={i} className={`w-4 h-4 rounded-full border-2 ${pin.length > i ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`} />
            ))}
          </View>

          <View className="flex-row flex-wrap justify-center gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
              <TouchableOpacity
                key={num}
                onPress={() => setPin(prev => (prev.length < 4 ? prev + num : prev))}
                className="w-16 h-16 bg-gray-100 rounded-full justify-center items-center"
              >
                <Text className="text-xl font-bold text-gray-700">{num}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex-row w-full justify-between px-4">
            <TouchableOpacity onPress={() => setPin("")}>
              <Text className="text-gray-400 font-bold">CLEAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPinVerified(true)}>
              <Text className="text-blue-600 font-bold text-lg">ENTER</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={onBack} className="mt-6">
          <Text className="text-gray-400">Cancel Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <SafeAreaView className="bg-blue-700">
        <View className="h-24 justify-center">
          <Header title="MEDICAL PRO" icon={Stethoscope} colorClass="bg-blue-700" onBack={onBack} />
        </View>
      </SafeAreaView>

      {/* Patient Banner */}
      <View className="bg-white p-4 border-b border-gray-200 flex-row items-center gap-4">
        <View className="w-14 h-14 bg-slate-200 rounded-full justify-center items-center">
          <User color="#94a3b8" size={28} />
        </View>
        <View>
          <Text className="text-xl font-bold text-slate-900">{MOCK_PATIENT.name || 'Unknown'}</Text>
          <Text className="text-sm text-slate-500">
            {MOCK_PATIENT.id || 'N/A'} • {MOCK_PATIENT.age || 'N/A'} yrs • {MOCK_PATIENT.gender || 'Unknown'}
          </Text>
        </View>
      </View>

      {/* Quick Status Bar */}
      <View className="bg-white px-4 pb-4 border-b border-gray-100 flex-row gap-2">
        {MOCK_PATIENT.bloodType && (
          <View className="bg-red-50 px-2 py-1 rounded-md border border-red-200">
            <Text className="text-red-700 text-xs font-bold uppercase">BLOOD: {MOCK_PATIENT.bloodType}</Text>
          </View>
        )}
        {MOCK_PATIENT.okuStatus && (
          <View className="bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
            <Text className="text-blue-700 text-xs font-bold uppercase">OKU: {MOCK_PATIENT.okuStatus}</Text>
          </View>
        )}
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white border-b border-gray-200 shadow-sm">
        {[
          { id: 'clinical', label: 'Clinical', icon: Activity },
          { id: 'history', label: 'History', icon: History },
          { id: 'profile', label: 'Profile', icon: FileText } // NEW TAB
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 border-b-2 items-center flex-row justify-center gap-2 ${activeTab === tab.id ? 'border-blue-600' : 'border-transparent'}`}
          >
            <tab.icon size={16} color={activeTab === tab.id ? '#2563eb' : '#9ca3af'} />
            <Text className={`font-bold capitalize ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} className="flex-1">

        {/* ================= CLINICAL TAB ================= */}
        {activeTab === 'clinical' && (
          <View className="gap-4">
            {/* Critical Allergies */}
            <View className="bg-red-50 p-4 rounded-xl border border-red-100">
              <View className="flex-row items-center gap-2 mb-2">
                <AlertTriangle color="#dc2626" size={20} />
                <Text className="font-bold text-red-800">CRITICAL ALLERGIES</Text>
              </View>
              <Text className="text-red-700 font-bold text-lg">
                {(MOCK_PATIENT.allergies || []).join(", ") || 'None'}
              </Text>
            </View>

            {/* Genetic / Known Conditions */}
            <View className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <View className="flex-row items-center gap-2 mb-2">
                <Shield color="#d97706" size={20} />
                <Text className="font-bold text-amber-800">ACTIVE CONDITIONS</Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {(MOCK_PATIENT.conditions || []).map((c, i) => (
                  <View key={i} className="bg-white px-3 py-1 rounded-full border border-amber-200">
                    <Text className="text-amber-900 font-medium">{c}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Medications */}
            <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <View className="flex-row items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                <PillBottleIcon color="#2563eb" size={20} />
                <Text className="font-bold text-gray-800">Current Medication</Text>
              </View>
              {(MOCK_PATIENT.medications || []).map((med, i) => (
                <View key={i} className="mb-4 last:mb-0">
                  <Text className="font-bold text-slate-900 text-lg">{med.name}</Text>
                  <Text className="text-sm text-slate-500 font-medium">{med.purpose}</Text>
                  <Text className="text-xs text-blue-600 mt-1 bg-blue-50 self-start px-2 py-0.5 rounded">{med.dosage}</Text>
                </View>
              ))}
            </View>
            {/* Vaccination */}
            <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <View className="flex-row items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                <Syringe color="#2563eb" size={20} />
                <Text className="font-bold text-gray-800">Vaccination</Text>
              </View>
              {(MOCK_PATIENT.vaccinations || []).map((vac, i) => (
                <View key={i} className="mb-4 last:mb-0">
                  <Text className="font-bold text-slate-900 text-lg">{vac.name}</Text>
                  <Text className="text-xs text-green-600 mt-1 bg-green-50 self-start px-2 py-0.5 rounded">{vac.date}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ================= HISTORY TAB ================= */}
        {activeTab === 'history' && (
          <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <View className="flex-row items-center gap-2 mb-6">
              <History color="#94a3b8" size={20} />
              <Text className="font-bold text-gray-800">Medical Timeline</Text>
            </View>
            {(MOCK_PATIENT.history || []).map((h, i) => (
              <View key={i} className="border-l-2 border-slate-200 pl-6 mb-8 relative last:mb-0">
                <View className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-blue-500 rounded-full" />
                <Text className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wide">{h.date}</Text>
                <Text className="font-bold text-slate-800 text-lg">{h.facility}</Text>
                <Text className="text-sm text-blue-600 font-bold mb-2">{h.type}</Text>
                <Text className="text-sm text-slate-600 leading-5 bg-slate-50 p-3 rounded-lg">{h.summary}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ================= PROFILE TAB ================= */}
        {activeTab === 'profile' && (
          <View className="gap-4 pb-8">
            {/* 1. Biometrics Row */}
            <View className="mb-2 px-1">
              <Text className="font-bold text-gray-500 text-xs uppercase mb-2">Biometrics</Text>
              <View className="flex-row gap-2">
                <View className="flex-1 bg-white p-3 rounded-xl border border-gray-200 items-center shadow-sm">
                  <View className="bg-blue-100 p-2 rounded-full mb-2">
                    <Ruler size={20} color="#2563eb" />
                  </View>
                  <Text className="text-xs text-gray-400 font-bold uppercase">Height</Text>
                  <Text className="text-2xl font-bold text-slate-800">
                    {MOCK_PATIENT.biometrics?.height || '--'}{' '}
                    <Text className="text-sm text-gray-400 font-normal">cm</Text>
                  </Text>
                </View>
                <View className="flex-1 bg-white p-3 rounded-xl border border-gray-200 items-center shadow-sm">
                  <View className="bg-purple-100 p-2 rounded-full mb-2">
                    <Activity size={20} color="#9333ea" />
                  </View>
                  <Text className="text-xs text-gray-400 font-bold uppercase">Weight</Text>
                  <Text className="text-2xl font-bold text-slate-800">
                    {MOCK_PATIENT.biometrics?.weight || '--'}{' '}
                    <Text className="text-sm text-gray-400 font-normal">kg</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* 2. Contact Details */}
            <View className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <View className="bg-slate-50 p-3 border-b border-gray-100">
                <Text className="font-bold text-slate-700">Contact Information</Text>
              </View>
              <View className="p-4 gap-4">
                <View className="flex-row items-center gap-3">
                  <Phone size={18} color="#64748b" />
                  <View>
                    <Text className="text-xs text-gray-400">Mobile</Text>
                    <Text className="text-slate-800 font-medium">{MOCK_PATIENT.contactInfo?.phone || 'N/A'}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3">
                  <Mail size={18} color="#64748b" />
                  <View>
                    <Text className="text-xs text-gray-400">Email</Text>
                    <Text className="text-slate-800 font-medium">{MOCK_PATIENT.contactInfo?.email || 'N/A'}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3">
                  <MapPin size={18} color="#64748b" />
                  <View className="flex-1">
                    <Text className="text-xs text-gray-400">Address</Text>
                    <Text className="text-slate-800 font-medium leading-5">{MOCK_PATIENT.contactInfo?.address || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 3. Guardians */}
            <View className="mb-2">
              <Text className="font-bold text-gray-500 text-xs uppercase mb-2 px-1">Emergency Guardians</Text>
              <View className="flex-row gap-2">
                {(MOCK_PATIENT.emergencyContacts || []).map((contact, i) => (
                  <TouchableOpacity
                    key={i}
                    className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex-row items-center gap-2"
                  >
                    <View className="bg-green-100 p-2 rounded-full justify-center items-center">
                      <Phone color="#16a34a" size={18} />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-gray-800 text-sm">{contact.name}</Text>
                      <Text className="text-xs text-gray-500">{contact.phone}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>


            {/* 4. Insurance */}
            <View className="bg-indigo-900 rounded-xl p-6 shadow-lg mt-2 relative overflow-hidden">
              <View className="absolute right-10 top-10 opacity-20"><Shield color="white" size={100} /></View>
              <Text className="text-indigo-200 text-xs font-bold uppercase mb-1">Insurance Provider</Text>
              <Text className="text-white text-xl font-bold">{MOCK_PATIENT.insurance?.provider || 'N/A'}</Text>
              <View className="mt-4 pt-4 border-t border-indigo-800">
                <Text className="text-indigo-300 text-xs">Policy Number</Text>
                <Text className="text-white text-lg font-mono tracking-widest">{MOCK_PATIENT.insurance?.policyNo || 'N/A'}</Text>
              </View>
            </View>

          </View>
        )}
      </ScrollView>
    </View>
  );
}