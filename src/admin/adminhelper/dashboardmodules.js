import { API } from "../../backend";

// creating category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("SERVER ERROR!!!", err);
    });
};

// getting all categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER", err));
};

// updating categories
export const updateCategory = (userId, categoryId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER", err));
};

// deleting categories
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER ERROR", err));
};

// getting categories by id
export const getCategoryId = (catId) => {
  return fetch(`${API}/category/${catId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("SERVER ERROR", error);
    });
};

// create product

export const CreateProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER", err));
};

// update product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER", err));
};

// delete product

export const DeleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER", err));
};

// get product by id

export const getProductById = (productId) => {
  return fetch(`${API}/product/${productId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER", err));
};

// get all products
export const getProducts = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER", err));
};

// get product photo
export const getProductPhotoById = (productId) => {
  return fetch(`${API}/product/${productId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("SERVER", err));
};

export const createOrder = (userId, token, order) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({order:order}),
  })
    .then((response) => {
      
      return response.json();
    })
    .catch((error) => console.log("SERVER", error));
};

export const getAllOrder = (userId, token) => {
  return fetch(`${API}/order/all/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log("SERVER ERROR", error));
};

export const getOrderByUserId = (userId,token)=>{
  return fetch(`${API}/orders/user/${userId}`,{
    method:"GET",
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  .then(response=>{
    return response.json()
  })
  .catch(error=>{
    console.log("SERVER ERROR",error)
  })
}
