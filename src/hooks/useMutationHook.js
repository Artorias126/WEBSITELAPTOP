import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: fnCallback, // Hàm callback dùng để thực hiện mutation
  });

  return mutation; // Trả về đối tượng mutation
};
