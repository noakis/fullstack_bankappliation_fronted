import axios from "../axios";

export const editProfile = async (data) => {
  try {
    const { data: res } = await axios.put(`/auth/me`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
