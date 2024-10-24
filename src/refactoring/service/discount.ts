import { CartItem, Discount } from "../../types";

//갯수에 따른 할인
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  const appliedDiscounts: Discount[] = discounts.filter(
    (discount) => quantity >= discount.quantity
  );

  const appliedDiscountRate: number = getMaxDiscount(appliedDiscounts);

  return appliedDiscountRate;
};

//할인율 계산
export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};
