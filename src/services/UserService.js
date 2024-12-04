import axios from "axios";

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error; // Ném lỗi ra để mutation xử lý
  }
};
