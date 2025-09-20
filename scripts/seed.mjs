import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const items = [
    {
      category: "Traditional",
      name: "Beef Nehari",
      price: 15.0,
      imageUrl: "assets/img/product/nehari.png",
    },
    {
      category: "Traditional",
      name: "Beef Haleem",
      price: 15.0,
      imageUrl: "assets/img/product/Beef Haleem.jpg",
    },
    {
      category: "Traditional",
      name: "Chana Masala",
      price: 15.0,
      imageUrl: "assets/img/product/chana-masala.jpg",
    },
    {
      category: "Traditional",
      name: "Butter Chicken",
      price: 15.0,
      imageUrl: "assets/img/product/chicken-butter.jpg",
    },
    {
      category: "Fast Food",
      name: "Beef  Classic Burger",
      price: 9.0,
      imageUrl: "assets/img/product/Chicken Classic Burger.jpeg",
    },
    {
      category: "Fast Food",
      name: "Beef Platinum Burger",
      price: 12.0,
      imageUrl: "assets/img/product/Beef Platinum Burger.webp",
    },
    {
      category: "Fast Food",
      name: "Beef Belt Buster Burger",
      price: 14.0,
      imageUrl: "assets/img/product/Beef Belt Buster Burger.webp",
    },
    {
      category: "Fast Food",
      name: "Chicken Classic Burger",
      price: 9.0,
      imageUrl: "assets/img/product/Chicken Classic Burger.jpeg",
    },
    // TANDOOR
    {
      category: "TANDOOR",
      name: "Sesame Naan",
      price: 3.0,
      imageUrl: "assets/img/product/Sesame Naan.jpg",
    },
    {
      category: "TANDOOR",
      name: "Plain Naan",
      price: 2.0,
      imageUrl: "assets/img/product/Plain Naan.jpeg",
    },
    {
      category: "TANDOOR",
      name: "Roghni Naan",
      price: 2.0,
      imageUrl: "assets/img/product/Roghni Naan.jpeg",
    },
    {
      category: "TANDOOR",
      name: "Garlic Naan",
      price: 3.0,
      imageUrl: "assets/img/product/Garlic Naan.jpg",
    },
    {
      category: "TANDOOR",
      name: "Puri Paratha",
      price: 4.0,
      imageUrl: "assets/img/product/Puri Paratha.jpg",
    },
    // STARTER
    {
      category: "STARTER",
      name: "French Fries",
      price: 6.0,
      imageUrl: "assets/img/product/french-fry.png",
      sizeOptions: { Regular: 6.0, Large: 7.0 },
    },
    {
      category: "STARTER",
      name: "Mayo Garlic Fries",
      price: 7.0,
      imageUrl: "assets/img/product/Mayo Garlic Fries.jpeg",
      sizeOptions: { Regular: 7.0, Large: 8.0 },
    },
    {
      category: "STARTER",
      name: "Chicken Nuggets",
      price: 6.5,
      imageUrl: "assets/img/product/Chicken Nuggets.png",
    },
    {
      category: "STARTER",
      name: "Pizza Fries",
      price: 10.0,
      imageUrl: "assets/img/product/Pizza Fries.jpg",
    },
    {
      category: "STARTER",
      name: "Mozzarella Stick",
      price: 7.0,
      imageUrl: "assets/img/product/Mozzarella Stick.jpg",
    },
    {
      category: "STARTER",
      name: "Onion Ring",
      price: 7.0,
      imageUrl: "assets/img/product/Onion Ring.jpg",
    },
    {
      category: "STARTER",
      name: "Samosa",
      price: 2.0,
      imageUrl: "assets/img/product/Samosa.jpeg",
    },
    // GYRO WRAP
    {
      category: "GYRO WRAP",
      name: "Chicken Gyro",
      price: 9.0,
      imageUrl: "assets/img/product/Chicken Gyro.jpg",
    },
    {
      category: "GYRO WRAP",
      name: "Gyro Meat( Lamb )",
      price: 9.0,
      imageUrl: "assets/img/product/Gyro Meat( Lamb ).jpeg",
    },
    {
      category: "GYRO WRAP",
      name: "Falafel Gyro",
      price: 9.0,
      imageUrl: "assets/img/product/Falafel Gyro.webp",
    },
    // SALAD BAR
    {
      category: "SALAD BAR",
      name: "Raita Bowl",
      price: 2.0,
      imageUrl: "assets/img/product/Raita Bowl.jpg",
    },
    {
      category: "SALAD BAR",
      name: "Salad Bowl",
      price: 5.0,
      imageUrl: "assets/img/product/salad.png",
    },
    // BEVERAGE
    {
      category: "Beverage",
      name: "Soda",
      price: 1.5,
      imageUrl: "assets/img/product/Soda.jpg",
    },
    {
      category: "Beverage",
      name: "Mango Lassi",
      price: 5.0,
      imageUrl: "assets/img/product/Mango Lassi.jpg",
    },
    {
      category: "Beverage",
      name: "Snapple",
      price: 3.0,
      imageUrl: "assets/img/product/Snapple.jpg",
    },
    {
      category: "Beverage",
      name: "Mineral Water",
      price: 1.5,
      imageUrl: "assets/img/product/Mineral Water.jpg",
    },
    // BBQ
    {
      category: "BBQ",
      name: "Bihari Tikka Leg ( 2 pcs )",
      price: 7.0,
      imageUrl: "assets/img/product/Bihari Tikka Leg.jpeg",
    },
    {
      category: "BBQ",
      name: "Chicken Bihari Kabab",
      price: 12.0,
      imageUrl: "assets/img/product/Chicken Bihari Kabab.jpeg",
    },
    {
      category: "BBQ",
      name: "Chicken Tikka Tandoori",
      price: 13.0,
      imageUrl: "assets/img/product/Chicken Tikka Tandoori.jpeg",
    },
    {
      category: "BBQ",
      name: "Lamb Chops ( 3 pcs )",
      price: 15.0,
      imageUrl: "assets/img/product/Lamb Chops.jpg",
    },
    {
      category: "BBQ",
      name: "Chicken Malai Boti",
      price: 12.0,
      imageUrl: "assets/img/product/Chicken Malai Boti.jpg",
    },
    {
      category: "BBQ",
      name: "Chicken Chapli Kabab ( 2 pcs )",
      price: 12.0,
      imageUrl: "assets/img/product/Chicken Chapli Kabab.jpg",
    },
    {
      category: "BBQ",
      name: "Beef Bihari Kabab",
      price: 15.0,
      imageUrl: "assets/img/product/Beef Bihari Kabab.jpeg",
    },
    {
      category: "BBQ",
      name: "Beef Gola Kabab",
      price: 13.0,
      imageUrl: "assets/img/product/Beef Gola Kabab.jpg",
    },
    {
      category: "BBQ",
      name: "Chicken Seekh Kabab ( 2 pcs )",
      price: 7.0,
      imageUrl: "assets/img/product/Chicken Seekh Kabab.jpeg",
    },
    // GYRO COMBOS
    {
      category: "GYRO COMBOS",
      name: "Chicken Gyro Platter",
      price: 11.0,
      imageUrl: "assets/img/product/Chicken Gyro Platter.jpg",
    },
    {
      category: "GYRO COMBOS",
      name: "Lamb Gyro Platter",
      price: 11.0,
      imageUrl: "assets/img/product/Lamb Gyro Platter.jpeg",
    },
    {
      category: "GYRO COMBOS",
      name: "Falafel Platter",
      price: 11.0,
      imageUrl: "assets/img/product/Falafel Platter.jpg",
    },
    {
      category: "GYRO COMBOS",
      name: "Mix Gyro Platter ( Chicken / Lamb )",
      price: 12.0,
      imageUrl: "assets/img/product/Mix Gyro Platter.jpeg",
    },
    {
      category: "GYRO COMBOS",
      name: "Supreme Platter",
      price: 15.0,
      imageUrl: "assets/img/product/Supreme Platter.jpeg",
    },
    // BBQ PLATTER
    {
      category: "BBQ PLATTER",
      name: "Chicken Tikka Tandoori With Rice",
      price: 16.0,
      imageUrl: "assets/img/product/Chicken Tikka Tandoori With Rice.jpg",
    },
    {
      category: "BBQ PLATTER",
      name: "Chicken Malai Boti With Rice",
      price: 15.0,
      imageUrl: "assets/img/product/Chicken Malai Boti With Rice.jpg",
    },
    {
      category: "BBQ PLATTER",
      name: "Chicken Bihari Kabab With Rice",
      price: 15.0,
      imageUrl: "assets/img/product/Chicken Bihari Kabab With Rice.jpg",
    },
    {
      category: "BBQ PLATTER",
      name: "Chicken Seekh Kabab With Rice",
      price: 15.0,
      imageUrl: "assets/img/product/Chicken Seekh Kabab With Rice.jpeg",
    },
    {
      category: "BBQ PLATTER",
      name: "Beef Bihari Kabab With Rice",
      price: 18.0,
      imageUrl: "assets/img/product/Beef Bihari Kabab With Rice.jpg",
    },
    {
      category: "BBQ PLATTER",
      name: "Beef Gola Kabab With Rice",
      price: 16.0,
      imageUrl: "assets/img/product/Beef Gola Kabab With Rice.jpeg",
    },
    {
      category: "BBQ PLATTER",
      name: "Lamb Chops Platter With Rice",
      price: 18.0,
      imageUrl: "assets/img/product/Lamb Chops Platter With Rice.jpeg",
    },
    // BBQ ROLL
    {
      category: "BBQ ROLL",
      name: "Chicken Bihari Chutney Roll",
      price: 10.0,
      imageUrl: "assets/img/product/Chicken Bihari Chutney Roll.jpeg",
    },
    {
      category: "BBQ ROLL",
      name: "Chicken Mayo Garlic Roll",
      price: 10.0,
      imageUrl: "assets/img/product/Chicken Mayo Garlic Roll.jpeg",
    },
    {
      category: "BBQ ROLL",
      name: "Beef Bihari Chutney Roll",
      price: 11.0,
      imageUrl: "assets/img/product/Beef Bihari Chutney Roll.jpeg",
    },
    {
      category: "BBQ ROLL",
      name: "Beef Mayo Garlic Roll",
      price: 11.0,
      imageUrl: "assets/img/product/Beef Mayo Garlic Roll.jpg",
    },
    {
      category: "BBQ ROLL",
      name: "Malai Boti Chutney Roll",
      price: 10.0,
      imageUrl: "assets/img/product/Malai Boti Chutney Roll.jpg",
    },
    {
      category: "BBQ ROLL",
      name: "Malai Mayo Garlic Roll",
      price: 10.0,
      imageUrl: "assets/img/product/Malai Mayo Garlic Roll.jpeg",
    },
    {
      category: "BBQ ROLL",
      name: "Gola Kabab Chutney Roll",
      price: 11.0,
      imageUrl: "assets/img/product/Gola Kabab Chutney Roll.jpg",
    },
    {
      category: "BBQ ROLL",
      name: "Gola Kabab Mayo Roll",
      price: 11.0,
      imageUrl: "assets/img/product/Gola Kabab Mayo Roll.jpg",
    },
    // Mediterranean
    {
      category: "Mediterranean",
      name: "Chicken Shawarma Wrap",
      price: 10.0,
      imageUrl: "assets/img/product/Chicken Shawarma Wrap.jpg",
    },
    {
      category: "Mediterranean",
      name: "Lamb Shawarma Wrap",
      price: 10.0,
      imageUrl: "assets/img/product/Lamb Shawarma Wrap.jpeg",
    },
    // Special Platter
    {
      category: "Special Platter",
      name: "MIX BBQ PLATTER",
      price: 50.0,
      imageUrl: "assets/img/product/mix-bbq-platter.webp",
    },
    {
      category: "Special Platter",
      name: "MIX BBQ PLATTER ( With Rice )",
      price: 60.0,
      imageUrl: "assets/img/product/mix-bbq-platter-with-rice.jpeg",
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


