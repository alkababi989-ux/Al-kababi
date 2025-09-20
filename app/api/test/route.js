// Simple test API route without Prisma
export async function GET() {
  return new Response(JSON.stringify({ message: "API is working!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
