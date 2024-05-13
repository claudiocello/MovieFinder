import axios from "axios";
import { TMDB_API_KEY } from "@env";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchPopularMovies = async (
  query?: string,
  guestSessionId?: string
) => {
  try {
    let url = `/movie/popular?api_key=${TMDB_API_KEY}`;
    if (query) {
      url = `/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`;
    }
    if (guestSessionId) {
      url += `&guest_session_id=${guestSessionId}`;
    }

    const response = await api.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};

export const fetchGuestSession = async () => {
  try {
    const response = await api.get(
      `/authentication/guest_session/new?api_key=${TMDB_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching guest session:", error);
    throw error;
  }
};

export default api;
