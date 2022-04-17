import React, { useMemo, useState } from "react";
import { Product, ProductCart } from "../types";

type ContextType = [
  {
    cart: Map<Product["id"], ProductCart>;
    isOnCart: (pid: string) => boolean;
    totalPrice: string;
  },
  {
    addToCart: (product: Product) => void;
    increment: (pid: string) => void;
    decrement: (pid: string) => void;
  }
];

export const CartContext = React.createContext([] as unknown as ContextType);

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState(() => new Map<Product["id"], ProductCart>());

  const isOnCart = (id: Product["id"]) => cart.has(id);

  const increment = (pid: Product["id"]) => {
    let draft = new Map(cart);
    let product = draft.get(pid) as ProductCart;

    draft.set(pid, {
      ...product,
      quantity: product.quantity + 1,
    });

    setCart(draft);
  };

  const decrement = (pid: Product["id"]) => {
    let draft = new Map(cart);
    let product = draft.get(pid) as ProductCart;
    if (product.quantity > 1) {
      draft.set(pid, {
        ...product,
        quantity: product.quantity - 1,
      });
    } else {
      draft.delete(pid);
    }

    setCart(draft);
  };

  const addToCart = (product: Product) => {
    let draft = new Map(cart);
    draft.set(product.id, {
      ...product,
      quantity: 1,
    });
    setCart(draft);
  };

  const totalPrice = useMemo(() => {
    let prices = Array.from(cart.values());
    let { total } = prices.reduce(
      (acc, cur) => ({
        total: acc.total + cur.price * cur.quantity,
      }),
      { total: 0 }
    );
    return Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(total);
  }, [cart]);

  const values = {
    cart,
    totalPrice,
    isOnCart,
  };

  const actions = {
    addToCart,
    increment,
    decrement,
  };

  return (
    <CartContext.Provider value={[values, actions]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
