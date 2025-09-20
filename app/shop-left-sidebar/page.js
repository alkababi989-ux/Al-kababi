import { Suspense } from "react";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import ProductSidebar from "@/components/ProductSidebar";
import ProductTopBar from "@/components/ProductTopBar";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import ProductGrid from "@/components/ProductGrid";

// Force this page to be dynamic (no static generation)
export const dynamic = 'force-dynamic';

const page = async () => {
  return (
    <FoodKingLayout>
      <PageBanner pageName={"Al-Kababi fOOD CATEGORIES"} />
      <section className="food-category-section fix section-padding shop-left">
        <div className="container">
          <div className="row g-4">
            <ProductSidebar />
            <div className="col-xl-9 col-lg-8 order-1 order-md-2">
              <ProductTopBar />
              <Suspense fallback={<div className="row"><div className="col-12 text-center">Loading products...</div></div>}>
                <ProductGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </FoodKingLayout>
  );
};
export default page;
