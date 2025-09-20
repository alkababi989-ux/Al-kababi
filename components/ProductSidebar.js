"use client";
import Link from "next/link";
import Slider from "rc-slider";
import { useState } from "react";

const ProductSidebar = ({
  className = "col-xl-3 col-lg-4 order-2 order-md-1 mt-5",
  style = "style-1",
}) => {
  const [value, setValue] = useState([10, 30]);
  const [openCat, setOpenCat] = useState(null); // deprecated (no accordion)

  // ===== Submenus (fill/adjust to exactly match your menu.pdf) =====
  const burgerItems = [
    "Beef Classic Burger",
    "Beef Platinum Burger",
    "Beef Belt Buster Burger",
    "Chicken Classic Burger",
  ];

  const traditionalItems = [
    // TODO: replace with your exact Traditional items from menu.pdf
    "Chicken Handi",
    "Mutton Karahi",
    "Daal Fry",
    "Chicken Ginger",
  ];

  const tandoorItems = [
    // TODO: replace with exact Tandoor items
    "Roghni Naan",
    "Garlic Naan",
    "Kulcha",
    "Tandoori Roti",
  ];

  const gyroWrapItems = [
    "Chicken Gyro Wrap",
    "Lamb Gyro Wrap",
    "Falafel Wrap",
  ];

  const saladBarItems = [
    // TODO: replace with exact Salad Bar items
    "Greek Salad",
    "Caesar Salad",
    "Fattoush",
  ];

  const beveragesItems = [
    // TODO: replace with exact Beverages
    "Mineral Water",
    "Soft Drink",
    "Fresh Lime",
    "Mint Margarita",
  ];

  const friedRiceItems = [
    "Chicken Fried Rice",
    "Beef Fried Rice",
    "Vegetable Fried Rice",
    "Egg Fried Rice",
  ];

  const bbqItems = [
    "Bihari Tikka Leg",
    "Chicken Bihari Kabab",
    "Chicken Tikka Tandoori",
    "Lamb Chops (3 pcs)",
    "Chicken Malai Boti",
    "Chicken Chapli Kabab",
    "Beef Bihari Kabab",
    "Beef Gola Kabab",
    "Chicken Seekh Kabab",
  ];

  const gyroCombosItems = [
    "Chicken Gyro Platter",
    "Lamb Gyro Platter",
    "Falafel Platter",
    "Mix Gyro Platter",
  ];

  const bbqRollItems = [
    "Chicken Bihari Chutney Roll",
    "Chicken Mayo Garlic Roll",
    "Beef Bihari Chutney Roll",
    "Beef Mayo Garlic Roll",
    "Malai Boti Chutney Roll",
    "Malai Mayo Garlic Roll",
    "Gola Kabab Chutney Roll",
    "Gola Kabab Mayo Roll",
  ];

  const mediterraneanItems = ["Chicken Shawarma", "Lamb Shawarma"];

  const specialPlatterItems = [
    "MIX BBQ PLATTER",
    "Special Platter (With Rice)",
    "Lamb Chops Platter",
  ];

  const bbqPlatterItems = [
    // keep separate if your menu has a distinct “BBQ Platter” section
    "BBQ Platter (Regular)",
    "BBQ Platter (Large)",
  ];

  // ===== Small helper to render an accordion category =====
  const renderAccordion = ({
    keyName,
    iconClass,
    label,
    items,
    queryCategory,
  }) => {
    const isOpen = openCat === keyName;
    const list =
      items && items.length
        ? items
        : ["View all"]; // fallback so it still drops down

    return (
      <li className={`has-dropdown ${isOpen ? "active" : ""}`}>
        <button
          type="button"
          className="category-toggle"
          onClick={() => setOpenCat(isOpen ? null : keyName)}
          aria-expanded={isOpen}
          aria-controls={`cat-${keyName}`}
          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}
        >
          {iconClass ? <i className={iconClass} /> : null}
          <span>{label}</span>
          <i
            className={`fas fa-angle-${isOpen ? "up" : "down"}`}
            style={{ marginLeft: "auto" }}
          />
        </button>

        <ul
          id={`cat-${keyName}`}
          className="submenu"
          style={{
            display: isOpen ? "block" : "none",
            paddingLeft: 32,
            marginTop: 8,
          }}
        >
          {list.map((item) => (
            <li key={item}>
              <Link
                href={{
                  pathname: "/shop-left-sidebar",
                  query: {
                    // Map sidebar slug to DB category text used in seeding
                    category:
                      (queryCategory || keyName)
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (m) => m.toUpperCase()),
                    ...(item !== "View all" ? { item } : {}),
                  },
                }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  return (
    <div className={className}>
      <div className={`main-sidebar ${style}`}>
        {/* === CATEGORIES (flat clickable list) === */}
        <div className="single-sidebar-widget">
          <div className="wid-title">
            <h4>categories</h4>
          </div>

          <div className="widget-categories">
            <ul className="category-list">
              {[
                { label: "Traditional", value: "Traditional", icon: "flaticon-chicken" },
                { label: "Fast Food", value: "Fast Food", icon: "flaticon-burger" },
                { label: "Starter", value: "STARTER", icon: "flaticon-french-fries" },
                { label: "Tandoor", value: "TANDOOR", icon: "flaticon-french-fries" },
                { label: "Gyro Wrap", value: "GYRO WRAP", icon: "flaticon-pizza" },
                { label: "Salad Bar", value: "SALAD BAR", icon: "flaticon-sandwich" },
                { label: "Beverage", value: "Beverage", icon: "flaticon-bread" },
                { label: "BBQ", value: "BBQ", icon: "flaticon-hotdog" },
                { label: "Gyro Combos", value: "GYRO COMBOS", icon: "flaticon-rice" },
                { label: "BBQ Roll", value: "BBQ ROLL", icon: "flaticon-rice" },
                { label: "BBQ Platter", value: "BBQ PLATTER", icon: "flaticon-rice" },
                { label: "Mediterranean", value: "Mediterranean", icon: "flaticon-rice" },
                { label: "Special Platter", value: "Special Platter", icon: "flaticon-rice" },
              ].map((c) => (
                <li key={c.value}>
                  <Link
                    href={{ pathname: "/shop-left-sidebar", query: { category: c.value } }}
                    scroll={false}
                    className="category-link"
                  >
                    {c.icon ? <i className={c.icon} /> : null}
                    <span>{c.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* tiny style for clickable list */}
          <style jsx>{`
            .category-list .category-link {
              background: transparent;
              border: 0;
              padding: 8px 0;
              cursor: pointer;
              text-align: left;
              font: inherit;
            }
            .category-list li { margin: 6px 0; }
          `}</style>
        </div>

        {/* === PRICE FILTER (unchanged) === */}
        <div className="single-sidebar-widget">
          <div className="wid-title">
            <h4>price filter</h4>
          </div>
          <div className="range__barcustom">
            <Slider
              value={value}
              range
              onChange={(e) => setValue(e)}
              trackStyle={{ backgroundColor: "#00813D" }}
              handleStyle={{
                borderColor: "#00813D",
                backgroundColor: "#00813D",
              }}
              railStyle={{ backgroundColor: "#212121" }}
            />
            <div className="range-items">
              <div className="price-input d-flex">
                <div className="field">
                  <span>Price:</span>
                </div>
                <div className="field">
                  <span>${value[0]}</span>
                </div>
                <div className="separators">-</div>
                <div className="field">
                  <span>${value[1]}</span>
                </div>
                <Link href={{ pathname: "/shop-left-sidebar", query: { ...Object.fromEntries(new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')), minPrice: value[0], maxPrice: value[1] } }} scroll={false} className="theme-btn border-radius-none">Filter</Link>
              </div>
            </div>
          </div>
        </div>

        {/* === FILTER BY SIZE (unchanged) === */}
        <div className="single-sidebar-widget">
          <div className="wid-title">
            <h4>filter by size</h4>
          </div>
          <div className="filter-size">
            {["Small", "Medium", "Large", "Extra Large"].map((size) => (
              <div key={size} className="input-save d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="size"
                  id={`size-${size.toLowerCase()}`}
                  value={size.toLowerCase()}
                />
                <label htmlFor={`size-${size.toLowerCase()}`}>{size}</label>
              </div>
            ))}
          </div>
        </div>

        {/* === NEW ARRIVAL (unchanged) === */}
        <div className="single-sidebar-widget">
          <div className="wid-title">
            <h4>new arrival</h4>
          </div>
          <div className="popular-food-posts">
            <div className="single-post-item">
              <div
                className="thumb bg-cover"
                style={{
                  backgroundImage: 'url("/assets/img/shop-food/food-1.png")',
                }}
              />
              <div className="post-content">
                <div className="star">
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star color-bg" />
                </div>
                <h4>
                  <Link href="/shop-single">ruti with chiken</Link>
                </h4>
                <div className="post-price">
                  <span className="theme-color-2">$30.52</span>
                  <span>$28.52</span>
                </div>
              </div>
            </div>
            <div className="single-post-item">
              <div
                className="thumb bg-cover"
                style={{
                  backgroundImage: 'url("/assets/img/shop-food/food-2.png")',
                }}
              />
              <div className="post-content">
                <div className="star">
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star color-bg" />
                </div>
                <h4>
                  <Link href="/shop-single">ruti with chiken</Link>
                </h4>
                <div className="post-price">
                  <span className="theme-color-2">$30.52</span>
                  <span>$28.52</span>
                </div>
              </div>
            </div>
            <div className="single-post-item">
              <div
                className="thumb bg-cover"
                style={{
                  backgroundImage: 'url("/assets/img/shop-food/food-3.png")',
                }}
              />
              <div className="post-content">
                <div className="star">
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star color-bg" />
                </div>
                <h4>
                  <Link href="/shop-single">ruti with chiken</Link>
                </h4>
                <div className="post-price">
                  <span className="theme-color-2">$30.52</span>
                  <span>$28.52</span>
                </div>
              </div>
            </div>
            <div className="single-post-item">
              <div
                className="thumb bg-cover"
                style={{
                  backgroundImage: 'url("/assets/img/shop-food/food-4.png")',
                }}
              />
              <div className="post-content">
                <div className="star">
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star" />
                  <span className="fas fa-star color-bg" />
                </div>
                <h4>
                  <Link href="/shop-single">ruti with chiken</Link>
                </h4>
                <div className="post-price">
                  <span className="theme-color-2">$30.52</span>
                  <span>$28.52</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* === /NEW ARRIVAL === */}
      </div>
    </div>
  );
};

export default ProductSidebar;
