import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { MMKV } from 'react-native-mmkv'
import { persistReducer, persistStore } from 'redux-persist'
import { Storage } from 'redux-persist'

const storage = new MMKV()

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve()
  },
}

const persistConfig = {
  key: 'root',
  storage:reduxStorage,
};
const rootReducer = combineReducers({
  user: userReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // MMKV storage might not be serializable
    }),
})

const persistor = persistStore(store);
export { store, persistor, storage };


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch