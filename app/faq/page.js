"use client";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
const page = () => {
  const faqData = [
    {
      id: 1,
      title: "What are your hours?",
      content:
        "We’re open daily from 10:00am – 10:00pm.",
      animationDelay: ".1s",
    },
    {
      id: 2,
      title: "Where are you located?",
      content:
        "22 Hempstead Turnpike, Farmingdale, NY 11735. See the Contact page for the map and directions.",
      animationDelay: ".2s",
    },
    {
      id: 3,
      title: "How do I place an online order?",
      content:
        "Browse the menu, add items to your cart, then check out with your contact details. You’ll receive an order confirmation on screen and by email.",
      animationDelay: ".3s",
    },
    {
      id: 4,
      title: "What payment methods do you accept online?",
      content:
        "We currently accept Cash on Delivery (COD) for online orders. Pay in-store at pickup or to the driver upon delivery.",
      animationDelay: ".4s",
    },
    {
      id: 5,
      title: "Do you offer pickup or delivery?",
      content:
        "Pickup is available. For delivery availability and timing, please call us at +1 (516) 249-7414.",
      animationDelay: ".5s",
    },
    {
      id: 6,
      title: "Is your food halal?",
      content:
        "Yes, we proudly serve halal meats.",
      animationDelay: ".6s",
    },
    {
      id: 7,
      title: "Can you adjust spice levels or customize dishes?",
      content:
        "Absolutely. Many dishes can be prepared mild, medium, or spicy. Let us know your preference in the order notes or tell our team when you call.",
      animationDelay: ".7s",
    },
    {
      id: 8,
      title: "Do you have vegetarian or gluten‑free options?",
      content:
        "We offer a variety of vegetarian items, and some dishes can be prepared gluten‑free. Please inform us of any allergies so we can guide you.",
      animationDelay: ".8s",
    },
    {
      id: 9,
      title: "Do you cater events?",
      content:
        "Yes, we cater small and large events. Email info@alkababi.com or call +1 (516) 249-7414 to discuss your menu and date.",
      animationDelay: ".9s",
    },
    {
      id: 10,
      title: "What is your cancellation or refund policy?",
      content:
        "If you need to change or cancel an order, call us as soon as possible. Once an order is being prepared, cancellations may not be possible. If there’s any issue with your order, please contact us and we’ll make it right.",
      animationDelay: "1.0s",
    },
  ];

  const half = Math.ceil(faqData.length / 2);
  const leftFaq = faqData.slice(0, half);
  const rightFaq = faqData.slice(half);
  const [activeLeft, setActiveLeft] = useState(leftFaq[0]?.id);
  const [activeRight, setActiveRight] = useState(rightFaq[0]?.id);

  return (
    <FoodKingLayout>
      <PageBanner pageName={"faq"} />
      <section className="faq-section fix section-padding">
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp">frequently asked questions</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">Frequently Asked Questions</h2>
            <p className="wow fadeInUp" data-wow-delay=".5s">
              Find quick answers about ordering, payments, pickup, delivery, and more.
            </p>
          </div>
          <div className="row g-5 align-items-start">
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="faq-content">
                    <Accordion activeKey={String(activeLeft)} onSelect={(k) => k && setActiveLeft(Number(k))}>
                      {leftFaq.map((item) => (
                        <div
                          className="accordion-item wow fadeInUp"
                          data-wow-delay={item.animationDelay}
                          key={item.id}
                        >
                          <h4 className="accordion-header">
                            <Accordion.Toggle
                              as={"button"}
                              eventKey={String(item.id)}
                              className={`accordion-button ${
                                activeLeft == item.id ? "" : "collapsed"
                              }`}
                              onClick={() => setActiveLeft(item.id)}
                            >
                              {item.title}
                            </Accordion.Toggle>
                          </h4>
                          <Accordion.Collapse
                            className="accordion-collapse"
                            eventKey={String(item.id)}
                          >
                            <div className="accordion-body">{item.content}</div>
                          </Accordion.Collapse>
                        </div>
                      ))}
                    </Accordion>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="faq-content">
                    <Accordion activeKey={String(activeRight)} onSelect={(k) => k && setActiveRight(Number(k))}>
                      {rightFaq.map((item) => (
                        <div
                          className="accordion-item wow fadeInUp"
                          data-wow-delay={item.animationDelay}
                          key={item.id}
                        >
                          <h4 className="accordion-header">
                            <Accordion.Toggle
                              as={"button"}
                              eventKey={String(item.id)}
                              className={`accordion-button ${
                                activeRight == item.id ? "" : "collapsed"
                              }`}
                              onClick={() => setActiveRight(item.id)}
                            >
                              {item.title}
                            </Accordion.Toggle>
                          </h4>
                          <Accordion.Collapse
                            className="accordion-collapse"
                            eventKey={String(item.id)}
                          >
                            <div className="accordion-body">{item.content}</div>
                          </Accordion.Collapse>
                        </div>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-items active text-center wow fadeInUp" data-wow-delay=".3s">
                <div className="icon">
                  <img src="assets/img/icon/phone.svg" alt="phone-icon" />
                </div>
                <div className="content">
                  <h3>Need more help?</h3>
                  <p>Call or email our team and we’ll be happy to assist.</p>
                  <h4>
                    <a href="tel:+15162497414">+1 (516) 249-7414</a>
                  </h4>
                  <p>
                    <a href="mailto:info@alkababi.com">info@alkababi.com</a>
                  </p>
                  <div className="mt-3">
                    <span className="badge bg-warning text-dark me-2">Halal</span>
                    <span className="badge bg-success">Pickup Available</span>
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
