import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  orderItemsSelected: [],
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
        const { idProduct } = action.payload;
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
        const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
        if (itemOrder) itemOrder.amount++;
        if (itemOrderSelected) itemOrderSelected.amount++;
      },
      
      decreaseAmount: (state, action) => {
        const { idProduct } = action.payload;
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
        const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
        if (itemOrder) itemOrder.amount--;
        if (itemOrderSelected) itemOrderSelected.amount--;
      },
      
      removeOrderProduct: (state, action) => {
        const { idProduct } = action.payload;
        const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
        const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct);
        state.orderItems = itemOrder;
        state.orderItemsSelected = itemOrderSelected;
      },
      removeAllOrderProduct: (state, action) => {
        const { listChecked } = action.payload;
        const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
        const itemOrdersSelected = state?.orderItemsSelected?.filter((item) => !listChecked.includes(item.product));
        state.orderItems = itemOrders;
        state.orderItemsSelected = itemOrdersSelected;
      },
      selectedOrder: (state, action) => {
        const { listChecked } = action.payload;
        const orderSelected = state.orderItems.filter((order) =>
          listChecked.includes(order.product)
        );
        
        state.orderItemsSelected = orderSelected;
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { addOrderProduct, removeOrderProduct,increaseAmount,decreaseAmount,removeAllOrderProduct,selectedOrder } = orderSlide.actions;
  
  export default orderSlide.reducer;
