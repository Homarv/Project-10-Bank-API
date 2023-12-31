import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducers/authReducer';

const initialState = {
    token: null,
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);