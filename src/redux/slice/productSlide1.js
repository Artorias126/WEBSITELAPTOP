import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '', // Khởi tạo giá trị search
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload // Gán giá trị payload vào state.search
    },
  },
})

// Action creators are generated for each case reducer
export const { searchProduct } = productSlice.actions

export default productSlice.reducer
