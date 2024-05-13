import { Movie } from "../types/types";

// Definizione delle azioni
export const FETCH_MOVIES_START = "FETCH_MOVIES_START";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const TOGGLE_WATCHLIST = "TOGGLE_WATCHLIST";

interface FetchMoviesStartAction {
  type: typeof FETCH_MOVIES_START;
}

interface FetchMoviesSuccessAction {
  type: typeof FETCH_MOVIES_SUCCESS;
  payload: Movie[];
}

interface FetchMoviesFailureAction {
  type: typeof FETCH_MOVIES_FAILURE;
  payload: string;
}
interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  payload: number; // ID del film
}

interface ToggleWatchlistAction {
  type: typeof TOGGLE_WATCHLIST;
  payload: number; // ID del film
}

type MovieActionTypes =
  | FetchMoviesStartAction
  | FetchMoviesSuccessAction
  | FetchMoviesFailureAction
  | ToggleFavoriteAction
  | ToggleWatchlistAction;

// Stato iniziale
const initialState = {
  movies: [] as Movie[],
  loading: false,
  error: null as string | null,
  favorites: [] as number[],
  watchlist: [] as number[],
};

// Reducer
const moviesReducer = (state = initialState, action: MovieActionTypes) => {
  switch (action.type) {
    case FETCH_MOVIES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TOGGLE_FAVORITE:
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    case TOGGLE_WATCHLIST:
      const isWatchlisted = state.watchlist.includes(action.payload);
      return {
        ...state,
        watchlist: isWatchlisted
          ? state.watchlist.filter((id) => id !== action.payload)
          : [...state.watchlist, action.payload],
      };
    default:
      return state;
  }
};

export default moviesReducer;
