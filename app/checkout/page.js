import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import CheckoutForm from "@/components/CheckoutForm";

const page = () => {
  return (
    <FoodKingLayout>
      <PageBanner pageName={"CHECKOUT"} />
      <section className="checkout-section fix section-padding border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row g-4">
                <div className="col-12">
                  <div className="checkout-single-wrapper">
                    <div className="checkout-single boxshado-single">
                      <h4>Customer Information (Cash on Delivery)</h4>
                      <div className="checkout-single-form">
                        <CheckoutForm />
                      </div>
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
