export const runtime = 'nodejs';

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
    
    // Send emails via Resend if configured
    let emailedOwner = false;
    let emailedCustomer = false;
    try {
      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const ownerEmail = "ummehabiba4121994@gmail.com";

        const subject = `Al-Kababi Order ${created.orderNumber}`;
        const orderLines = created.items
          .map((i) => `• ${i.productName} x${i.quantity} — $${Number(i.lineTotal).toFixed(2)}`)
          .join("\n");
        const text = `Thank you for your order!\n\nOrder Number: ${created.orderNumber}\nName: ${created.customerName}\nPhone: ${created.customerPhone}\nEmail: ${created.customerEmail || "-"}\nNotes: ${created.customerNotes || "-"}\n\nItems:\n${orderLines}\n\nSubtotal: $${Number(created.subtotal).toFixed(2)}\nTax: $${Number(created.tax).toFixed(2)}\nTotal: $${Number(created.total).toFixed(2)}\n\nPayment: Cash on Delivery`;

        const html = `<div style="font-family: Arial, sans-serif; line-height:1.5;">
          <h2>Al-Kababi - Order ${created.orderNumber}</h2>
          <p><strong>Name:</strong> ${created.customerName}</p>
          <p><strong>Phone:</strong> ${created.customerPhone}</p>
          <p><strong>Email:</strong> ${created.customerEmail || "-"}</p>
          <p><strong>Notes:</strong> ${created.customerNotes || "-"}</p>
          <h3>Items</h3>
          <ul>${created.items.map((i) => `<li>${i.productName} x${i.quantity} — $${Number(i.lineTotal).toFixed(2)}</li>`).join("")}</ul>
          <p><strong>Subtotal:</strong> $${Number(created.subtotal).toFixed(2)}</p>
          <p><strong>Tax:</strong> $${Number(created.tax).toFixed(2)}</p>
          <p><strong>Total:</strong> $${Number(created.total).toFixed(2)}</p>
          <p><strong>Payment:</strong> Cash on Delivery</p>
        </div>`;

        // Use custom sender if provided, otherwise Resend onboarding (restricted)
        const from = process.env.EMAIL_FROM || "Al-Kababi <onboarding@resend.dev>";

        // Send to owner
        try {
          const resp = await resend.emails.send({ from, to: ownerEmail, subject, text, html });
          if (!resp?.error) emailedOwner = true; else console.error("Owner email error:", resp.error);
        } catch (e) { console.error("Owner email exception:", e); }

        // Send to customer if provided
        if (created.customerEmail) {
          try {
            const resp2 = await resend.emails.send({ from, to: created.customerEmail, subject, text, html });
            if (!resp2?.error) emailedCustomer = true; else console.error("Customer email error:", resp2.error);
          } catch (e) { console.error("Customer email exception:", e); }
        }
      }
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    return new Response(JSON.stringify({
      success: true,
      orderNumber: created.orderNumber,
      message: "Order placed successfully!",
      emailed: { owner: emailedOwner, customer: emailedCustomer }
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


