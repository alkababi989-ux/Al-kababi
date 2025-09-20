"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

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
            console.warn('Failed to fetch products:', res.status);
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
    return <div className="row"><div className="col-12 text-center">No products found.</div></div>;
  }

  return (
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
              <h4>
                <Link href={`/shop-single?slug=${p.slug}`}>{p.name}</Link>
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
  );
}


