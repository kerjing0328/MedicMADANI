import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";

export default function Header({ title, icon: Icon, colorClass, onBack }) {
  return (
    <View
      className={`py-4 px-4 shadow-sm flex-row items-center justify-between ${colorClass}`}
    >
      {/* Back Button + Title */}
      <View className="flex-row items-center space-x-3 gap-3">
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            className="bg-white/20 p-2 rounded-full"
          >
            <ChevronRight
              color="white"
              size={24}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-lg text-white tracking-wide">
          {title}
        </Text>
      </View>

      {/* Status */}
      <View className="flex-row items-center space-x-2 gap-2 opacity-90">
        <View className="w-2 h-2 bg-green-400 rounded-full" />
        <Text className="text-white text-xs font-bold">ACTIVE</Text>
      </View>
    </View>
  );
}
