export async function onRequest(context: { request: Request }): Promise<Response> {
  const { request } = context;
  let name = 'world';
  const url = new URL(request.url);
  if (url.searchParams.get('name')) {
    name = url.searchParams.get('name')!;
  } else if (request.method === 'POST') {
    try {
      const text = await request.text();
      if (text) name = text;
    } catch {}
  }
  return new Response(`Hello, ${name}!`);
} 