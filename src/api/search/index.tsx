import instance from "../axios";

export const searchApi = async (text: string) => {
  const res = await instance.get(`/sick?q=${text}`);
  if (res.status !== 200) {
    throw new Error(res.data);
  }
  return res.data;
};
