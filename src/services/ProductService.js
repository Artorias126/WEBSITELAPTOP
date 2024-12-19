import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search) => {
  let res = {};
  const baseUrl = `${process.env.REACT_APP_API_URL}/product/get-all`;

  if (search?.length > 0) {
      const encodedSearch = encodeURIComponent(search); // Encode để đảm bảo an toàn ký tự đặc biệt
      res = await axios.get(`${baseUrl}?filter=name&filter=${encodedSearch}`);
  } else {
      res = await axios.get(baseUrl);
  }

  return res.data;
};

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
    return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`, 
    data, 
    { 
      headers: {
        token: `Bearer ${access_token}`  // Đảm bảo token là hợp lệ
      },
    }
  );
    return res.data;
}

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/delete-many`, data,
      {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
