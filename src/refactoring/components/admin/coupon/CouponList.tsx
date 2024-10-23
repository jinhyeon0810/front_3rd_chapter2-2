import { Coupon } from "../../../../types";

interface CouponListProps {
  coupon: Coupon;
  index: number;
}

const CouponList = ({ coupon, index }: CouponListProps) => {
  const { name, discountType, discountValue, code } = coupon;
  return (
    <div
      key={index}
      data-testid={`coupon-${index + 1}`}
      className="bg-gray-100 p-2 rounded"
    >
      {name} ({code}):
      {discountType === "amount"
        ? `${discountValue}원`
        : `${discountValue}%`}{" "}
      할인
    </div>
  );
};

export default CouponList;
