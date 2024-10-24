import { useState } from "react";
import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import Header from "./components/common/Header.tsx";
import { ProductsProvider } from "./context/ProductsContext.tsx";
import { CouponsProvider } from "./context/CouponsContext.tsx";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ProductsProvider>
      <CouponsProvider>
        <div className="min-h-screen bg-gray-100">
          <Header
            title={isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
            onClick={() => setIsAdmin(!isAdmin)}
          />

          <main className="container mx-auto mt-6">
            {isAdmin ? <AdminPage /> : <CartPage />}
          </main>
        </div>
      </CouponsProvider>
    </ProductsProvider>
  );
};

export default App;
