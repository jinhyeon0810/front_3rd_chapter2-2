import { useState } from "react";
import { Coupon } from "../../../types";

const initCouponState: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

//신규 쿠폰 추가
export const useNewCoupon = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(initCouponState);

  const updateCoupon = (newCoupon: Coupon) => {
    setNewCoupon(newCoupon);
  };

  const initCoupon = () => {
    setNewCoupon(initCouponState);
  };

  return {
    newCoupon,
    updateCoupon,
    initCoupon,
  };
};
