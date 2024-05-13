import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onSearch: () => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  onClear,
  onSearch,
  placeholder = "Search movie ...",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      {value ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearText}>X</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#333",
    borderRadius: 25,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  clearButton: {
    padding: 10,
  },
  clearText: {
    fontSize: 18,
    color: "#666",
  },
  searchButton: {
    padding: 10,
  },
  searchButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default SearchBar;
