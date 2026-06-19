export const runtime = "edge";

const GAS_URL = "https://script.google.com/macros/s/AKfycbz9d1VPKErEGuu_eSPwwgrkh5HkkHjItfjOjuWVZ_waiOjgKzOC3Rygjoz4C1iVMTPl/exec";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const rawBody = await req.arrayBuffer();

    const gasResponse = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body: rawBody,
      redirect: "follow",
    });

    const data = await gasResponse.text();

    return new Response(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
}
