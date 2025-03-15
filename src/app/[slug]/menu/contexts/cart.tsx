"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  totalQuantity: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decrementProductQuantity: (productid: string) => void;
  increaseProductQuantity: (productid: string) => void;
  removeProduct: (productid: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  totalQuantity: 0,
  toggleCart: () => {},
  addProduct: () => {},
  decrementProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };
  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id
    );
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };
  const decrementProductQuantity = (productid: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productid) {
          return prevProduct;
        }
        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };
  const increaseProductQuantity = (productid: string) => {
    setProducts((prevProduct) => {
      return prevProduct.map((prevProduct) => {
        if (prevProduct.id !== productid) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  const removeProduct = (productid: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productid)
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decrementProductQuantity,
        increaseProductQuantity,
        removeProduct,
        total,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
