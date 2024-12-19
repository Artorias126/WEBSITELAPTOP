import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice'; // Đảm bảo đường dẫn đúng
import useReducer  from './slice/userSlide';
import productReducer from './slice/productSlide1'; 
const store = configureStore({
  reducer: {
    user: useReducer,
    counter: counterReducer, // Kết hợp reducer cho counter
    product: productReducer
  },
});

export default store;  // Export mặc định