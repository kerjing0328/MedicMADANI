import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Shield, Wifi, Lock, WifiOff, Activity, Stethoscope, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingPage({ onSelectRole }) {
    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Hero Section */}
                <LinearGradient
                    colors={['#0f172a', '#1e293b']} 
                    className="p-6 pb-12 rounded-b-[40px] shadow-xl relative overflow-hidden pt-16"
                >
                    <View className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-4">
                        <Shield color="white" size={200} />
                    </View>

                    <View className="flex-row items-center mb-4 space-x-2 gap-2">
                        <Shield color="#FACC15" size={28} fill="#FACC15" />
                        <Text className="text-2xl font-bold text-yellow-400">MedicMadani</Text>
                    </View>

                    <Text className="text-3xl font-bold text-white mb-2">Smart ID System</Text>
                    <Text className="text-slate-300 text-sm mb-6 leading-5">
                        Secure, tiered access to critical health data when it matters most.
                    </Text>

                    <View className="flex-row items-center bg-white/10 p-3 rounded-lg self-start space-x-3">
                        <View className="flex-row items-center space-x-1.5">
                            <Wifi color="#4ade80" size={18} />
                            <Text className="text-white text-xs">Online</Text>
                        </View>
                        <View className="h-4 w-px bg-white/20" />
                        <View className="flex-row items-center space-x-1.5">
                            <Lock color="#FACC15" size={18} />
                            <Text className="text-white text-xs">Encrypted</Text>
                        </View>
                    </View>

                </LinearGradient>

                {/* Role Selection */}
                <View className="px-6 py-10 mt-8 gap-4">
                    {/* Paramedic */}
                    <TouchableOpacity
                        onPress={() => onSelectRole('paramedic')}
                        className="bg-white p-5 rounded-2xl shadow-sm border-l-8 border-red-500 flex-row justify-between items-center"
                        style={{ elevation: 4 }} 
                    >
                        <View className="flex-1">
                            <Text className="font-bold text-gray-800 text-lg">Emergency Responder</Text>
                            <View className="flex-row items-center mt-1 gap-1">
                                <WifiOff color="#16a34a" size={14} />
                                <Text className="text-green-600 text-xs font-bold">Offline Ready</Text>
                            </View>
                            <Text className="text-xs text-red-500 font-medium mt-1">Layer 1: Golden Hour</Text>
                        </View>
                        <View className="bg-red-50 p-3 rounded-full">
                            <Activity color="#ef4444" size={24} />
                        </View>
                    </TouchableOpacity>

                    {/* Doctor */}
                    <TouchableOpacity
                        onPress={() => onSelectRole('doctor')}
                        className="bg-white p-5 rounded-2xl shadow-sm border-l-8 border-blue-500 flex-row justify-between items-center"
                        style={{ elevation: 4 }}
                    >
                        <View className="flex-1">
                            <Text className="font-bold text-gray-800 text-lg">Medical Professional</Text>
                            <View className="flex-row items-center mt-1 gap-1">
                                <Wifi color="#2563eb" size={14} />
                                <Text className="text-blue-600 text-xs font-bold">Wi-Fi Required</Text>
                            </View>
                            <Text className="text-xs text-gray-400 mt-1">Layer 2: Clinical History</Text>
                        </View>
                        <View className="bg-blue-50 p-3 rounded-full">
                            <Stethoscope color="#3b82f6" size={24} />
                        </View>
                    </TouchableOpacity>

                    {/* Citizen */}
                    <TouchableOpacity
                        onPress={() => onSelectRole('citizen')}
                        className="bg-white p-5 rounded-2xl shadow-sm border-l-8 border-yellow-400 flex-row justify-between items-center"
                        style={{ elevation: 4 }}
                    >
                        <View className="flex-1">
                            <Text className="font-bold text-gray-800 text-lg">Citizen Login</Text>
                            <View className="flex-row items-center mt-1 gap-1">
                                <Wifi color="#ca8a04" size={14} />
                                <Text className="text-yellow-600 text-xs font-bold">Wi-Fi to Update</Text>
                            </View>
                            <Text className="text-xs text-gray-400 mt-1">Layer 3: Manage Profile</Text>
                        </View>
                        <View className="bg-yellow-50 p-3 rounded-full">
                            <User color="#eab308" size={24} />
                        </View>
                    </TouchableOpacity>

                    <Text className="text-center text-xs text-gray-400 mt-8">
                        Powered by Malaysian Smart ID Infrastructure
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}