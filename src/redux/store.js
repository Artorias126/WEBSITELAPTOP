import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice'; // Đảm bảo đường dẫn đúng
import useReducer  from './slice/userSlide';
const store = configureStore({
  reducer: {
    user: useReducer,
    counter: counterReducer, // Kết hợp reducer cho counter
  },
});

export default store;  // Export mặc định