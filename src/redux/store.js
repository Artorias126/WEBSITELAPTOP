import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer  from './slice/userSlide';
import productReducer from './slice/productSlide1'; 
import orderReducer from './slice/orderslide';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['product','user']
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Có thể cấu hình thêm nếu cần
      },
    }),
  // Thêm các actions cần bỏ qua khi persist
  ignoredActions: ['FLUSH', 'REHYDRATE', 'PAUSE', 'PERSIST', 'PURGE', 'REGISTER'],
});

export let persistor = persistStore(store);