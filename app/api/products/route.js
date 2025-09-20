export async function GET(request) {
  try {
    // Check if DATABASE_URL is available during build
    if (!process.env.DATABASE_URL) {
      return new Response(JSON.stringify({ 
        error: "Database not configured",
        message: "DATABASE_URL environment variable is required" 
      }), { status: 503 });
    }

    const { default: prisma } = await import("@/lib/prisma");
    const { Prisma } = await import("@prisma/client");
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || undefined;
    const category = searchParams.get("category") || undefined;
    const take = Number(searchParams.get("take") || 24);
    const page = Number(searchParams.get("page") || 1);
    const skip = (page - 1) * take;
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const minPrice = minPriceParam != null ? parseFloat(minPriceParam) : undefined;
    const maxPrice = maxPriceParam != null ? parseFloat(maxPriceParam) : undefined;

    const where = {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { category: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        category ? { category } : {},
        (typeof minPrice === "number" && !Number.isNaN(minPrice)) ||
        (typeof maxPrice === "number" && !Number.isNaN(maxPrice))
          ? {
              price: {
                ...(typeof minPrice === "number" && !Number.isNaN(minPrice)
                  ? { gte: new Prisma.Decimal(minPrice.toFixed(2)) }
                  : {}),
                ...(typeof maxPrice === "number" && !Number.isNaN(maxPrice)
                  ? { lte: new Prisma.Decimal(maxPrice.toFixed(2)) }
                  : {}),
              },
            }
          : {},
      ],
    };

    const [items, total] = await Promise.all([
      prisma.product.findMany({ where, skip, take, orderBy: { createdAt: "desc" } }),
      prisma.product.count({ where }),
    ]);
    return new Response(JSON.stringify({ items, total, page, take }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Products API error:", e);
    return new Response(JSON.stringify({ 
      error: "Failed to fetch products",
      message: e.message,
      details: process.env.NODE_ENV === 'development' ? e.stack : undefined
    }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Check if DATABASE_URL is available during build
    if (!process.env.DATABASE_URL) {
      return new Response(JSON.stringify({ 
        error: "Database not configured",
        message: "DATABASE_URL environment variable is required" 
      }), { status: 503 });
    }

    const { default: prisma } = await import("@/lib/prisma");
    const body = await request.json();
    const { name, category, price, imageUrl, description } = body || {};
    if (!name || !category || typeof price !== "number") {
      return new Response(JSON.stringify({ error: "name, category and numeric price are required" }), { status: 400 });
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        category,
        price,
        imageUrl: imageUrl ?? null,
        description: description ?? null,
        tags: [],
      },
    });
    return new Response(JSON.stringify(product), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Products API error:", e);
    return new Response(JSON.stringify({ 
      error: "Failed to create product",
      message: e.message 
    }), { status: 500 });
  }
}


