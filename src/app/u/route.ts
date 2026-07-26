export async function POST() {
  return new Response("Username is required", { status: 400 });
};
