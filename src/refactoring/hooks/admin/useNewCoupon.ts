import { ChangeEvent, useState } from "react";
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

  const handleUpdateCoupon = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    updateCoupon({ ...newCoupon, [name]: value });
  };

  return {
    newCoupon,
    handleAddCoupon,
    handleUpdateCoupon,
  };
};
