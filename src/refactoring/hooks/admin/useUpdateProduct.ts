import { useState } from "react";
import { Discount, Product } from "../../../types";
import { formatProductEditingValue } from "../../service/product";
import { findProductById } from "../../service/admin";

export const useUpdateProduct = (
  products: Product[],
  onProductUpdate: (updatedProduct: Product) => void
) => {
  //-------------상품 정보 수정-------------
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  //수정 버튼 클릭
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  //유저 입력 시 수정 반영
  const handleEditingProduct = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    if (!editingProduct || editingProduct.id !== productId) return;
    const { name, value } = event.target;
    const updatedProduct = {
      ...editingProduct,
      [name]: formatProductEditingValue(name, value),
    };
    setEditingProduct(updatedProduct);
  };

  //수정 완료 버튼 클릭
  const handleEditComplete = () => {
    if (!editingProduct) return;
    onProductUpdate(editingProduct);
    setEditingProduct(null);
  };

  //-------------할인 정보 수정(추가/삭제)-------------
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = findProductById(products, productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (
    products: Product[],
    productId: string,
    index: number
  ) => {
    const updatedProduct = findProductById(products, productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return {
    editingProduct,
    handleEditProduct,
    handleEditingProduct,
    handleEditComplete,

    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  };
};
