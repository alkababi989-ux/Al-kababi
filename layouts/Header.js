"use client";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Fragment, useState, useEffect } from "react";

const Header = ({ header }) => {
  switch (header) {
    case 1:
      return <Header1 />;
    case 2:
      return <Header2 />;
    default:
      return <Header1 />;
  }
};
export default Header;

const Menus = () => {
  return (
    <ul>
      {/* Home: simple link, no dropdown */}
      <li className="active">
        <Link href="/">Home</Link>
      </li>

      {/* Shop */}
      <li className="has-dropdown">
        <Link href="/shop-left-sidebar">
          Food Menu
          <i className="fas fa-angle-down" />
        </Link>
        <ul className="submenu">
          <li><Link href="/shop-left-sidebar">Food Categories</Link></li>
          <li><Link href="/shop-list">Food Menu List</Link></li>
        </ul>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
    
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
};

const Header1 = () => {
  const [toggle, setToggle] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, subtotal, remove } = useCart();
  const itemCount = items.reduce((s,i)=>s+i.quantity,0);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Fragment>
      <header className="section-bg">
        <div className="header-top" style={{ height: "50px", paddingTop: "10px"}}>
          <div className="container">
            <div className="header-top-wrapper">
              <ul>
                <li>
                  <span>100%</span> Secure delivery without contacting the
                  courier
                </li>
                <li>
                  <i className="fas fa-truck" />
                  Track Your Order
                </li>
              </ul>
              <div className="top-right">
                
                <div className="social-icon d-flex align-items-center">
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fab fa-vimeo-v" /></a>
                  <a href="#"><i className="fab fa-pinterest-p" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="header-sticky" className="header-1">
          <div className="container">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="logo">
                  <Link href="/" className="header-logo">
                    {/* Updated to Al-KABABI logo */}
                    <img src="assets/img/logo/alkababi.png" alt="Al-KABABI logo" />
                  </Link>
                </div>
                <div className="header-left">
                  <div className="mean__menu-wrapper d-none d-lg-block">
                    <div className="main-menu">
                      <nav id="mobile-menu">
                        <Menus />
                      </nav>
                      {/* for wp */}
                    </div>
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="menu-cart">
                    <div className="cart-box">
                      <ul>
                        {!mounted ? (
                          <li className="border-none"><div className="cart-product"><span>Loading...</span></div></li>
                        ) : (
                          <>
                            {items.slice(0, 4).map((it, idx) => (
                              <li key={it.productId} className={idx === items.length - 1 ? "border-none" : ""}>
                                <img src={it.imageUrl || "assets/img/food/burger-2.png"} alt="image" />
                                <div className="cart-product">
                                  <a href="/shop-left-sidebar">{it.name}</a>
                                  <span>${(it.unitPrice * it.quantity).toFixed(2)}</span>
                                </div>
                                <button className="cart-remove" onClick={() => remove(it.productId)} aria-label="Remove">×</button>
                              </li>
                            ))}
                            {items.length === 0 && (
                              <li className="border-none"><div className="cart-product"><span>Your cart is empty</span></div></li>
                            )}
                          </>
                        )}
                      </ul>
                      <div className="shopping-items d-flex align-items-center justify-content-between">
                        <span>Items : {mounted ? items.reduce((s,i)=>s+i.quantity,0) : 0}</span>
                        <span>Total : ${mounted ? subtotal.toFixed(2) : '0.00'}</span>
                      </div>
                      <div className="cart-button d-flex justify-content-between mb-4">
                        <Link href="/shop-cart" className="theme-btn">View Cart</Link>
                        <Link href="/checkout" className="theme-btn bg-red-2">Checkout</Link>
                      </div>
                    </div>
                    <Link href="/shop-cart" className="cart-icon">
                      <i className="far fa-shopping-basket" />
                      <span>{mounted ? itemCount : 0}</span>
                    </Link>
                  </div>
                  <div className="header-button">
                    <Link href="/reservation" className="theme-btn bg-red-2">
                      Reservation
                    </Link>
                  </div>
                  <div className="header__hamburger d-xl-block my-auto">
                    <div className="sidebar__toggle">
                      <div className="header-bar" onClick={() => setToggle(true)}>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="search-wrap">
        <div className="search-inner">
          <i className="fas fa-times search-close" id="search-close" />
          <div className="search-cell">
            <form method="get">
              <div className="search-field-holder">
                <input type="search" className="main-search-input" placeholder="Search..." />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Sidebar toggle={toggle} setToggle={setToggle} />
    </Fragment>
  );
};

const Header2 = () => {
  return (
    <Fragment>
      <header>
        <div id="header-sticky" className="header-2">
          <div className="container-fluid">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="header-left">
                  <div className="logo">
                    <Link href="/" className="header-logo">
                      {/* Updated to Al-KABABI alt logo */}
                      <img src="assets/img/logo/alkababi.png" alt="Al-KABABI logo" style={{ width: "100px"}} />
                    </Link>
                  </div>
                  <div className="logo-2">
                    <Link href="/" className="h   eader-logo">
                      {/* Updated to Al-KABABI main logo */}
                      <img src="assets/img/logo/alkababi.png" alt="Al-KABABI logo"  />
                    </Link>
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="mean__menu-wrapper d-none d-lg-block">
                    <div className="main-menu">
                      <nav id="mobile-menu">
                        <Menus />
                      </nav>
                      {/* for wp */}
                    </div>
                  </div>
                  <a href="#0" className="search-trigger search-icon">
                    <i className="fal fa-search" />
                  </a>
                  <div className="menu-cart">
                    <div className="cart-box">
                      <ul>
                        <li>
                          <img src="assets/img/shop-food/s2.png" alt="image" />
                          <div className="cart-product">
                            <a href="#0">grilled chiken</a>
                            <span>168$</span>
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li className="border-none">
                          <img src="assets/img/shop-food/s3.png" alt="image" />
                          <div className="cart-product">
                            <a href="#0">grilled chiken</a>
                            <span>168$</span>
                          </div>
                        </li>
                      </ul>
                      <div className="shopping-items d-flex align-items-center justify-content-between">
                        <span>Shopping : $20.00</span>
                        <span>Total : $168.00</span>
                      </div>
                      <div className="cart-button d-flex justify-content-between mb-4">
                        <Link href="/shop-cart" className="theme-btn">View Cart</Link>
                        <Link href="/checkout" className="theme-btn bg-red-2">Checkout</Link>
                      </div>
                    </div>
                    <Link href="/shop-cart" className="cart-icon">
                      <i className="far fa-shopping-cart" />
                    </Link>
                  </div>
                  <div className="header-button">
                    <Link href="/shop-single" className="theme-btn bg-transparent">
                      <span className="button-content-wrapper d-flex align-items-center">
                        <span className="button-icon">
                          <i className="flaticon-delivery" />
                        </span>
                        <span className="button-text">order now</span>
                      </span>
                    </Link>
                  </div>
                  <div className="header__hamburger d-xl-block my-auto">
                    <div className="sidebar__toggle">
                      <img src="assets/img/logo/bar.svg" alt="bar-icon" className="bar-1" />
                      <img src="assets/img/logo/bar-2.svg" alt="bar-icon" className="bar-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar />
    </Fragment>
  );
};

const Sidebar = ({ toggle, setToggle }) => {
  return (
    <Fragment>
      <div className="fix-area">
        <div className={`offcanvas__info ${toggle ? "info-open" : ""}`}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/">
                    {/* Updated to Al-KABABI logo */}
                    <img src="assets/img/logo/alkababi.png" alt="Al-KABABI logo" style={{ width: "150px" }} />
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button onClick={() => setToggle(false)}>
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <p className="text d-none d-lg-block">
                Authentic Al-Kababi cuisine made fresh daily with halal ingredients.
                Enjoy dine-in, pickup, and fast delivery in our local area.
                Quality, flavor, and friendly service—every single order.
              </p>
              <div className="offcanvas-gallery-area d-none d-lg-block">
                <div className="offcanvas-gallery-items">
                  <a href="assets/img/header/01.jpg" className="offcanvas-image img-popup">
                    <img src="assets/img/header/01.jpg" alt="gallery-img" />
                  </a>
                  <a href="assets/img/header/02.jpg" className="offcanvas-image img-popup">
                    <img src="assets/img/header/02.jpg" alt="gallery-img" />
                  </a>
                  <a href="assets/img/header/03.jpg" className="offcanvas-image img-popup">
                    <img src="assets/img/header/03.jpg" alt="gallery-img" />
                  </a>
                </div>
                <div className="offcanvas-gallery-items">
                  <a href="assets/img/header/04.jpg" className="offcanvas-image img-popup">
                    <img src="assets/img/header/04.jpg" alt="gallery-img" />
                  </a>
                  <a href="assets/img/header/05.jpg" className="offcanvas-image img-popup">
                    <img src="assets/img/header/05.jpg" alt="gallery-img" />
                  </a>
                  <a href="assets/img/header/06.jpg" className="offcanvas-image img-popup">
                    <img src="assets/img/header/06.jpg" alt="gallery-img" />
                  </a>
                </div>
              </div>
              <MobileMenu />
              <div className="offcanvas__contact">
                <h4>Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon">
                      <i className="fal fa-map-marker-alt" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a target="_blank" href="#">
                      22 Hempstead turnpike Farmingdale NY 11735,USA
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-envelope" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+013-003-003-9993">
                        <span className="mailto:info@enofik.com">info@alkababi.com</span>
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-clock" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a target="_blank" href="#">
                        Mod-friday, 09am -05pm
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="far fa-phone" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+516-249-7414">+516-249-7414</a>
                    </div>
                  </li>
                </ul>
                <div className="header-button mt-4">
                  <Link href="/reservation" className="theme-btn">
                    <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                      <span className="button-icon">
                        <i className="flaticon-delivery" />
                      </span>
                      <span className="button-text">Reservation</span>
                    </span>
                  </Link>
                </div>
                <div className="social-icon d-flex align-items-center">
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fab fa-youtube" /></a>
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`offcanvas__overlay ${toggle ? "overlay-open" : ""}`}
        onClick={() => setToggle(false)}
      />
    </Fragment>
  );
};

const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [multiMenu, setMultiMenu] = useState("");
  const activeMenuSet = (value) => setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) => (value === activeMenu ? { display: "block" } : { display: "none" });
  const multiMenuSet = (value) => setMultiMenu(multiMenu === value ? "" : value),
    multiMenuActiveLi = (value) => (value === multiMenu ? { display: "block" } : { display: "none" });
  return (
    <div className="mobile-menu fix mb-3 mean-container d-block d-lg-none">
      <div className="mean-bar">
        <a href="#nav" className="meanmenu-reveal">
          <span><span><span /></span></span>
        </a>
        <nav className="mean-nav">
          <ul>
            {/* Home: simple link, no dropdown */}
            <li className="active">
              <Link href="/">Home</Link>
            </li>

            <li className="has-dropdown">
              <Link href="/shop-left-sidebar">
                Food Menu
                <i className="fas fa-angle-down" />
              </Link>
              <ul className="submenu" style={activeLi("shop-left-sidebar")}>
                <li><Link href="/shop-left-sidebar">Food Categories</Link></li>
                <li><Link href="/shop-list">Food Menu </Link></li>
                
              </ul>
              <a className="mean-expand" href="#" onClick={() => activeMenuSet("shop")}>
                <i className="far fa-plus" />
              </a>
            </li>

            
            <li className="mean-last">
              <Link href="/about">About Us</Link>
            </li>

            <li className="mean-last">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
