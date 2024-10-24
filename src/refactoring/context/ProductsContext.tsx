import { ReactNode, createContext, useContext, useState } from "react";
import { initialProducts } from "../data";
import { Product } from "../../types";

interface ProductsContextType {
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
}

const CONTEXT_ERROR_MESSAGE =
  "useProductsContext는 ProductsProvider 내부에서 사용해야 합니다.";

const ProductsContext = createContext<ProductsContextType | null>(null);

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(CONTEXT_ERROR_MESSAGE);
  }

  return context;
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <ProductsContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
