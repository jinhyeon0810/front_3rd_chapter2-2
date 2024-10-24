import { CartItem, Product } from "../../types";

//상품 재고
export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

//총 금액
export const getTotalPrice = (price: number, quantity: number) =>
  price * quantity;

//총 할인적용 금액
export const getTotalDiscountedPrice = (
  prevTotalPrice: number,
  discountRate: number
) => prevTotalPrice * (1 - discountRate);
