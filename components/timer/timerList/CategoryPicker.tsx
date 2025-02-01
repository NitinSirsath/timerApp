import { Timer } from "@/store/useTimerStore";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

interface IProps {
  groupedTimers: Record<string, Timer[]>;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}

const CategoryPicker = ({
  groupedTimers,
  selectedCategory,
  setSelectedCategory,
}: IProps) => {
  const { colors, dark } = useTheme(); // ✅ Get theme colors and dark mode flag

  return (
    <View
      style={[
        styles.filterContainer,
        {
          backgroundColor: dark ? "#333" : colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={[styles.picker, { color: colors.text }]}
        dropdownIconColor={colors.text} // ✅ Proper dropdown visibility
      >
        <Picker.Item label="All Categories" value={null} color={colors.text} />
        {Object.keys(groupedTimers).map((category) => (
          <Picker.Item
            key={category}
            label={category}
            value={category}
            color={colors.text}
          />
        ))}
      </Picker>
    </View>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  filterContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10, // ✅ Extra padding for better touch area
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
