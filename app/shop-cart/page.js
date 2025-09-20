"use client";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const { items: cartItems, increment, decrement, remove, subtotal, hydrated, clear, add } = useCart();
  
  // Debug: Log the current state (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log("Cart page render - hydrated:", hydrated, "items count:", cartItems.length, "items:", cartItems);
  }
  
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  // Available promo codes
  const promoCodes = {
    "SAVE10": { discount: 0.10, message: "10% discount applied!" },
    "WELCOME20": { discount: 0.20, message: "20% welcome discount applied!" },
    "FAMILY15": { discount: 0.15, message: "15% family discount applied!" },
  };

  const handlePromoCode = (e) => {
    e.preventDefault();
    const code = promoCode.toUpperCase().trim();
    
    if (promoCodes[code]) {
      setPromoDiscount(promoCodes[code].discount);
      setPromoMessage(promoCodes[code].message);
    } else {
      setPromoDiscount(0);
      setPromoMessage("Invalid promo code");
    }
  };

  const handleUpdateCart = async () => {
    setIsUpdating(true);
    // Simulate API call to update cart
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdating(false);
    setPromoMessage("Cart updated successfully!");
  };

  const discountAmount = subtotal * promoDiscount;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = cartItems.length > 0 ? 10 : 0;
  const finalTotal = discountedSubtotal + shipping;
  return (
    <FoodKingLayout>
      <PageBanner pageName={`Shopping Cart ${cartItems.length > 0 ? `(${cartItems.length} item${cartItems.length !== 1 ? 's' : ''})` : ''}`} />
      <section className="cart-section section-padding fix">
        <div className="container">
          <div className="main-cart-wrapper">
            <div className="row">
              <div className="col-12">
                <div className="cart-wrapper">
                  <div className="cart-items-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!hydrated && (
                          <tr className="cart-item"><td colSpan={5}>Loading...</td></tr>
                        )}
                        {hydrated && cartItems.length === 0 && (
                          <tr className="cart-item">
                            <td colSpan={5} style={{textAlign: 'center', padding: '40px'}}>
                              <div>
                                <i className="fas fa-shopping-cart" style={{fontSize: '48px', color: '#ccc', marginBottom: '20px'}}></i>
                                <h4>Your cart is empty</h4>
                                <p style={{color: '#666', marginBottom: '20px'}}>Add some delicious items to get started!</p>
                                <Link href="/shop-left-sidebar" className="theme-btn">
                                  Continue Shopping
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )}
                        {hydrated && cartItems.map((item) => (
                          <tr key={item.productId} className="cart-item">
                            <td className="cart-item-info">
                              <img src={item.imageUrl || "assets/img/food/burger-2.png"} alt={item.name} />
                              <span>{item.name}</span>
                            </td>
                            <td className="cart-item-price">
                              ${" "}
                              <span className="base-price">
                                {Number(item.unitPrice).toFixed(2)}
                              </span>
                            </td>
                            <td>
                              <div className="cart-item-quantity">
                                <span className="cart-item-quantity-amount">
                                  {item.quantity}
                                </span>
                                <div className="cart-item-quantity-controller">
                                  <button className="cart-increment" onClick={() => increment(item.productId)}>
                                    <i className="far fa-caret-up" />
                                  </button>
                                  <button className="cart-decrement" onClick={() => decrement(item.productId)}>
                                    <i className="far fa-caret-down" />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="cart-item-price">
                              ${" "}
                              <span className="total-price">
                                {(Number(item.unitPrice) * item.quantity).toFixed(2)}
                              </span>
                            </td>
                            <td className="cart-item-remove">
                              <button onClick={() => remove(item.productId)}>
                                <i className="fas fa-times" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart-wrapper-footer">
                    <form onSubmit={handlePromoCode}>
                      <input
                        type="text"
                        name="promo-code"
                        id="promoCode"
                        placeholder="Enter promo code (SAVE10, WELCOME20, FAMILY15)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="theme-btn border-radius-none"
                      >
                        Apply Code
                      </button>
                    </form>
                    {promoMessage && (
                      <div style={{
                        marginTop: '10px', 
                        padding: '10px', 
                        borderRadius: '4px',
                        backgroundColor: promoMessage.includes('Invalid') ? '#ffebee' : '#e8f5e8',
                        color: promoMessage.includes('Invalid') ? '#c62828' : '#2e7d32',
                        fontSize: '14px'
                      }}>
                        {promoMessage}
                      </div>
                    )}
                    <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                      <button
                        onClick={handleUpdateCart}
                        disabled={isUpdating}
                        className="theme-btn border-radius-none"
                        style={{opacity: isUpdating ? 0.7 : 1}}
                      >
                        {isUpdating ? 'Updating...' : 'Update Cart'}
                      </button>
                      <Link
                        href="/shop-left-sidebar"
                        className="theme-btn border-radius-none"
                        style={{backgroundColor: '#6c757d'}}
                      >
                        Continue Shopping
                      </Link>
                      {cartItems.length > 0 && (
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to clear your cart?')) {
                              clear();
                              setPromoDiscount(0);
                              setPromoMessage('Cart cleared successfully!');
                            }
                          }}
                          className="theme-btn border-radius-none"
                          style={{backgroundColor: '#dc3545'}}
                        >
                          Clear Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6" />
              <div className="col-xl-6">
                <div className="cart-pragh-box">
                  <div className="cart-graph">
                    <h4>Cart Total</h4>
                    <ul>
                      <li>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </li>
                      {promoDiscount > 0 && (
                        <li style={{color: '#28a745'}}>
                          <span>Discount ({(promoDiscount * 100)}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </li>
                      )}
                      <li>
                        <span>Shipping</span>
                        <span>
                          ${shipping.toFixed(2)}
                        </span>
                      </li>
                      <li style={{borderTop: '2px solid #ddd', paddingTop: '10px', fontWeight: 'bold', fontSize: '18px'}}>
                        <span>Total</span>
                        <span>
                          ${finalTotal.toFixed(2)}
                        </span>
                      </li>
                    </ul>
                    <div className="chck">
                      {cartItems.length > 0 ? (
                        <Link
                          href="/checkout"
                          className="theme-btn border-radius-none"
                        >
                          Proceed to Checkout (${finalTotal.toFixed(2)})
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="theme-btn border-radius-none"
                          style={{opacity: 0.5, cursor: 'not-allowed'}}
                        >
                          Cart is Empty
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </FoodKingLayout>
  );
};
export default page;
