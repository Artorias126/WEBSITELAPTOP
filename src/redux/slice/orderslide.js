import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  shippingAddress: {}, // Chỉ cần khai báo một lần
  paymentMethod: '', // Đặt giá trị mặc định cho paymentMethod
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: null, // Giả sử user là một đối tượng hoặc null nếu chưa đăng nhập
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
      addOrderProduct: (state, action) => {
        const { orderItem } = action.payload;  // Đã sửa dấu ngoặc đơn không khớp
        const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
        if (itemOrder) {
          itemOrder.amount += orderItem?.amount; // Đã sửa lỗi cú pháp khi thay đổi giá trị amount
        } else {
          state.orderItems.push(orderItem);
        }
      },
      increaseAmount: (state, action) => {
        const { idProduct } = action.payload; // Đóng đúng ngoặc
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
        if (itemOrder) {
          itemOrder.amount++;
        }
      },
      
      decreaseAmount: (state, action) => {
        const { idProduct } = action.payload; // Đóng đúng ngoặc
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
        if (itemOrder) {
          itemOrder.amount--;
        }
      },
      removeOrderProduct: (state, action) => {
        const { idProduct } = action.payload;
        const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
        state.orderItems = itemOrder
      },
      removeAllOrderProduct: (state, action) => {
        const { listChecked } = action.payload;
        const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
        state.orderItems = itemOrders;
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { addOrderProduct, removeOrderProduct,increaseAmount,decreaseAmount,removeAllOrderProduct } = orderSlide.actions;
  
  export default orderSlide.reducer;
