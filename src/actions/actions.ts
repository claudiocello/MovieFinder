export const toggleFavorite = (movieId: number) => ({
  type: "TOGGLE_FAVORITE",
  payload: movieId,
});

export const toggleWatchlist = (movieId: number) => ({
  type: "TOGGLE_WATCHLIST",
  payload: movieId,
});

export const setGuestSessionId = (sessionId: string, createdAt: number) => ({
  type: "SET_GUEST_SESSION_ID",
  payload: { sessionId, createdAt: createdAt || new Date().getTime() },
});
