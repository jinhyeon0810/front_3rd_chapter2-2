import { Product } from "../../types";

export const findProductById = (products: Product[], productId: string) => {
  return products.find((p) => p.id === productId);
};
