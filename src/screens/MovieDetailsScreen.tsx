import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AppState } from "../reducers/index";
import { toggleFavorite, toggleWatchlist } from "../actions/actions";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  route: {
    params: {
      movieId: number;
    };
  };
};

const MovieDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { movieId } = route.params;
  const movie = useSelector((state: AppState) =>
    state.movies.movies.find((m) => m.id === movieId)
  );
  const favorites = useSelector((state: AppState) => state.movies.favorites);
  const watchlist = useSelector((state: AppState) => state.movies.watchlist);

  const isFavorite = favorites ? favorites.includes(movieId) : false;
  const isInWatchlist = watchlist ? watchlist.includes(movieId) : false;
  const dispatch = useDispatch();

  if (!movie) {
    return <Text>Movie not found!</Text>;
  }

  const handleToggleFavorite = () => dispatch(toggleFavorite(movieId));
  const handleToggleWatchlist = () => dispatch(toggleWatchlist(movieId));

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["transparent", "#000"]}
          style={styles.backgroundImage}
        >
          <View style={styles.topButtonContainer}>
            <TouchableOpacity style={{}}>
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rating {movie.rating}</Text>
          <Text style={styles.ratingText}>
            ⭐ {movie.vote_average} ({movie.vote_count} reviews)
          </Text>
        </View>
        <ScrollView style>
          <Text style={styles.description}>{movie.overview}</Text>
        </ScrollView>
        <TouchableOpacity
          style={[styles.reservationButton, { marginTop: 10 }]}
          onPress={handleToggleWatchlist}
        >
          <Text style={styles.reservationButtonText}>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.reservationButton, { marginVertical: 10 }]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.reservationButtonText}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  gradient: {
    flex: 1,
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  reservationButton: {
    backgroundColor: "#E50914",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  reservationButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default MovieDetailsScreen;
