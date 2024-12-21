export const isJsonString = (data) => {
  try {
      JSON.parse(data);
      return true; // Nếu JSON.parse thành công thì trả về true
  } catch (error) {
      return false; // Nếu lỗi thì trả về false
  }
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Đọc file và chuyển sang base64
      reader.onload = () => resolve(reader.result); // Nếu thành công, trả về kết quả
      reader.onerror = (error) => reject(error); // Nếu lỗi, trả về lỗi
  });

export function getItem(label, key, icon, children, type) {
  return {
      key,
      icon,
      children,
      label,
      type,
  };
}
export const renderOptions = (arr) => {
  let results = [];
  if (arr) {
    results = arr.map((opt) => {
      return {
        value: opt,
        label: opt,
      };
    });
  }
  results.push({
    label: 'Thêm type',
    value: 'add_type',
  });
  return results;
};

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(',', '.');
    return `${result} VND`;
  } catch (error) {
    return null;
  }
};
