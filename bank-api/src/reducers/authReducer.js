const initialState = {
  token: null,
};

export default function authReducer(state = initialState, action) {
  if (action.type === "saveToken") {
    return { ...state, token: action.payload };
  }
  if (action.type === "destroyToken") {
    return { ...state, token: null };
  }
  return state;
}