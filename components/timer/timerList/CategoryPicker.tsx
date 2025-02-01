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
  const { colors } = useTheme();
  return (
    <View style={styles.filterContainer}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={[styles.picker, { color: colors.text }]}
      >
        <Picker.Item label="All Categories" value={null} />
        {Object.keys(groupedTimers).map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
    </View>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  filterContainer: { marginBottom: 15 },
  picker: { height: 60 },
});
