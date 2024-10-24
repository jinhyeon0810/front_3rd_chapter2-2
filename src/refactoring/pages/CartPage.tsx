import CartItemDetails from "../components/cart/CartItemDetails.tsx";
import CartSummary from "../components/cart/CartSummary.tsx";
import CouponApply from "../components/cart/CouponApply.tsx";
import ProductList from "../components/cart/product/ProductList.tsx";
import { useCouponsContext } from "../context/CouponsContext.tsx";
import { useProductsContext } from "../context/ProductsContext.tsx";
import { useCart } from "../hooks/index.ts";
import { getMaxApplicableDiscount } from "../service";
import { getRemainingStock } from "../hooks/utils/cartUtils.ts";

export const CartPage = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { products } = useProductsContext();
  const { coupons } = useCouponsContext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map((product) => {
              return (
                <ProductList
                  key={product.id}
                  product={product}
                  remainingStock={getRemainingStock(cart, product)}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((item) => {
              return (
                <CartItemDetails
                  key={item.product.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  appliedDiscount={getMaxApplicableDiscount(item)}
                />
              );
            })}
          </div>

          <CouponApply
            coupons={coupons}
            applyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
          />

          <CartSummary totalPrices={calculateTotal()} />
        </div>
      </div>
    </div>
  );
};
