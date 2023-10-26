import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Définition de l'état initial
const initialState = {
  token: null,
};

// Configuration de Redux-Persist pour la sauvegarde locale
const persistConfig = {
  key: 'root',
  storage,
};

// Création du réducteur persistant
const persistedReducer = persistReducer(persistConfig, reducer);

// on crée le store
export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);

// Les actions creators
// sauvegarder le token
export const saveToken = (token) => ({ type: "saveToken", payload: token });

// redémarrer le jeu
export const destroyToken = () => ({ type: "destroyToken" });

// le reducer contient la logique
// c'est une fonction qui reçoit le state et une action
function reducer(state = initialState, action) {
  if (action.type === "saveToken") {
    // on retourne le state avec le token sauvegardé dans action.payload
    return { ...state, token: action.payload };
  }
  if (action.type === "destroyToken") {
    return { ...state, token: null };
  }
  return initialState;
}