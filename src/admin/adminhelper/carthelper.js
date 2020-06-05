export const addProductToCart = (item, next) => {
  let cart = [];
  if (typeof window != undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      console.log("dsghgshsdghsdgjhdsghjasghdgghdasggdhgdsjh")
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const emptyCart = (next) => {
  
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", cart);
    next()
  }
};

export const removeProduct = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      
      cart = JSON.parse(localStorage.getItem("cart"));
    }
  }
  // eslint-disable-next-line array-callback-return
  cart.map((product, i) => {
    if (product._id === productId) {
      cart.splice(i, 1);
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
};
