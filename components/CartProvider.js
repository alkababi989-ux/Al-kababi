"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("ak-cart");
        return raw ? JSON.parse(raw) : [];
      }
    } catch {}
    return [];
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    // keep storage in sync if multiple tabs
    const onStorage = (e) => {
      if (e.key === "ak-cart" && e.newValue) {
        try { setItems(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ak-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (product, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          slug: product.slug,
          imageUrl: product.imageUrl,
          unitPrice: Number(product.price),
          quantity,
        },
      ];
    });
  };

  const remove = (productId) => setItems((prev) => prev.filter((i) => i.productId !== productId));
  const increment = (productId, by = 1) =>
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + by } : i)));
  const decrement = (productId, by = 1) =>
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, i.quantity - by) } : i)));
  const clear = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.unitPrice * i.quantity, 0), [items]);

  const value = useMemo(() => ({ items, add, remove, clear, subtotal, increment, decrement, hydrated }), [items, hydrated]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    // Graceful fallback to avoid runtime crashes if provider isn't mounted yet
    return {
      items: [],
      add: () => {},
      remove: () => {},
      clear: () => {},
      subtotal: 0,
      increment: () => {},
      decrement: () => {},
      hydrated: false,
    };
  }
  return ctx;
}


