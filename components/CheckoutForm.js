"use client";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function CheckoutForm() {
  const { items, subtotal, clear, hydrated } = useCart();
  const [form, setForm] = useState({ customerName: "", customerPhone: "", customerEmail: "", customerNotes: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Minimal toast utility (bottom-right)
  function ensureToastContainer() {
    let c = document.getElementById("ak-toast-container");
    if (!c) {
      c = document.createElement("div");
      c.id = "ak-toast-container";
      c.style.position = "fixed";
      c.style.right = "20px";
      c.style.bottom = "20px";
      c.style.zIndex = "9999";
      c.style.display = "flex";
      c.style.flexDirection = "column";
      c.style.gap = "10px";
      document.body.appendChild(c);
    }
    return c;
  }

  function showToast(text, type = "success") {
    const container = ensureToastContainer();
    const toast = document.createElement("div");
    toast.textContent = text;
    toast.style.color = "#fff";
    toast.style.background = type === "success" ? "#16a34a" : "#dc2626"; // green / red
    toast.style.padding = "10px 14px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 6px 24px rgba(0,0,0,0.25)";
    toast.style.fontSize = "14px";
    toast.style.maxWidth = "300px";
    toast.style.wordBreak = "break-word";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "opacity .2s ease, transform .2s ease";
    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      setTimeout(() => toast.remove(), 200);
    }, 4000);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!hydrated) return;
    if (!form.customerName || !form.customerPhone || !items.length) {
      showToast("Please fill name, phone and add at least one item.", "error");
      return;
    }
    setLoading(true);
    try {
      const tax = 0;
      const total = subtotal + tax;
      const payload = {
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail || null,
        customerNotes: form.customerNotes || null,
        items: items.map((i) => ({
          productId: i.productId ?? null,
          productName: i.name,
          productSlug: i.slug ?? "",
          imageUrl: i.imageUrl ?? null,
          unitPrice: Number(i.unitPrice),
          quantity: Number(i.quantity || 1),
          addons: null,
          size: null,
          lineTotal: Number(i.unitPrice) * Number(i.quantity || 1),
        })),
        subtotal,
        tax,
        total,
        currency: "USD",
        paymentMethod: "CASH",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to place order");

      // Success: clear cart and form fields
      clear();
      setForm({ customerName: "", customerPhone: "", customerEmail: "", customerNotes: "" });
      showToast(`Order placed successfully! ID: ${data.orderNumber}`, "success");
    } catch (e) {
      showToast(e.message || "Failed to place order", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="input-single">
            <input type="email" name="customerEmail" id="customerEmail" placeholder="Your Email" value={form.customerEmail} onChange={onChange} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="input-single">
            <input type="text" name="customerPhone" id="customerPhone" required placeholder="Phone" value={form.customerPhone} onChange={onChange} />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="input-single">
            <input type="text" name="customerName" id="customerName" required placeholder="Full Name" value={form.customerName} onChange={onChange} />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="input-single">
            <textarea name="customerNotes" id="customerNotes" placeholder="Instruction Note (optional)" value={form.customerNotes} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="checkout-single checkout-single-bg mt-4">
        <h4>Payment Method</h4>
        <div className="checkout-single-form">
          <p className="payment mb-0">Cash on Delivery (COD)</p>
        </div>
        <div className="mt-4">
          <button type="submit" className="theme-btn border-radius-none" disabled={loading}>
            {loading ? "Placing..." : "Place Order (COD)"}
          </button>
        </div>
      </div>
    </form>
  );
}


