import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AppState } from "../reducers/index";
import MovieItem from "../components/MovieItem";
import { useNavigation } from "@react-navigation/native";
import { toggleFavorite } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favorites = useSelector((state: AppState) =>
    state.movies.favorites
      .map((id) => state.movies.movies.find((movie) => movie.id === id))
      .filter(Boolean)
  );

  const handleToggleFavorite = (movieId) => dispatch(toggleFavorite(movieId));

  if (favorites.length === 0) {
    // Controllo se la lista è vuota
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.message}>No favorites added yet.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Search Movies</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            onPress={() =>
              navigation.navigate("MovieDetails", { movieId: item.id })
            }
            onPressDelete={() => handleToggleFavorite(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  message: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#1e90ff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FavoritesScreen;
