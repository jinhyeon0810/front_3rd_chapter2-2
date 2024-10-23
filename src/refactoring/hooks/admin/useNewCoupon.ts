import { useState } from "react";
import { Coupon } from "../../../types";

const initCouponState: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

//신규 쿠폰 추가
export const useNewCoupon = (onCouponAdd: (coupon: Coupon) => void) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(initCouponState);

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon(initCouponState);
  };

  const updateCoupon = (newCoupon: Coupon) => {
    setNewCoupon(newCoupon);
  };

  return {
    newCoupon,
    updateCoupon,
    handleAddCoupon,
  };
};
