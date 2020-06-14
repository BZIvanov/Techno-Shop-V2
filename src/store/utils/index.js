export const addProductToCart = (cartProducts, cartProductToAdd) => {
  const exisitngProduct = cartProducts.find(
    (product) => product.id === cartProductToAdd.id
  );
  console.log('exist', exisitngProduct);
  if (exisitngProduct) {
    return cartProducts.map((product) =>
      product.id === cartProductToAdd.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [...cartProducts, { ...cartProductToAdd, quantity: 1 }];
};
