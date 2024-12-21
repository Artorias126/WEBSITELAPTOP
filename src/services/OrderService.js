import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
  
    console.log("Response data in createOrder:", res.data); // Kiểm tra dữ liệu trả về
  
    return res.data; // Đảm bảo trả về đúng dữ liệu
  };
  