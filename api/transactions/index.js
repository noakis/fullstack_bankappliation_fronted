import axios from "../axios";

// get user transactions
export const getUserTransactions = async (page = 1) => {
  const { data } = await axios.get("/transactions/me?page=" + page, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data;
};

//get all transactions per account
export const getAccountTransactions = async (id, page = 1) => {
  try {
    const { data } = await axios.get(
      `/transactions/account/${id}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return data;
  } catch (err) {
    return err;
  }
};

// send transaction
export const sendTransaction = async (data) => {
  try {
    const { data: res } = await axios.post("/transactions/new", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (res.status === 400) throw new Error(res.message);
    return res;
  } catch (err) {
    return err;
  }
};
