// context/ProductContext.tsx

import React, { createContext, useContext } from "react";
import { ProductFormData } from "../componets/form/ProductForm";
import { useAddProductMutation } from "../reducers/productsApi";

interface ProductContextType {
  addProduct: (product: ProductFormData) => Promise<void>;
  logData: (data: ProductFormData) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [addProduct] = useAddProductMutation();

  const addProductHandler = async (product: ProductFormData) => {
    const { image1, image2, image3, ...filteredData } = product;
    console.log(image1, image2, image3);

    await addProduct(filteredData).unwrap();
  };

  const logData = (data: ProductFormData) => {
    // Excluir los campos image1, image2, image3
    const { image1, image2, image3, ...filteredData } = data;

    console.log("Data agregada...", filteredData, image1, image2, image3);
  };

  return (
    <ProductContext.Provider value={{ addProduct: addProductHandler, logData }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
};

export default useProductContext;
