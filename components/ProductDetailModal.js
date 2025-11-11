"use client";
import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const { add } = useCart();

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    add(product, 1);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="product-modal-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 9998,
          animation: "fadeIn 0.3s ease-in-out",
        }}
      />

      {/* Modal */}
      <div
        className="product-modal-wrapper"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          className="product-modal-content"
          style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            maxWidth: "900px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="modal-close-btn"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#333",
              zIndex: 10,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#bf1e2e";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#333";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ×
          </button>

          <div className="row g-0">
            {/* Image Section */}
            <div className="col-lg-6">
              <div
                className="product-modal-image"
                style={{
                  position: "relative",
                  height: "100%",
                  minHeight: "400px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "20px 0 0 20px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.imageUrl || "assets/img/food/burger-2.png"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    animation: "zoomIn 0.5s ease-out",
                  }}
                />
                {product.category && (
                  <div
                    className="product-category-badge"
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      backgroundColor: "#bf1e2e",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "25px",
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      boxShadow: "0 4px 12px rgba(191, 30, 46, 0.3)",
                    }}
                  >
                    {product.category}
                  </div>
                )}
                {product.isHalal && (
                  <div
                    className="halal-badge"
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "25px",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                    }}
                  >
                    ✓ Halal
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="col-lg-6">
              <div
                className="product-modal-details"
                style={{
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Product Name */}
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "15px",
                    lineHeight: "1.3",
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  {product.name}
                </h2>

                {/* Rating */}
                <div
                  className="product-rating"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginBottom: "20px",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="fas fa-star"
                      style={{
                        color: star <= 4 ? "#ffc107" : "#e0e0e0",
                        fontSize: "16px",
                      }}
                    />
                  ))}
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    ({product.ratingCount || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div
                  className="product-price"
                  style={{
                    marginBottom: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "42px",
                      fontWeight: "700",
                      color: "#bf1e2e",
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  >
                    ${Number(product.price).toFixed(2)}
                  </span>
                  {product.salePrice && (
                    <span
                      style={{
                        fontSize: "24px",
                        color: "#999",
                        textDecoration: "line-through",
                        marginLeft: "15px",
                      }}
                    >
                      ${Number(product.salePrice).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div
                    className="product-description"
                    style={{
                      marginBottom: "30px",
                      paddingBottom: "30px",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        marginBottom: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Description
                    </h5>
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.8",
                        color: "#555",
                        margin: 0,
                      }}
                    >
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Product Info */}
                <div
                  className="product-info-list"
                  style={{
                    marginBottom: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {product.prepTimeMinutes && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <i
                        className="far fa-clock"
                        style={{ color: "#bf1e2e", fontSize: "18px" }}
                      />
                      <span style={{ color: "#666", fontSize: "15px" }}>
                        Prep Time: <strong>{product.prepTimeMinutes} mins</strong>
                      </span>
                    </div>
                  )}
                  {product.available !== undefined && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <i
                        className={`far fa-${product.available ? "check-circle" : "times-circle"}`}
                        style={{
                          color: product.available ? "#28a745" : "#dc3545",
                          fontSize: "18px",
                        }}
                      />
                      <span style={{ color: "#666", fontSize: "15px" }}>
                        {product.available ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  )}
                  {product.isVegetarian && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <i
                        className="far fa-leaf"
                        style={{ color: "#28a745", fontSize: "18px" }}
                      />
                      <span style={{ color: "#666", fontSize: "15px" }}>
                        Vegetarian
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div
                  className="product-actions"
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  <button
                    onClick={handleAddToCart}
                    className="theme-btn"
                    style={{
                      flex: 1,
                      padding: "16px 32px",
                      fontSize: "16px",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <i className="far fa-shopping-basket" />
                    Add to Cart
                  </button>
                  <button
                    onClick={onClose}
                    style={{
                      padding: "16px 32px",
                      fontSize: "16px",
                      fontWeight: "600",
                      border: "2px solid #e0e0e0",
                      borderRadius: "50px",
                      backgroundColor: "transparent",
                      color: "#666",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#bf1e2e";
                      e.currentTarget.style.color = "#bf1e2e";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e0e0e0";
                      e.currentTarget.style.color = "#666";
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes zoomIn {
            from {
              transform: scale(1.1);
            }
            to {
              transform: scale(1);
            }
          }

          .product-modal-content::-webkit-scrollbar {
            width: 8px;
          }

          .product-modal-content::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .product-modal-content::-webkit-scrollbar-thumb {
            background: #bf1e2e;
            border-radius: 10px;
          }

          .product-modal-content::-webkit-scrollbar-thumb:hover {
            background: #a01826;
          }

          @media (max-width: 991px) {
            .product-modal-image {
              border-radius: 20px 20px 0 0 !important;
              min-height: 300px !important;
            }
            .product-modal-details {
              padding: 30px !important;
            }
          }

          @media (max-width: 576px) {
            .product-modal-details {
              padding: 20px !important;
            }
            .product-modal-details h2 {
              font-size: 24px !important;
            }
            .product-price span:first-child {
              font-size: 32px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

