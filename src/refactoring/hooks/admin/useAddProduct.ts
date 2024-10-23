import { useState } from "react";
import { Product } from "../../../types";

const initProductState = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};
export const useAddProduct = (onProductAdd: (product: Product) => void) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] =
    useState<Omit<Product, "id">>(initProductState);

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct(initProductState);
    setShowNewProductForm(false);
  };

  return {
    showNewProductForm,
    setShowNewProductForm,
    newProduct,
    setNewProduct,
    handleAddNewProduct,
  };
};
