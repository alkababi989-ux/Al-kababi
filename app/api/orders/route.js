export async function GET() {
  try {
    // Check if DATABASE_URL is available during build
    if (!process.env.DATABASE_URL) {
      return new Response(JSON.stringify({ 
        error: "Database not configured",
        message: "DATABASE_URL environment variable is required" 
      }), { status: 503 });
    }

    const { default: prisma } = await import("@/lib/prisma");
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Orders API error:", e);
    return new Response(JSON.stringify({ 
      error: "Failed to fetch orders",
      message: e.message 
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

    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      customerNotes,
      items,
      subtotal,
      tax,
      total,
      currency = "USD",
      paymentMethod = "CASH",
    } = body || {};

    if (!customerName || !customerPhone || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "customerName, customerPhone and at least one item are required" }), { status: 400 });
    }

    const { default: prisma } = await import("@/lib/prisma");
    const orderNumber = `AK-${Date.now()}`;
    const created = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerPhone,
        customerEmail: customerEmail ?? null,
        customerNotes: customerNotes ?? null,
        subtotal,
        tax,
        total,
        currency,
        paymentMethod,
        items: {
          create: items.map((i) => ({
            productId: i.productId ?? null,
            productName: i.productName,
            productSlug: i.productSlug ?? "",
            imageUrl: i.imageUrl ?? null,
            unitPrice: i.unitPrice,
            quantity: i.quantity ?? 1,
            addons: i.addons ?? null,
            size: i.size ?? null,
            lineTotal: i.lineTotal,
          })),
        },
      },
      include: { items: true },
    });
    
    return new Response(JSON.stringify({ 
      success: true, 
      orderNumber: created.orderNumber,
      message: 'Order placed successfully!'
    }), { 
      status: 201, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (e) {
    console.error('Error creating order:', e);
    return new Response(JSON.stringify({ 
      error: "Failed to create order", 
      message: e.message 
    }), { status: 500 });
  }
}


