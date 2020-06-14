export const addProductToCart = (cartProducts, cartProductToAdd) => {
  const exisitngProduct = cartProducts.find(
    (product) => product.id === cartProductToAdd.id
  );

  if (exisitngProduct) {
    return cartProducts.map((product) =>
      product.id === cartProductToAdd.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [...cartProducts, { ...cartProductToAdd, quantity: 1 }];
};

export const removeProductFromCart = (cartProducts, cartProductToDecrease) => {
  const exisitngProduct = cartProducts.find(
    (product) => product.id === cartProductToDecrease.id
  );

  if (exisitngProduct.quantity === 1) {
    return cartProducts.filter(
      (product) => product.id !== cartProductToDecrease.id
    );
  }

  return cartProducts.map((product) =>
    product.id === cartProductToDecrease.id
      ? { ...product, quantity: product.quantity - 1 }
      : product
  );
};
