"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useSearchParams, useRouter } from "next/navigation";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function ProductGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { add } = useCart();

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const category = params.get("category") || undefined;
  const minPrice = params.get("minPrice") || undefined;
  const maxPrice = params.get("maxPrice") || undefined;

  const qs = useMemo(() => {
    const q = new URLSearchParams();
    q.set("take", "48");
    if (category) q.set("category", category);
    if (minPrice) q.set("minPrice", minPrice);
    if (maxPrice) q.set("maxPrice", maxPrice);
    return q.toString();
  }, [category, minPrice, maxPrice]);

  useEffect(() => {
    let ignore = false;
    async function run() {
      setLoading(true);
      try {
        // Only make API calls on the client side
        if (typeof window !== 'undefined') {
          const res = await fetch(`/api/products?${qs}`, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (!ignore) setItems(data.items || []);
          } else {
            console.error('Failed to fetch products:', res.status);
            // Try to get error details
            try {
              const errorData = await res.json();
              console.error('API Error details:', errorData);
            } catch {}
            if (!ignore) setItems([]);
          }
        } else {
          // Server-side: return empty array
          if (!ignore) setItems([]);
        }
      } catch (e) {
        console.warn('Error fetching products:', e);
        if (!ignore) setItems([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => {
      ignore = true;
    };
  }, [qs]);

  if (loading) {
    return <div className="row"><div className="col-12 text-center">Loading...</div></div>;
  }

  if (!items.length) {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <div className="alert alert-info">
            <h5>No products found</h5>
            <p>This could be due to:</p>
            <ul className="list-unstyled">
              <li>• Database connection issues</li>
              <li>• No products match your filters</li>
              <li>• Products are still loading</li>
            </ul>
            <small>Check the browser console for more details.</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {items.map((p) => (
          <div key={p.id} className="col-xl-4 col-lg-6 col-md-6">
            <div className="catagory-product-card-2 shadow-style text-center">
              <div className="icon">
                <Link href="/shop-cart">
                  <i className="far fa-heart" />
                </Link>
              </div>
              <div className="catagory-product-image">
                <img src={p.imageUrl || "assets/img/food/burger-2.png"} alt={p.name} />
              </div>
              <div className="catagory-product-content">
                <div className="catagory-button">
                  <button className="theme-btn-2" onClick={() => add(p, 1)}>
                    <i className="far fa-shopping-basket" />
                    Add To Cart
                  </button>
                </div>
                <div className="info-price d-flex align-items-center justify-content-center">
                  <h6>${Number(p.price).toFixed(2)}</h6>
                </div>
                <h4
                  onClick={() => openModal(p)}
                  style={{
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#bf1e2e";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                  }}
                >
                  {p.name}
                </h4>
                <div className="star">
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star color-bg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}


