"use client";
import { CartProvider } from "./CartProvider";
import ImageView from "./popup/ImageView";
import EmbedPopup from "./popup/EmbedPopup";

export default function ClientWrapper({ children }) {
  return (
    <CartProvider>
      <ImageView />
      <EmbedPopup />
      {children}
    </CartProvider>
  );
}
