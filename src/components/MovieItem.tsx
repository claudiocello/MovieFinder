import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Movie } from "../types/types";

type Props = {
  movie: Movie;
  onPress?: () => void;
  onPressDelete?: () => void;
};

const MovieItem: React.FC<Props> = ({ movie, onPress, onPressDelete }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    width: "60%",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
  deleteText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default MovieItem;
