import { CartItem, Coupon, Product } from "../../../types";
import { getTotalDiscountedPrice, getTotalPrice } from "../../service/cart";
import { getMaxApplicableDiscount } from "../../service/discount";

//상품 재고
export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

//장바구니 수량 최신화
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  const updatedCartItemQuantity = cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0
          ? { ...item, quantity: updatedQuantity }
          : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);

  return updatedCartItemQuantity;
};

//---------장바구니 가격/할인 계산----------------

//장바구니 갯수에 따른 총 할인적용 금액
export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;

  const discountRate = getMaxApplicableDiscount(item);
  const totalPrice = getTotalPrice(price, quantity);

  return getTotalDiscountedPrice(totalPrice, discountRate);
};

//쿠폰 할인 계산
export const calculateCouponDiscount = (
  totalBeforeDiscount: number,
  totalAfterDiscount: number,
  selectedCoupon: Coupon
) => {
  let updatedTotalAfterDiscount = totalAfterDiscount;
  if (selectedCoupon.discountType === "amount") {
    updatedTotalAfterDiscount = Math.max(
      0,
      updatedTotalAfterDiscount - selectedCoupon.discountValue
    );
  } else {
    updatedTotalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
  }
  return {
    updatedTotalAfterDiscount,
    updatedTotalDiscount: totalBeforeDiscount - updatedTotalAfterDiscount,
  };
};

//갯수할인 + 쿠폰할인 적용된 총금액
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;
  let totalDiscount = 0;

  //쿠폰 적용 전-----------------------
  //총 가격
  totalBeforeDiscount = cart.reduce((acc, item) => {
    const { price } = item.product;
    const { quantity } = item;
    return acc + getTotalPrice(price, quantity);
  }, 0);

  //갯수 할인 적용 가격
  totalAfterDiscount = cart.reduce((acc, item) => {
    return acc + calculateItemTotal(item);
  }, 0);

  //할인가격
  totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 쿠폰 적용------------------------
  if (selectedCoupon) {
    const { updatedTotalAfterDiscount, updatedTotalDiscount } =
      calculateCouponDiscount(
        totalBeforeDiscount,
        totalAfterDiscount,
        selectedCoupon
      );

    totalAfterDiscount = updatedTotalAfterDiscount;
    totalDiscount = updatedTotalDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};
