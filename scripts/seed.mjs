import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const items = [
    {
      category: "Traditional",
      name: "Butter Chicken",
      price: 15.0,
      imageUrl: "assets/categoryimgs/Beef Nehari.jpg",
      description: "Serves 1 -- Butter Chicken  With Gravy"
    },
    {
      category: "Traditional",
      name: "Beef Haleem",
      price: 15.0,
      imageUrl: "assets/categoryimgs/Beef Haleem.jpg",
      description : "Delicious Beef Meat & Gravy with lemon"
    },
    {
      category: "Traditional",
      name: "Chana Masala",
      price: 15.0,
      imageUrl: "assets/categoryimgs/Chana Masala.jpg",
      description: "Serves 1 -- Chana Masala"
    },
    {
      category: "Traditional",
      name: "Beef Nehari",
      price: 15.0,
      imageUrl: "assets/categoryimgs/Butter Chicken.jpg",
      description: "Serves 1 -- Beef Nehari  With Gravy"
    },
    {
      category: "Fast Food",
      name: "Beef  Classic Burger",
      price: 9.0,
      imageUrl: "assets/categoryimgs/Beef Classic Burger.jpg",
      description: "Serves 1 -- Grilled beef patty  combined with cheese slice lettuce and sauce served with fries"
    },
    {
      category: "Fast Food",
      name: "Beef Platinum Burger",
      price: 12.0,
      imageUrl: "assets/categoryimgs/Beef Platinium Burger.jpg",
      description: "Serves 1 -- Grilled double beef patty  each combined with double cheese slice"
    },
    {
      category: "Fast Food",
      name: "Beef Belt Buster Burger",
      price: 14.0,
      imageUrl: "assets/categoryimgs/Beef belt buster Burger.jpg",
      description: "Serves 1 -- Grilled tripple beef patty  each combined with Tripple cheese slice"
    },
    {
      category: "Fast Food",
      name: "Chicken Classic Burger",
      price: 9.0,
      imageUrl: "assets/categoryimgs/Chicken Buger.jpg",
      description: "Serves 1 -- Grilled chicken patty weighing combined with cheese slice, lettuce and sauce ; served with fries"
    },
    // TANDOOR
    {
      category: "TANDOOR",
      name: "Sesame Naan",
      price: 3.0,
      imageUrl: "assets/categoryimgs/Sesame Naan.jpg",
      description: "Serves 1 -- Sesame Naan"
    },
    {
      category: "TANDOOR",
      name: "Plain Naan",
      price: 2.0,
      imageUrl: "assets/categoryimgs/Plain Naan.jpg",
      description : "Serve 1-- Plain Naan"
    },
    {
      category: "TANDOOR",
      name: "Roghni Naan",
      price: 2.0,
      imageUrl: "assets/categoryimgs/Roghni Naan.jpg",
      description: "Serve 1-- Roghni Naan"
    },
    {
      category: "TANDOOR",
      name: "Garlic Naan",
      price: 3.0,
      imageUrl: "assets/img/product/Garlic Naan.jpg",
      description: "Serve 1-- Garlic Naan"
    },
    {
      category: "TANDOOR",
      name: "Puri Paratha",
      price: 4.0,
      imageUrl: "assets/categoryimgs/Puri Paratha.jpg",
      description: "Serve 1-- Puri Paratha"

    },
    // STARTER
    {
      category: "STARTER",
      name: "Plain Fries",
      price: 6.0,
      imageUrl: "assets/categoryimgs/Plain Fries.jpg",
      sizeOptions: { Regular: 6.0, Large: 7.0 },
      description: "Serves 1 --- Crisp to teeth our in house made french fries topped with chaat masala served with Ketchup"
    },
    {
      category: "STARTER",
      name: "Mayo Garlic Fries",
      price: 7.0,
      imageUrl: "assets/categoryimgs/Mayo Garlic Fries.jpg",
      sizeOptions: { Regular: 7.0, Large: 8.0 },
      description: "Serves 1 --- Crisp to teeth our in house made french fries topped with Mayo Garlic served with Ketchup"
    },
    {
      category: "STARTER",
      name: "Chicken Nuggets",
      price: 6.5,
      imageUrl: "assets/categoryimgs/Chicken Nuggets.jpg",
      description: "Serves 1 --- 4 Pcs of Crispy deep fried nuggets made from chicken meat. Served with fries and sauce."
    },
    {
      category: "STARTER",
      name: "Pizza Fries",
      price: 10.0,
      imageUrl: "assets/categoryimgs/Pizza Fries.jpg",
      description: "Serves 1 --- Fries loaded with pizza style chicken, cheese, mushrooms & special sauce"
    },
    {
      category: "STARTER",
      name: "Mozzarella Stick",
      price: 7.0,
      imageUrl: "assets/categoryimgs/Mozzrealla Stick.jpg",
      description: "Serves 1 --- Crispy deep fried Mozzarella Stick made from chicken meat. Served ."
    },
    {
      category: "STARTER",
      name: "Onion Ring",
      price: 7.0,
      imageUrl: "assets/categoryimgs/Onion Ring.jpg",
      description:"Serves 1 --- Crispy deep fried OnionRing"
    },
    {
      category: "STARTER",
      name: "Samosa",
      price: 2.0,
      imageUrl: "assets/img/product/Samosa.jpeg",
      description:"Serves 1 --- Samosa"
    },
    // GYRO WRAP
    {
      category: "GYRO WRAP",
      name: "Chicken Gyro",
      price: 9.0,
      imageUrl: "assets/img/product/Chicken Gyro.jpg",
      description:"Serves 1 --- Chicken Gyro"
    },
    {
      category: "GYRO WRAP",
      name: "Gyro Meat( Lamb )",
      price: 9.0,
      imageUrl: "assets/img/product/Gyro Meat( Lamb ).jpeg",
      description:"Serves 1 --- Gyro Meat( Lamb )"
    },
    {
      category: "GYRO WRAP",
      name: "Falafel Gyro",
      price: 9.0,
      imageUrl: "assets/img/product/Falafel Gyro.webp",
      description:"Serves 1 --- Falafel Gyro"
    },
    // SALAD BAR
    {
      category: "SALAD BAR",
      name: "Green Raita",
      price: 2.0,
      imageUrl: "assets/categoryimgs/Green Raita.jpg",
      description: "Serves 1 --- Green Raita"
    },
    {
      category: "SALAD BAR",
      name: "Salad Bowl",
      price: 5.0,
      imageUrl: "assets/img/product/salad.png",
      description: "Serves 1 --- Salad Bowl"
    },
    // BEVERAGE
    {
      category: "Beverage",
      name: "Soda",
      price: 1.5,
      imageUrl: "assets/img/product/Soda.jpg",
      description: "Serves 1 --- Soda"
    },
    {
      category: "Beverage",
      name: "Mango Lassi",
      price: 5.0,
      imageUrl: "assets/img/product/Mango Lassi.jpg",
      description: "Serves 1 --- Mango Lassi"
    },
    {
      category: "Beverage",
      name: "Snapple",
      price: 3.0,
      imageUrl: "assets/img/product/Snapple.jpg",
      description: "Serves 1 --- Snapple"
    },
    {
      category: "Beverage",
      name: "Mineral Water",
      price: 1.5,
      imageUrl: "assets/img/product/Mineral Water.jpg",
      description: "Serves 1 --- Mineral Water"
    },
    // BBQ
    {
      category: "BBQ",
      name: "Bihari Tikka Leg ( 2 pcs )",
      price: 7.0,
      imageUrl: "assets/img/product/Bihari Tikka Leg.jpeg",
      description: "Serves 1 --- Bihari Tikka Leg ( 2 pcs )"
    },
    {
      category: "BBQ",
      name: "Chicken Bihari Kabab",
      price: 12.0,
      imageUrl: "assets/img/product/Chicken Bihari Kabab.jpeg",
      description: "Serves 1 --- Chicken Bihari Kabab"
    },
    {
      category: "BBQ",
      name: "Chicken Tikka Tandoori",
      price: 13.0,
      imageUrl: "assets/img/product/Chicken Tikka Tandoori.jpeg",
      description: "Serves 1 --- Chicken Tikka Tandoori"
    },
    {
      category: "BBQ",
      name: "Lamb Chops ( 3 pcs )",
      price: 15.0,
      imageUrl: "assets/img/product/Lamb Chops.jpg",
      description: "Serves 1 --- Lamb Chops ( 3 pcs )"
    },
    {
      category: "BBQ",
      name: "Chicken Malai Boti",
      price: 12.0,
      imageUrl: "assets/img/product/Chicken Malai Boti.jpg",
      description: "Serves 1 --- Chicken Malai Boti"
    },
    {
      category: "BBQ",
      name: "Chicken Chapli Kabab ( 2 pcs )",
      price: 12.0,
      imageUrl: "assets/img/product/Chicken Chapli Kabab.jpg",
      description: "Serves 1 --- Chicken Chapli Kabab ( 2 pcs )"
    },
    {
      category: "BBQ",
      name: "Beef Bihari Kabab",
      price: 15.0,
      imageUrl: "assets/img/product/Beef Bihari Kabab.jpeg",
      description: "Serves 1 --- Beef Bihari Kabab"
    },
    {
      category: "BBQ",
      name: "Beef Gola Kabab",
      price: 13.0,
      imageUrl: "assets/img/product/Beef Gola Kabab.jpg",
      description: "Serves 1 --- Beef Gola Kabab"
    },
    {
      category: "BBQ",
      name: "Chicken Seekh Kabab ( 2 pcs )",
      price: 7.0,
      imageUrl: "assets/img/product/Chicken Seekh Kabab.jpeg",  
      description: "Serves 1 --- Chicken Seekh Kabab ( 2 pcs )"
    },
    // GYRO COMBOS
    {
      category: "GYRO COMBOS",
      name: "Chicken Gyro Platter",
      price: 11.0,
      imageUrl: "assets/img/product/Chicken Gyro Platter.jpg",
      description: "Serves 1 --- Chicken Gyro Platter"
    },
    {
      category: "GYRO COMBOS",
      name: "Lamb Gyro Platter",
      price: 11.0,
      imageUrl: "assets/img/product/Lamb Gyro Platter.jpeg",
      description: "Serves 1 --- Lamb Gyro Platter"
    },
    {
      category: "GYRO COMBOS",
      name: "Falafel Platter",
      price: 11.0,
      imageUrl: "assets/img/product/Falafel Platter.jpg",
      description: "Serves 1 --- Falafel Platter"
    },
    {
      category: "GYRO COMBOS",
      name: "Mix Gyro Platter ( Chicken / Lamb )",
      price: 12.0,
      imageUrl: "assets/img/product/Mix Gyro Platter.jpeg",
      description: "Serves 1 --- Mix Gyro Platter ( Chicken / Lamb )"
    },
    {
      category: "GYRO COMBOS",
      name: "Supreme Platter",
      price: 15.0,
      imageUrl: "assets/img/product/Supreme Platter.jpeg",
      description: "Serves 1 --- Supreme Platter"
    },
    // BBQ PLATTER
    {
      category: "BBQ PLATTER",
      name: "Chicken Tikka Tandoori With Rice",
      price: 16.0,
      imageUrl: "assets/img/product/Chicken Tikka Tandoori With Rice.jpg",
      description: "Serves 1 --- Chicken Tikka Tandoori With Rice"
    },
    {
      category: "BBQ PLATTER",
      name: "Chicken Malai Boti With Rice",
      price: 15.0,
      imageUrl: "assets/img/product/Chicken Malai Boti With Rice.jpg",
      description: "Serves 1 --- Chicken Malai Boti With Rice"
    },
    {
      category: "BBQ PLATTER",
      name: "Chicken Bihari Kabab With Rice",
      price: 15.0,
      imageUrl: "assets/img/product/Chicken Bihari Kabab With Rice.jpg",
      description: "Serves 1 --- Chicken Bihari Kabab With Rice"
    },
    {
      category: "BBQ PLATTER",
      name: "Chicken Seekh Kabab With Rice",
      price: 15.0,
      imageUrl: "assets/img/product/Chicken Seekh Kabab With Rice.jpeg",
      description: "Serves 1 --- Chicken Seekh Kabab With Rice"
    },
    {
      category: "BBQ PLATTER",
      name: "Beef Bihari Kabab With Rice",
      price: 18.0,
      imageUrl: "assets/img/product/Beef Bihari Kabab With Rice.jpg",
      description: "Serves 1 --- Beef Bihari Kabab With Rice"
    },
    {
      category: "BBQ PLATTER",
      name: "Beef Gola Kabab With Rice",
      price: 16.0,
      imageUrl: "assets/img/product/Beef Gola Kabab With Rice.jpeg",
      description: "Serves 1 --- Beef Gola Kabab With Rice"
    },
    {
      category: "BBQ PLATTER",
      name: "Lamb Chops Platter With Rice",
      price: 18.0,
      imageUrl: "assets/img/product/Lamb Chops Platter With Rice.jpeg",
      description: "Serves 1 --- Lamb Chops Platter With Rice"
    },
    // BBQ ROLL
    {
      category: "BBQ ROLL",
      name: "Chicken Bihari Chutney Roll",
      price: 10.0,
      imageUrl: "assets/img/product/Chicken Bihari Chutney Roll.jpeg",
      description: "Serves 1 --- Chicken Bihari Chutney Roll"
    },
    {
      category: "BBQ ROLL",
      name: "Chicken Mayo Garlic Roll",
      price: 10.0,
      imageUrl: "assets/img/product/Chicken Mayo Garlic Roll.jpeg",
      description: "Serves 1 --- Chicken Mayo Garlic Roll"
    },
    {
      category: "BBQ ROLL",
      name: "Beef Bihari Chutney Roll",
      price: 11.0,
      imageUrl: "assets/img/product/Beef Bihari Chutney Roll.jpeg",
      description: "Serves 1 --- Beef Bihari Chutney Roll"
    },
    {
      category: "BBQ ROLL",
      name: "Beef Mayo Garlic Roll",
      price: 11.0,
      imageUrl: "assets/img/product/Beef Mayo Garlic Roll.jpg",
      description: "Serves 1 --- Beef Mayo Garlic Roll"
    },
    {
      category: "BBQ ROLL",
      name: "Malai Boti Chutney Roll",
      price: 10.0,
      imageUrl: "assets/img/product/Malai Boti Chutney Roll.jpg",
      description: "Serves 1 --- Malai Boti Chutney Roll"
    },
    {
      category: "BBQ ROLL",
      name: "Malai Mayo Garlic Roll",
      price: 10.0,
      imageUrl: "assets/img/product/Malai Mayo Garlic Roll.jpeg",
      description: "Serves 1 --- Malai Mayo Garlic Roll"
    },
    {
      category: "BBQ ROLL",
      name: "Gola Kabab Chutney Roll",
      price: 11.0,
      imageUrl: "assets/img/product/Gola Kabab Chutney Roll.jpg",
      description: "Serves 1 --- Gola Kabab Chutney Roll"
    },
    {
      category: "BBQ ROLL",
      name: "Gola Kabab Mayo Roll",
      price: 11.0,
      imageUrl: "assets/img/product/Gola Kabab Mayo Roll.jpg",
      description: "Serves 1 --- Gola Kabab Mayo Roll"
    },
    // Mediterranean
    {
      category: "Mediterranean",
      name: "Chicken Shawarma Wrap",
      price: 10.0,
      imageUrl: "assets/img/product/Chicken Shawarma Wrap.jpg",
      description: "Serves 1 --- Chicken Shawarma Wrap"
    },
    {
      category: "Mediterranean",
      name: "Lamb Shawarma Wrap",
      price: 10.0,
      imageUrl: "assets/img/product/Lamb Shawarma Wrap.jpeg",
      description: "Serves 1 --- Lamb Shawarma Wrap"
    },
    // Special Platter
    {
      category: "Special Platter",
      name: "MIX BBQ PLATTER",
      price: 50.0,
      imageUrl: "assets/img/product/mix-bbq-platter.webp",
      description: "Serves 1 --- MIX BBQ PLATTER"
    },
    {
      category: "Special Platter",
      name: "MIX BBQ PLATTER ( With Rice )",
      price: 60.0,
      imageUrl: "assets/img/product/mix-bbq-platter-with-rice.jpeg",
      description: "Serves 1 --- MIX BBQ PLATTER ( With Rice )"
    },
  ];

  for (const item of items) {
    try {
      const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const hasSizes = !!item.sizeOptions;
      await prisma.product.upsert({
        where: { slug },
        update: {
          price: String(item.price),
          category: item.category,
          imageUrl: item.imageUrl,
          available: true,
          hasSizes: hasSizes,
          sizeOptions: item.sizeOptions ?? null,
          isVegetarian: item.isVegetarian ?? false,
          isVegan: item.isVegan ?? false,
        },
        create: {
          slug,
          name: item.name,
          description: null,
          category: item.category,
          subcategory: null,
          tags: item.tags ?? [item.category.toLowerCase()],
          price: String(item.price),
          salePrice: null,
          currency: "USD",
          hasSizes: hasSizes,
          sizeOptions: item.sizeOptions ?? null,
          addons: null,
          isHalal: true,
          isVegetarian: item.isVegetarian ?? false,
          isVegan: item.isVegan ?? false,
          spiceLevel: null,
          imageUrl: item.imageUrl,
          galleryUrls: [],
          available: true,
          sku: null,
          prepTimeMinutes: 15,
          ratingAverage: 0,
          ratingCount: 0,
          seoTitle: item.name + " | Al-Kababi",
          seoDescription: `Order ${item.name} from Al-Kababi. Fresh, halal, and delicious.`,
        },
      });
      console.log("Upserted:", item.name);
    } catch (e) {
      console.error("Failed to upsert:", item.name, e);
    }
  }

  console.log("Seed complete: inserted/updated", items.length, "product");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


