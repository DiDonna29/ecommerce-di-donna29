export function validateUser(user: any): boolean {
  const validateUser =
    user.id !== undefined &&
    user.name !== undefined &&
    user.email !== undefined &&
    user.password !== undefined &&
    user.address !== undefined &&
    user.phone !== undefined;

  return validateUser;
}

export function validateProduct(product: any): boolean {
  const validateProduct =
    product.id !== undefined &&
    product.name !== undefined &&
    product.price !== undefined &&
    product.description !== undefined &&
    product.imgUrl !== undefined &&
    product.stock !== undefined;

  return validateProduct;
}
