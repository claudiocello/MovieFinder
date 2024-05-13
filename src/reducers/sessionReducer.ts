export const SET_GUEST_SESSION_ID = "SET_GUEST_SESSION_ID";

interface SetGuestSessionAction {
  type: typeof SET_GUEST_SESSION_ID;
  payload: string;
}

type SessionActionTypes = SetGuestSessionAction;

const initialState = {
  guestSessionId: null,
  createdAt: null,
};

const sessionReducer = (state = initialState, action: SessionActionTypes) => {
  switch (action.type) {
    case SET_GUEST_SESSION_ID:
      return {
        ...state,
        guestSessionId: action.payload,
        createdAt: action.payload.createdAt,
      };
    default:
      return state;
  }
};

export default sessionReducer;
