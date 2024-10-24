import { ReactNode, createContext, useContext, useState } from "react";
import { initialCoupons } from "../data";
import { Coupon } from "../../types";

interface CouponsContextType {
  coupons: Coupon[];
  addCoupon: (newCoupon: Coupon) => void;
}

const CONTEXT_ERROR_MESSAGE =
  "useCouponsContext는 CouponsProvider 내부에서 사용해야 합니다.";

const CouponsContext = createContext<CouponsContextType | null>(null);

export const useCouponsContext = () => {
  const context = useContext(CouponsContext);
  if (!context) {
    throw new Error(CONTEXT_ERROR_MESSAGE);
  }

  return context;
};

export const CouponsProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return (
    <CouponsContext.Provider value={{ coupons, addCoupon }}>
      {children}
    </CouponsContext.Provider>
  );
};
