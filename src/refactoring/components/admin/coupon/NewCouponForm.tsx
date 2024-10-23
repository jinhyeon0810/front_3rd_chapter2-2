import { Coupon } from "../../../../types";
import { useNewCoupon } from "../../../hooks/admin/useNewCoupon";

interface CouponManageFormProps {
  onCouponAdd: (coupon: Coupon) => void;
}

const NewCouponForm = ({ onCouponAdd }: CouponManageFormProps) => {
  const { newCoupon, handleAddCoupon, handleUpdateCoupon } =
    useNewCoupon(onCouponAdd);

  const { name, code, discountType, discountValue } = newCoupon;

  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={name}
        onChange={handleUpdateCoupon}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={code}
        onChange={handleUpdateCoupon}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          value={discountType}
          onChange={handleUpdateCoupon}
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          placeholder="할인 값"
          value={discountValue}
          onChange={handleUpdateCoupon}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleAddCoupon}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};

export default NewCouponForm;
