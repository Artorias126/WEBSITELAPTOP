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

export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error; // Ném lỗi ra để mutation xử lý
  }
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};



