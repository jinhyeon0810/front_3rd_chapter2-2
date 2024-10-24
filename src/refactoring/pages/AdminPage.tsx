import ProductList from "../components/admin/product/ProductList";
import NewProductForm from "../components/admin/product/NewProductForm";
import NewCouponForm from "../components/admin/coupon/NewCouponForm";
import { useProductsContext } from "../context/ProductsContext";
import { useCouponsContext } from "../context/CouponsContext";
import CouponList from "../components/admin/coupon/CouponList";

export const AdminPage = () => {
  const { products, updateProduct, addProduct } = useProductsContext();
  const { coupons, addCoupon } = useCouponsContext();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <NewProductForm addProduct={addProduct} />

          <div className="space-y-2">
            {products.map((product, index) => (
              <ProductList
                key={product.id}
                products={products}
                product={product}
                index={index}
                updateProduct={updateProduct}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <NewCouponForm addCoupon={addCoupon} />

            <div>
              <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
              <div className="space-y-2">
                {coupons.map((coupon, index) => (
                  <CouponList coupon={coupon} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
