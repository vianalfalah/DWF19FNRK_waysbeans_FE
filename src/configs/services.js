import { API, setAuthToken } from "../configs/api";

// for image and static file
export const baseURL = "https://dw19fnrk-waysbeans-api.herokuapp.com/uploads/";

export const login = async (dispatch, body, seterrLogin) => {
  try {
    const response = await API.post("/login", body);
    await setAuthToken(response.data.data.token);
    localStorage.setItem("token", response.data.data.token);

    const getProfile = await API.get("/my-profile");
    localStorage.setItem("profile", JSON.stringify(getProfile.data.data));
    dispatch({
      type: "LOGIN",
      payload: { ...getProfile.data.data },
    });
  } catch (error) {
    seterrLogin(true);
    console.log(error);
  }
};

export const register = async (dispatch, body, seterrRegis) => {
  try {
    console.log(body);
    const response = await API.post("/register", body);
    console.log(response.data.data.token);
    setAuthToken(response.data.data.token);
    localStorage.setItem("token", response.data.data.token);
    const getProfile = await API.get("/my-profile");
    localStorage.setItem("profile", JSON.stringify(getProfile.data.data));

    dispatch({
      type: "LOGIN",
      payload: { ...getProfile.data.data.profile },
    });
    window.location.href = "/";
  } catch (error) {
    seterrRegis(true);
    console.log(error);
  }
};

export const loadedService = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    setAuthToken(token);
    const getProfile = await API.get("/my-profile");
    dispatch({
      type: "LOADED",
      payload: { ...getProfile.data.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutService = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  localStorage.removeItem("cart");
  setAuthToken();
  dispatch({
    type: "LOGOUT",
  });
};

export const getProducts = async (cbSuccess) => {
  try {
    const products = await API.get("/products");
    // return products.data.data.products;
    cbSuccess(products.data.data.products);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProductById = async (id) => {
  try {
    const product = await API.get(`/product/${id}`);
    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addProductService = (data, cb) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.post("/product", data, config)
    .then(() => cb())
    .catch((error) => console.error(error));
};

export const getTransactions = async (cbSuccess) => {
  try {
    const transactions = await API.get("/transactions");
    console.log(transactions.data.data.transactions);
    cbSuccess(transactions.data.data.transactions);
  } catch (error) {
    console.log(error);
  }
};
export const editStatusTransaction = (id, status) => {
  API.patch(`transaction/${id}`, status)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const addTransaction = (data, cbSuccess) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.post("/transaction", data, config)
    .then(() => cbSuccess())
    .catch((err) => console.log(err));
};

export const getMyTransactions = (setTransactions) => {
  console.log("JALAN");
  API.get("/my-transactions")
    .then((res) => {
      console.log(res);
      setTransactions(res.data.data.transactions);
      return res.data.data.transactions;
    })
    .catch((err) => console.log(err));
};
