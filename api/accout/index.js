import axios from "../axios";

export const getUserAccounts = async () => {
  const { data } = await axios.get("/accounts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.accounts;
};

export const openAccount = async (data) => {
  try {
    const { data: res } = await axios.post("/accounts", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const closeAccount = async (id) => {
  try {
    const { data } = await axios.delete(`/accounts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  } catch (err) {
    return err;
  }
};

export const getAccountInfo = async (id) => {
  try {
    const { data } = await axios.get(`/accounts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  } catch (err) {
    return err;
  }
};
