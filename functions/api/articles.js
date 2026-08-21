
// functions/api/articles.js - Secure sheet reader
export async function onRequestGet(context) {
  const { env } = context;
  const SHEET_ID = env.GOOGLE_SHEET_ID;
  const API_KEY = env.GOOGLE_API_KEY;
  if (!SHEET_ID) return new Response(JSON.stringify([]), {headers:{'Content-Type':'application/json'}});
  
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return new Response(JSON.stringify(data), {headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=300'}});
  } catch(e){
    return new Response(JSON.stringify({error:e.message}), {status:500});
  }
}
