import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AppState } from "../reducers/index";
import { fetchGuestSession, fetchPopularMovies } from "../api/api";
import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_START,
} from "../reducers/moviesReducer";
import SearchBar from "../components/SearchBar";
import { setGuestSessionId } from "../actions/actions";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { movies, loading, error } = useSelector(
    (state: AppState) => state.movies
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const sessionState = useSelector((state) => state.session);

  const fetchMovies = (sessionId: string, query?: string) => {
    dispatch({ type: FETCH_MOVIES_START });
    fetchPopularMovies(query, sessionId)
      .then((movies) => {
        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: movies });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_MOVIES_FAILURE,
          payload: "Failed to fetch movies",
        });
      });
  };

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate("MovieDetails", { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 ore in millisecondi

  const isSessionExpired = (sessionCreatedAt) => {
    return new Date().getTime() - sessionCreatedAt > SESSION_DURATION;
  };

  const checkAndRenewSession = async (dispatch, state) => {
    if (isSessionExpired(state.session.createdAt)) {
      try {
        const newSessionId = await fetchGuestSession();
        dispatch(setGuestSessionId(newSessionId, new Date().getTime()));
      } catch (error) {
        console.error("Failed to renew guest session:", error);
      }
    }
  };

  useEffect(() => {
    async function initMovies() {
      try {
        if (
          sessionState &&
          sessionState.guestSessionId &&
          sessionState.createdAt
        ) {
          await checkAndRenewSession(dispatch, sessionState);
          fetchMovies(sessionState.guestSessionId);
        }
      } catch (error) {
        console.error("Error initializing movies or session:", error);
      }
    }

    initMovies();
  }, [dispatch, sessionState]);

  const handleSearch = () => {
    // Chiamata API con il valore attuale di searchQuery
    fetchMovies(sessionState.guestSessionId, searchQuery);
    setIsSearched(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearched(false);
    fetchMovies(sessionState.guestSessionId); // Reset alla lista di film popolari
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearchChange}
        onClear={clearSearch}
        onSearch={handleSearch}
        placeholder="Search movies..."
      />
      <TouchableOpacity
        style={[styles.listsButton, { marginVertical: 10 }]}
        onPress={() => navigation.navigate("Lists")}
      >
        <Text style={styles.listsButtonText}>Go to Lists</Text>
      </TouchableOpacity>
      {isSearched ? (
        <Text style={styles.sectionTitle}>Searched Movies</Text>
      ) : (
        <Text style={styles.sectionTitle}>Popular Movies</Text>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>Error fetching data: {error}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  movieContainer: {
    flex: 1 / 2,
    padding: 5,
    alignItems: "center",
  },
  movieImage: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 10,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  listsButton: {
    backgroundColor: "#1e90ff",
    padding: 10,
    marginHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  listsButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
