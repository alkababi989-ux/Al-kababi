export async function GET() {
  try {
    // Check environment variables
    const hasDbUrl = !!process.env.POSTGRES_PRISMA_URL;
    
    let dbStatus = "not_configured";
    let dbError = null;
    
    if (hasDbUrl) {
      try {
        const { default: prisma } = await import("@/lib/prisma");
        // Simple query to test connection
        await prisma.$queryRaw`SELECT 1`;
        dbStatus = "connected";
      } catch (e) {
        dbStatus = "error";
        dbError = e.message;
      }
    }
    
    return new Response(JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: {
        configured: hasDbUrl,
        status: dbStatus,
        error: dbError
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({
      status: "error",
      message: e.message,
      timestamp: new Date().toISOString()
    }), { status: 500 });
  }
}
