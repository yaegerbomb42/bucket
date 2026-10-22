import { put, list } from '@vercel/blob';

export default async function handler(request: any, response: any) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Check for environment variable
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return response.status(500).json({ 
      error: 'BLOB_READ_WRITE_TOKEN is missing. Did you connect the Blob store in Vercel?' 
    });
  }

  const filename = 'bucket-list.json';

  try {
    if (request.method === 'GET') {
      const { blobs } = await list({ prefix: filename, limit: 1 });
      const blob = blobs.find((b) => b.pathname === filename);

      if (!blob) {
        return response.status(200).json([]);
      }

      // Fetch the JSON from the blob URL
      // Node.js 18+ (Vercel default) supports native fetch
      const fetchRes = await fetch(blob.url);
      if (!fetchRes.ok) {
         throw new Error('Failed to fetch blob file');
      }
      const data = await fetchRes.json();

      return response.status(200).json(data);
    }

    if (request.method === 'POST') {
      // In Vercel Node.js functions, request.body is automatically parsed 
      // when content-type is application/json, which our hook sends.
      const data = request.body;

      await put(filename, JSON.stringify(data), {
        access: 'public',
        addRandomSuffix: false,
      });

      return response.status(200).json({ success: true });
    }

    return response.status(405).send('Method not allowed');
  } catch (error: any) {
    console.error('API Error:', error);
    return response.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}